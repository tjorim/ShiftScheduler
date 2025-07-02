import React, { createElement, useEffect, useState, useMemo, useCallback } from "react";
import { addDays, getDurationInMinutes, formatDateForShift } from "../utils/dateHelpers";
import { useScrollNavigation } from "../hooks/useScrollNavigation";
import { EmptyState, withErrorBoundary } from "./LoadingStates";
import DayCell from "./DayCell";
import {
    ContextMenu,
    ContextMenuOption,
    createEmptyCellMenu,
    createExistingShiftMenu,
    createMultiSelectMenu
} from "./ContextMenu";
import DebugPanel from "./DebugPanel";
import TeamCapacityIndicator from "./TeamCapacityIndicator";
import { Engineer, ShiftAssignment, TeamCapacity } from "../types/shiftScheduler";

interface ScheduleGridProps {
    engineers: Engineer[];
    shifts: ShiftAssignment[];
    getShiftsForEngineer: (engineerId: string) => ShiftAssignment[];
    getEngineersByTeam: () => { [team: string]: Engineer[] };
    getAllTeamCapacities: (dates: string[]) => TeamCapacity[];
    onEditShift?: any; // ActionValue
    onCreateShift?: any; // ActionValue
    onDeleteShift?: any; // ActionValue
    // Context attributes for passing data to microflows
    contextShiftId?: any;
    contextEngineerId?: any;
    contextDate?: any;
    contextSelectedCells?: any;
    onBatchCreate?: any; // ActionValue
    onBatchEdit?: any; // ActionValue
    onBatchDelete?: any; // ActionValue
    readOnly?: boolean;
    className?: string;
    showDebugInfo?: boolean;
    shiftsLoading?: boolean;
    onDateRangeChange?: (startDate: Date, endDate: Date) => void;
    debugInfo?: {
        attributesConfigured: {
            name: boolean;
            team: boolean;
            lane: boolean;
            spUserAssociation: boolean;
            eventDate: boolean;
            teamCapacities: boolean;
        };
        microflowInfo: {
            message: string;
        };
    };
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
    engineers: _engineers,
    shifts,
    getShiftsForEngineer: _getShiftsForEngineer,
    getEngineersByTeam,
    getAllTeamCapacities,
    onEditShift,
    onCreateShift,
    onDeleteShift,
    contextShiftId,
    contextEngineerId,
    contextDate,
    contextSelectedCells,
    onBatchCreate,
    onBatchEdit,
    onBatchDelete,
    readOnly = false,
    className = "",
    // teamAccess, // No longer needed
    showDebugInfo,
    shiftsLoading,
    debugInfo,
    onDateRangeChange
}) => {
    // Use all shifts data directly - security is handled by ActionValue.canExecute
    const accessibleShifts = shifts;

    // Calculate date range from accessible shift data
    const dateRange = useMemo(() => {
        if (accessibleShifts.length === 0) {
            return {
                start: new Date(),
                end: addDays(new Date(), 30)
            };
        }

        const shiftDates = accessibleShifts.map(shift => new Date(shift.date)).filter(date => !isNaN(date.getTime()));
        if (shiftDates.length === 0) {
            return {
                start: new Date(),
                end: addDays(new Date(), 30)
            };
        }

        const earliestDate = new Date(Math.min(...shiftDates.map(d => d.getTime())));
        const latestDate = new Date(Math.max(...shiftDates.map(d => d.getTime())));

        return {
            start: earliestDate,
            end: latestDate
        };
    }, [accessibleShifts]);

    const [startDate] = useState(dateRange.start);
    const [endDate, setEndDate] = useState(dateRange.end);
    const [selectedCells, setSelectedCells] = useState<Array<{ engineerId: string; date: string }>>([]);
    const [lastSelectedCell, setLastSelectedCell] = useState<{ engineerId: string; date: string } | null>(null);

    // Context menu state
    const [contextMenu, setContextMenu] = useState<{
        visible: boolean;
        x: number;
        y: number;
        options: ContextMenuOption[];
    }>({
        visible: false,
        x: 0,
        y: 0,
        options: []
    });

    // Scroll navigation hook for unified scrolling and infinite loading
    const { headerScrollRef, contentScrollRef, infiniteScrollRef, isInfiniteScrollVisible } = useScrollNavigation();

    // Helper functions for multi-select
    const isCellSelected = useCallback(
        (engineerId: string, date: string) => {
            return selectedCells.some(cell => cell.engineerId === engineerId && cell.date === date);
        },
        [selectedCells]
    );

    // Handle infinite scroll loading when sentinel comes into view
    useEffect(() => {
        if (isInfiniteScrollVisible && onDateRangeChange) {
            const newEndDate = addDays(endDate, 15);
            setEndDate(newEndDate);
            // Trigger microflow refresh with extended date range
            onDateRangeChange(startDate, newEndDate);
        }
    }, [isInfiniteScrollVisible, onDateRangeChange, startDate, endDate]);

    // Memoize teams data for performance
    const teamsData = useMemo(() => {
        try {
            return getEngineersByTeam();
        } catch (error) {
            // Silently return empty teams - error will be shown in debug panel
            return {};
        }
    }, [getEngineersByTeam]);

    // Group engineers by Team → Lane → Engineers (data-driven with fallback)
    const { teamLaneStructure, allEngineers, groupingDebugInfo } = useMemo(() => {
        const debugMessages: string[] = [];

        // Check if we have team/lane grouping configured
        const hasTeamGrouping = !!debugInfo && debugInfo.attributesConfigured?.team; // Team grouping
        const hasLaneGrouping = !!debugInfo && debugInfo.attributesConfigured?.lane; // Lane grouping

        debugMessages.push(`Processing ${Object.keys(teamsData).length} team groups`);
        debugMessages.push(`Team grouping: ${hasTeamGrouping ? "✅" : "❌"}`);
        debugMessages.push(`Lane grouping: ${hasLaneGrouping ? "✅" : "❌"}`);

        if (!hasTeamGrouping) {
            // No team grouping - flat list of all engineers
            const flatEngineers = Object.values(teamsData).flat();
            debugMessages.push("No team grouping - showing all engineers in single group");

            return {
                teamLaneStructure: [
                    {
                        teamName: "All Engineers",
                        teamId: "all-engineers",
                        lanes: [
                            {
                                name: "General",
                                engineers: flatEngineers
                            }
                        ]
                    }
                ],
                allEngineers: flatEngineers,
                groupingDebugInfo: debugMessages
            };
        }

        const structure = Object.entries(teamsData).map(([teamName, engineers]) => {
            debugMessages.push(`Team "${teamName}": ${engineers.length} engineers`);

            if (!hasLaneGrouping) {
                // Only team grouping - no lane grouping
                debugMessages.push(`  No lane grouping for ${teamName}`);
                return {
                    teamName,
                    teamId: teamName.toLowerCase().replace(/\s+/g, "-"),
                    lanes: [
                        {
                            name: "General",
                            engineers
                        }
                    ]
                };
            }

            // Both team and lane grouping
            const laneGroups: { [lane: string]: Engineer[] } = {};

            engineers.forEach((engineer, index) => {
                // Use engineer's lane, default to 'General' if not specified
                const engineerLane = engineer.lane || "General";

                if (!laneGroups[engineerLane]) {
                    laneGroups[engineerLane] = [];
                }
                laneGroups[engineerLane].push(engineer);

                // Debug first few engineers
                if (index < 2) {
                    debugMessages.push(`  Engineer ${index}: ${engineer.name} (${engineer.team}/${engineer.lane})`);
                }
            });

            // Sort lanes alphabetically (data-driven, no hardcoded order)
            const sortedLanes = Object.keys(laneGroups).sort();
            debugMessages.push(`  Lanes: ${sortedLanes.join(", ")}`);

            return {
                teamName,
                teamId: teamName.toLowerCase().replace(/\s+/g, "-"),
                lanes: sortedLanes.map(lane => ({
                    name: lane,
                    engineers: laneGroups[lane]
                }))
            };
        });

        const flatEngineers: Engineer[] = structure.flatMap(team => team.lanes.flatMap(lane => lane.engineers));

        return { teamLaneStructure: structure, allEngineers: flatEngineers, groupingDebugInfo: debugMessages };
    }, [teamsData, debugInfo]);

    // Generate date columns
    const dateColumns = useMemo(() => {
        const daysCount = Math.ceil(getDurationInMinutes(startDate, endDate) / (60 * 24));
        return Array.from({ length: daysCount }, (_, idx) => {
            const date = addDays(startDate, idx);
            return {
                date,
                dateString: formatDateForShift(date),
                isToday: formatDateForShift(date) === formatDateForShift(new Date()),
                isWeekend: date.getDay() === 0 || date.getDay() === 6
            };
        });
    }, [startDate, endDate]);

    // Calculate team capacities for all visible dates
    const teamCapacities = useMemo(() => {
        const dates = dateColumns.map(col => col.dateString);
        return getAllTeamCapacities(dates);
    }, [dateColumns, getAllTeamCapacities]);

    // Helper function to get capacity for a specific team and date
    const getCapacityForTeamAndDate = useCallback(
        (teamName: string, laneName: string, dateString: string): TeamCapacity | undefined => {
            return teamCapacities.find(capacity => {
                const teamMatches = capacity.teamName === teamName;
                const dateMatches = capacity.date === dateString;

                // Match capacity data based on isNXT flag
                if (capacity.isNXT) {
                    // NXT capacity data - match with any lane (NXT A, NXT B, etc.)
                    return teamMatches && dateMatches;
                } else {
                    // XT capacity data - only match with "XT" lane specifically
                    return teamMatches && dateMatches && laneName === "XT";
                }
            });
        },
        [teamCapacities]
    );

    // Multi-select cell function (defined after allEngineers and dateColumns are available)
    const selectCell = useCallback(
        (engineerId: string, date: string, ctrlKey: boolean, shiftKey: boolean) => {
            const newCell = { engineerId, date };

            if (shiftKey && lastSelectedCell) {
                // Shift+click: select range from last selected to current
                const engineerStart = allEngineers.findIndex(e => e.id === lastSelectedCell.engineerId);
                const engineerEnd = allEngineers.findIndex(e => e.id === engineerId);
                const dateStart = dateColumns.findIndex(d => d.dateString === lastSelectedCell.date);
                const dateEnd = dateColumns.findIndex(d => d.dateString === date);

                const minEngineer = Math.min(engineerStart, engineerEnd);
                const maxEngineer = Math.max(engineerStart, engineerEnd);
                const minDate = Math.min(dateStart, dateEnd);
                const maxDate = Math.max(dateStart, dateEnd);

                const rangeCells: Array<{ engineerId: string; date: string }> = [];
                for (let e = minEngineer; e <= maxEngineer; e++) {
                    for (let d = minDate; d <= maxDate; d++) {
                        if (allEngineers[e] && dateColumns[d]) {
                            rangeCells.push({
                                engineerId: allEngineers[e].id,
                                date: dateColumns[d].dateString
                            });
                        }
                    }
                }

                if (ctrlKey) {
                    // Ctrl+Shift: add range to existing selection
                    setSelectedCells(prev => {
                        const newSelection = [...prev];
                        rangeCells.forEach(cell => {
                            if (
                                !newSelection.some(
                                    existing => existing.engineerId === cell.engineerId && existing.date === cell.date
                                )
                            ) {
                                newSelection.push(cell);
                            }
                        });
                        return newSelection;
                    });
                } else {
                    // Shift only: replace selection with range
                    setSelectedCells(rangeCells);
                }
            } else if (ctrlKey) {
                // Ctrl+click: toggle single cell
                setSelectedCells(prev => {
                    const isSelected = prev.some(cell => cell.engineerId === engineerId && cell.date === date);
                    if (isSelected) {
                        return prev.filter(cell => !(cell.engineerId === engineerId && cell.date === date));
                    } else {
                        return [...prev, newCell];
                    }
                });
                setLastSelectedCell(newCell);
            } else {
                // Regular click: select single cell
                setSelectedCells([newCell]);
                setLastSelectedCell(newCell);
            }
        },
        [lastSelectedCell, allEngineers, dateColumns]
    );

    // Context menu handlers
    const handleCellContextMenu = useCallback(
        (e: React.MouseEvent, engineer: Engineer, date: string, shift?: ShiftAssignment) => {
            e.preventDefault();
            e.stopPropagation();

            let options: ContextMenuOption[];

            // Check permissions before showing context menu options
            if (selectedCells.length > 1) {
                // Calculate batch permission statuses
                const batchCreateStatus = !onBatchCreate
                    ? "not-configured"
                    : onBatchCreate.canExecute === true
                    ? "allowed"
                    : "no-permission";

                const batchEditStatus = !onBatchEdit
                    ? "not-configured"
                    : onBatchEdit.canExecute === true
                    ? "allowed"
                    : "no-permission";

                const batchDeleteStatus = !onBatchDelete
                    ? "not-configured"
                    : onBatchDelete.canExecute === true
                    ? "allowed"
                    : "no-permission";

                // Multi-selection context menu with proper permission and configuration checks
                options = createMultiSelectMenu(
                    selectedCells.length,
                    batchCreateStatus === "allowed"
                        ? () => {
                              if (onBatchCreate.canExecute && !onBatchCreate.isExecuting) {
                                  if (contextSelectedCells?.setValue) {
                                      contextSelectedCells.setValue(JSON.stringify(selectedCells));
                                  }
                                  onBatchCreate.execute();
                              }
                          }
                        : null,
                    batchEditStatus === "allowed"
                        ? () => {
                              if (onBatchEdit.canExecute && !onBatchEdit.isExecuting) {
                                  if (contextSelectedCells?.setValue) {
                                      contextSelectedCells.setValue(JSON.stringify(selectedCells));
                                  }
                                  onBatchEdit.execute();
                              }
                          }
                        : null,
                    batchDeleteStatus === "allowed"
                        ? () => {
                              if (onBatchDelete.canExecute && !onBatchDelete.isExecuting) {
                                  if (contextSelectedCells?.setValue) {
                                      contextSelectedCells.setValue(JSON.stringify(selectedCells));
                                  }
                                  onBatchDelete.execute();
                              }
                          }
                        : null,
                    () => {
                        setSelectedCells([]);
                        setLastSelectedCell(null);
                    },
                    batchCreateStatus,
                    batchEditStatus,
                    batchDeleteStatus
                );
            } else if (shift) {
                // Existing shift context menu (check edit/delete permissions)
                const editStatus = !onEditShift
                    ? "not-configured"
                    : onEditShift.canExecute === true
                    ? "allowed"
                    : "no-permission";

                const deleteStatus = !onDeleteShift
                    ? "not-configured"
                    : onDeleteShift.canExecute === true
                    ? "allowed"
                    : "no-permission";

                options = createExistingShiftMenu(
                    shift,
                    engineer,
                    editStatus === "allowed"
                        ? shift => {
                              if (onEditShift.canExecute && !onEditShift.isExecuting) {
                                  if (contextShiftId?.setValue) {
                                      contextShiftId.setValue(shift.id);
                                  }
                                  onEditShift.execute();
                              }
                          }
                        : null,
                    deleteStatus === "allowed"
                        ? shift => {
                              if (onDeleteShift.canExecute && !onDeleteShift.isExecuting) {
                                  if (contextShiftId?.setValue) {
                                      contextShiftId.setValue(shift.id);
                                  }
                                  onDeleteShift.execute();
                              }
                          }
                        : null,
                    editStatus,
                    deleteStatus
                );
            } else {
                // Empty cell context menu
                const createStatus = !onCreateShift
                    ? "not-configured"
                    : onCreateShift.canExecute === true
                    ? "allowed"
                    : "no-permission";

                options = createEmptyCellMenu(
                    engineer,
                    date,
                    createStatus === "allowed"
                        ? (engineerId, date) => {
                              if (onCreateShift?.canExecute && !onCreateShift.isExecuting) {
                                  if (contextEngineerId?.setValue) {
                                      contextEngineerId.setValue(engineerId);
                                  }
                                  if (contextDate?.setValue) {
                                      contextDate.setValue(date);
                                  }
                                  onCreateShift.execute();
                              }
                          }
                        : null,
                    createStatus
                );
            }

            setContextMenu({
                visible: true,
                x: e.clientX,
                y: e.clientY,
                options
            });
        },
        [
            onCreateShift,
            onEditShift,
            onDeleteShift,
            contextShiftId,
            contextEngineerId,
            contextDate,
            contextSelectedCells,
            selectedCells,
            onBatchCreate,
            onBatchEdit,
            onBatchDelete,
            setSelectedCells,
            setLastSelectedCell
        ]
    );

    const closeContextMenu = useCallback(() => {
        setContextMenu(prev => ({ ...prev, visible: false }));
    }, []);

    // Create shift lookup for performance with targeted debugging
    const shiftLookup = useMemo(() => {
        const lookup: Record<string, ShiftAssignment> = {};

        accessibleShifts.forEach(shift => {
            const key = `${shift.engineerId}-${shift.date}`;
            lookup[key] = shift;
        });

        return lookup;
    }, [accessibleShifts]);

    // Helper function to get shift for engineer and date
    const getShift = useCallback(
        (engineerId: string, dateString: string): ShiftAssignment | undefined => {
            const key = `${engineerId}-${dateString}`;
            const shift = shiftLookup[key];

            return shift;
        },
        [shiftLookup]
    );

    // Enhanced cell click handler with multi-select support
    const handleCellClick = useCallback(
        (engineerId: string, dateString: string, ctrlKey: boolean, shiftKey: boolean) => {
            selectCell(engineerId, dateString, ctrlKey, shiftKey);
        },
        [selectCell]
    );

    // Keyboard navigation with multi-select support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            if (selectedCells.length === 0 || allEngineers.length === 0 || dateColumns.length === 0) {
                return;
            }

            // Use the last selected cell for navigation
            const currentCell = lastSelectedCell || selectedCells[selectedCells.length - 1];
            const currentEngineerIndex = allEngineers.findIndex(eng => eng.id === currentCell.engineerId);
            const currentDateIndex = dateColumns.findIndex(col => col.dateString === currentCell.date);

            if (currentEngineerIndex === -1 || currentDateIndex === -1) {
                return;
            }

            let newEngineerIndex = currentEngineerIndex;
            let newDateIndex = currentDateIndex;

            switch (e.key) {
                case "ArrowUp":
                    newEngineerIndex = Math.max(0, currentEngineerIndex - 1);
                    e.preventDefault();
                    break;
                case "ArrowDown":
                    newEngineerIndex = Math.min(allEngineers.length - 1, currentEngineerIndex + 1);
                    e.preventDefault();
                    break;
                case "ArrowLeft":
                    newDateIndex = Math.max(0, currentDateIndex - 1);
                    e.preventDefault();
                    break;
                case "ArrowRight":
                    newDateIndex = Math.min(dateColumns.length - 1, currentDateIndex + 1);
                    e.preventDefault();
                    break;
                case "Enter":
                case " ":
                    if (selectedCells.length === 1) {
                        // Single selection: edit the selected cell
                        try {
                            const shift = getShift(currentCell.engineerId, currentCell.date);
                            if (onEditShift && shift) {
                                onEditShift(shift);
                            }
                        } catch (error) {
                            // Silently handle keyboard edit errors
                        }
                    } else {
                        // Multi-selection: could batch edit or show context menu
                    }
                    e.preventDefault();
                    break;
                case "Escape":
                    setSelectedCells([]);
                    setLastSelectedCell(null);
                    e.preventDefault();
                    break;
                default:
                    return;
            }

            if (newEngineerIndex !== currentEngineerIndex || newDateIndex !== currentDateIndex) {
                selectCell(
                    allEngineers[newEngineerIndex].id,
                    dateColumns[newDateIndex].dateString,
                    e.ctrlKey || e.metaKey,
                    e.shiftKey
                );
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [selectedCells, lastSelectedCell, allEngineers, dateColumns, getShift, onEditShift, selectCell]);

    // Global click handler to close context menu
    useEffect(() => {
        const handleGlobalClick = (): void => {
            closeContextMenu();
        };

        if (contextMenu.visible) {
            document.addEventListener("click", handleGlobalClick);
        }

        return () => {
            document.removeEventListener("click", handleGlobalClick);
        };
    }, [contextMenu.visible, closeContextMenu]);

    // Calculate shift statistics

    // Error handling for empty data
    if (teamLaneStructure.length === 0 || allEngineers.length === 0) {
        return (
            <EmptyState
                message="No Engineers Available"
                description="No engineers found. Please check your data configuration."
                className={className}
            />
        );
    }

    return (
        <div className={`shift-scheduler-unified ${className}`}>
            {/* Enhanced debug info panel */}
            {showDebugInfo && (
                <DebugPanel
                    shifts={shifts}
                    allEngineers={allEngineers}
                    dateColumns={dateColumns}
                    teamLaneStructure={teamLaneStructure}
                    shiftLookup={shiftLookup}
                    selectedCells={selectedCells}
                    groupingDebugInfo={groupingDebugInfo}
                    teamCapacities={teamCapacities}
                    shiftsLoading={shiftsLoading}
                    onCreateShift={onCreateShift}
                    onEditShift={onEditShift}
                    onDeleteShift={onDeleteShift}
                    onBatchCreate={onBatchCreate}
                    onBatchEdit={onBatchEdit}
                    onBatchDelete={onBatchDelete}
                    debugInfo={debugInfo}
                />
            )}
            <div className="scheduler-container">
                {/* Header Row */}
                <div className="scheduler-header">
                    <div className="engineer-column-header">Engineer</div>
                    <div className="timeline-container" ref={headerScrollRef}>
                        <div className="timeline-header">
                            {dateColumns.map((col, idx) => (
                                <div
                                    key={idx}
                                    className={`date-header ${col.isToday ? "date-header-today" : ""} ${
                                        col.isWeekend ? "date-header-weekend" : ""
                                    }`}
                                >
                                    <div className="date-day">{col.date.getDate()}</div>
                                    <div className="date-month">
                                        {col.date.toLocaleDateString("en", { month: "short" })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="scheduler-content">
                    <div className="engineer-names-column">
                        {teamLaneStructure.map(teamData => (
                            <div key={teamData.teamId}>
                                <div className="team-name-cell">{teamData.teamName}</div>
                                {teamData.lanes.map(lane => (
                                    <div key={`${teamData.teamId}-${lane.name}`}>
                                        <div className="lane-name-cell">{lane.name}</div>
                                        {lane.engineers.map(engineer => (
                                            <div key={engineer.id} className="engineer-name-cell">
                                                {engineer.name}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="timeline-container" ref={contentScrollRef}>
                        <div className="timeline-content">
                            {teamLaneStructure.map(teamData => (
                                <div key={teamData.teamId}>
                                    <div className="team-timeline-row">
                                        {dateColumns.map((col, idx) => {
                                            // For team row, show capacity for the first lane (representative)
                                            const firstLaneName = teamData.lanes[0]?.name || "XT";
                                            const capacity = getCapacityForTeamAndDate(
                                                teamData.teamName,
                                                firstLaneName,
                                                col.dateString
                                            );
                                            return (
                                                <div key={idx} className="team-timeline-cell">
                                                    {capacity && <TeamCapacityIndicator capacity={capacity} compact />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {teamData.lanes.map(lane => (
                                        <div key={`${teamData.teamId}-${lane.name}`}>
                                            <div className="lane-timeline-row">
                                                {dateColumns.map((_, idx) => (
                                                    <div key={idx} className="lane-timeline-cell"></div>
                                                ))}
                                            </div>
                                            {lane.engineers.map(engineer => (
                                                <div key={engineer.id} className="engineer-timeline-row">
                                                    {dateColumns.map((col, idx) => {
                                                        const shift = getShift(engineer.id, col.dateString);
                                                        return (
                                                            <DayCell
                                                                key={`${engineer.id}-${idx}`}
                                                                date={col.date}
                                                                engineer={engineer}
                                                                shift={shift}
                                                                isToday={col.isToday}
                                                                isWeekend={col.isWeekend}
                                                                isSelected={isCellSelected(engineer.id, col.dateString)}
                                                                shiftsLoading={shiftsLoading}
                                                                onDoubleClick={() => {
                                                                    try {
                                                                        if (shift) {
                                                                            // Existing shift: edit it (same as context menu edit)
                                                                            const editStatus = !onEditShift
                                                                                ? "not-configured"
                                                                                : onEditShift.canExecute === true
                                                                                ? "allowed"
                                                                                : "no-permission";

                                                                            if (editStatus === "allowed") {
                                                                                if (!onEditShift.isExecuting) {
                                                                                    if (contextShiftId?.setValue) {
                                                                                        contextShiftId.setValue(
                                                                                            shift.id
                                                                                        );
                                                                                    }
                                                                                    onEditShift.execute();
                                                                                }
                                                                            }
                                                                            // Do nothing for "not-configured" or "no-permission"
                                                                        } else {
                                                                            // Empty cell: create new shift
                                                                            const createStatus = !onCreateShift
                                                                                ? "not-configured"
                                                                                : onCreateShift.canExecute === true
                                                                                ? "allowed"
                                                                                : "no-permission";

                                                                            if (createStatus === "allowed") {
                                                                                if (!onCreateShift.isExecuting) {
                                                                                    if (contextEngineerId?.setValue) {
                                                                                        contextEngineerId.setValue(
                                                                                            engineer.id
                                                                                        );
                                                                                    }
                                                                                    if (contextDate?.setValue) {
                                                                                        contextDate.setValue(
                                                                                            col.dateString
                                                                                        );
                                                                                    }
                                                                                    onCreateShift.execute();
                                                                                }
                                                                            }
                                                                            // Do nothing for "not-configured" or "no-permission"
                                                                        }
                                                                    } catch (error) {
                                                                        // Silently handle double-click errors
                                                                    }
                                                                }}
                                                                onCellClick={e =>
                                                                    handleCellClick(
                                                                        engineer.id,
                                                                        col.dateString,
                                                                        e.ctrlKey || e.metaKey,
                                                                        e.shiftKey
                                                                    )
                                                                }
                                                                onContextMenu={handleCellContextMenu}
                                                                readOnly={readOnly}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div ref={infiniteScrollRef} className="sentinel" />

            {/* Context Menu */}
            <ContextMenu
                visible={contextMenu.visible}
                x={contextMenu.x}
                y={contextMenu.y}
                options={contextMenu.options}
                onClose={closeContextMenu}
            />
        </div>
    );
};

// Export with error boundary for production resilience
export default withErrorBoundary(ScheduleGrid);
