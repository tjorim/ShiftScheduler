import React, { createElement, useEffect, useState, useMemo, useCallback } from "react";
import { ActionValue, EditableValue } from "mendix";
import { addDays, getDurationInMinutes, formatDateForShift, isCurrentShiftDay } from "../utils/dateHelpers";
import { useScrollNavigation } from "../hooks/useScrollNavigation";
import { EmptyState, withErrorBoundary } from "./LoadingStates";
import {
    ContextMenu,
    ContextMenuOption,
    createEmptyCellMenu,
    createExistingEventMenu,
    createMultiSelectMenu
} from "./ContextMenu";
import DebugPanel from "./DebugPanel";
import TeamSection from "./TeamSection";
import { Person, EventAssignment, TeamCapacity, DayCellData } from "../types/shiftScheduler";

interface ScheduleGridProps {
    people: Person[];
    events: EventAssignment[];
    getEventsForPerson: (personId: string) => EventAssignment[];
    getPeopleByTeam: () => { [team: string]: Person[] };
    getDayCellData: (personId: string, date: string) => DayCellData;
    getAllTeamCapacities: (dates: string[]) => TeamCapacity[];
    onEditEvent?: ActionValue;
    onCreateEvent?: ActionValue;
    onDeleteEvent?: ActionValue;
    // Context attributes for passing data to microflows
    contextEventId?: EditableValue<string>;
    contextPersonId?: EditableValue<string>;
    contextDate?: EditableValue<string>;
    contextSelectedCells?: EditableValue<string>;
    onBatchCreate?: ActionValue;
    onBatchEdit?: ActionValue;
    onBatchDelete?: ActionValue;
    readOnly?: boolean;
    className?: string;
    showDebugInfo?: boolean;
    eventsLoading?: boolean;
    onDateRangeChange?: (startDate: Date, endDate: Date) => void;
    debugInfo?: {
        microflowConfiguration: {
            people: boolean;
            events: boolean;
            teamCapacities: boolean;
        };
        microflowInfo: {
            message: string;
        };
        processingErrors?: string[];
        interactionErrors?: string[];
        dataQualityIssues?: string[];
    };
    trackInteractionError?: (error: string) => void;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
    people: _people,
    events,
    getEventsForPerson: _getEventsForPerson,
    getPeopleByTeam,
    getDayCellData,
    getAllTeamCapacities,
    onEditEvent,
    onCreateEvent,
    onDeleteEvent,
    contextEventId,
    contextPersonId,
    contextDate,
    contextSelectedCells,
    onBatchCreate,
    onBatchEdit,
    onBatchDelete,
    readOnly = false,
    className = "",
    // teamAccess, // No longer needed
    showDebugInfo,
    eventsLoading,
    debugInfo,
    onDateRangeChange,
    trackInteractionError
}) => {
    // Use all events data directly - security is handled by ActionValue.canExecute
    const accessibleEvents = events;

    // Calculate date range from accessible event data
    const dateRange = useMemo(() => {
        if (accessibleEvents.length === 0) {
            return {
                start: new Date(),
                end: addDays(new Date(), 30)
            };
        }

        const eventDates = accessibleEvents.map(event => new Date(event.date)).filter(date => !isNaN(date.getTime()));
        if (eventDates.length === 0) {
            return {
                start: new Date(),
                end: addDays(new Date(), 30)
            };
        }

        const earliestDate = new Date(Math.min(...eventDates.map(d => d.getTime())));
        const latestDate = new Date(Math.max(...eventDates.map(d => d.getTime())));

        return {
            start: earliestDate,
            end: latestDate
        };
    }, [accessibleEvents]);

    const [startDate] = useState(dateRange.start);
    const [endDate, setEndDate] = useState(dateRange.end);
    const [selectedCells, setSelectedCells] = useState<Array<{ personId: string; date: string }>>([]);
    const [lastSelectedCell, setLastSelectedCell] = useState<{ personId: string; date: string } | null>(null);

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
        (personId: string, date: string) => {
            return selectedCells.some(cell => cell.personId === personId && cell.date === date);
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
            return getPeopleByTeam();
        } catch (error) {
            // Silently return empty teams - error will be shown in debug panel
            return {};
        }
    }, [getPeopleByTeam]);

    // Group people by Team → Lane → People (data-driven with fallback)
    const { teamLaneStructure, allPeople, groupingDebugInfo } = useMemo(() => {
        const debugMessages: string[] = [];

        // Check if we have team/lane grouping configured
        const hasTeamGrouping = !!debugInfo && debugInfo.microflowConfiguration?.people; // Team grouping via microflow
        const hasLaneGrouping = !!debugInfo && debugInfo.microflowConfiguration?.people; // Lane grouping via microflow

        debugMessages.push(`Processing ${Object.keys(teamsData).length} team groups`);
        debugMessages.push(`Team grouping: ${hasTeamGrouping ? "✅" : "❌"}`);
        debugMessages.push(`Lane grouping: ${hasLaneGrouping ? "✅" : "❌"}`);

        if (!hasTeamGrouping) {
            // No team grouping - flat list of all people
            const flatPeople = Object.values(teamsData).flat();
            debugMessages.push("No team grouping - showing all people in single group");

            return {
                teamLaneStructure: [
                    {
                        teamName: "All People",
                        teamId: "all-people",
                        lanes: [
                            {
                                name: "General",
                                people: flatPeople
                            }
                        ]
                    }
                ],
                allPeople: flatPeople,
                groupingDebugInfo: debugMessages
            };
        }

        const structure = Object.entries(teamsData).map(([teamName, people]) => {
            debugMessages.push(`Team "${teamName}": ${people.length} people`);

            if (!hasLaneGrouping) {
                // Only team grouping - no lane grouping
                debugMessages.push(`  No lane grouping for ${teamName}`);
                return {
                    teamName,
                    teamId: teamName.toLowerCase().replace(/\s+/g, "-"),
                    lanes: [
                        {
                            name: "General",
                            people
                        }
                    ]
                };
            }

            // Both team and lane grouping
            const laneGroups: { [lane: string]: Person[] } = {};

            people.forEach((person, index) => {
                // Use person's lane, default to 'General' if not specified
                const personLane = person.lane || "General";

                if (!laneGroups[personLane]) {
                    laneGroups[personLane] = [];
                }
                laneGroups[personLane].push(person);

                // Debug first few people
                if (index < 2) {
                    debugMessages.push(`  Person ${index}: ${person.name} (${person.team}/${person.lane})`);
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
                    people: laneGroups[lane]
                }))
            };
        });

        const flatPeople: Person[] = structure.flatMap(team => team.lanes.flatMap(lane => lane.people));

        return { teamLaneStructure: structure, allPeople: flatPeople, groupingDebugInfo: debugMessages };
    }, [teamsData, debugInfo]);

    // Generate date columns
    const dateColumns = useMemo(() => {
        const daysCount = Math.ceil(getDurationInMinutes(startDate, endDate) / (60 * 24));
        return Array.from({ length: daysCount }, (_, idx) => {
            const date = addDays(startDate, idx);
            return {
                date,
                dateString: formatDateForShift(date),
                isToday: isCurrentShiftDay(date),
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

    // Multi-select cell function (defined after allPeople and dateColumns are available)
    const selectCell = useCallback(
        (personId: string, date: string, ctrlKey: boolean, shiftKey: boolean) => {
            const newCell = { personId, date };

            if (shiftKey && lastSelectedCell) {
                // Shift+click: select range from last selected to current
                const personStart = allPeople.findIndex(e => e.id === lastSelectedCell.personId);
                const personEnd = allPeople.findIndex(e => e.id === personId);
                const dateStart = dateColumns.findIndex(d => d.dateString === lastSelectedCell.date);
                const dateEnd = dateColumns.findIndex(d => d.dateString === date);

                const minPerson = Math.min(personStart, personEnd);
                const maxPerson = Math.max(personStart, personEnd);
                const minDate = Math.min(dateStart, dateEnd);
                const maxDate = Math.max(dateStart, dateEnd);

                const rangeCells: Array<{ personId: string; date: string }> = [];
                for (let e = minPerson; e <= maxPerson; e++) {
                    for (let d = minDate; d <= maxDate; d++) {
                        if (allPeople[e] && dateColumns[d]) {
                            rangeCells.push({
                                personId: allPeople[e].id,
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
                                    existing => existing.personId === cell.personId && existing.date === cell.date
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
                    const isSelected = prev.some(cell => cell.personId === personId && cell.date === date);
                    if (isSelected) {
                        return prev.filter(cell => !(cell.personId === personId && cell.date === date));
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
        [lastSelectedCell, allPeople, dateColumns]
    );

    // Context menu handlers
    const handleCellContextMenu = useCallback(
        (
            e: React.MouseEvent,
            person: Person,
            date: string,
            event?: EventAssignment,
            _eventType?: "active" | "request"
        ) => {
            e.preventDefault();
            e.stopPropagation();

            // eventType parameter is available for future context menu differentiation

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
                    batchCreateStatus === "allowed" && onBatchCreate
                        ? () => {
                              if (onBatchCreate.canExecute && !onBatchCreate.isExecuting) {
                                  if (contextSelectedCells?.setValue) {
                                      contextSelectedCells.setValue(JSON.stringify(selectedCells));
                                  }
                                  onBatchCreate.execute();
                              }
                          }
                        : null,
                    batchEditStatus === "allowed" && onBatchEdit
                        ? () => {
                              if (onBatchEdit.canExecute && !onBatchEdit.isExecuting) {
                                  if (contextSelectedCells?.setValue) {
                                      contextSelectedCells.setValue(JSON.stringify(selectedCells));
                                  }
                                  onBatchEdit.execute();
                              }
                          }
                        : null,
                    batchDeleteStatus === "allowed" && onBatchDelete
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
            } else if (event) {
                // Existing event context menu (check edit/delete permissions)
                const editStatus = !onEditEvent
                    ? "not-configured"
                    : onEditEvent.canExecute === true
                    ? "allowed"
                    : "no-permission";

                const deleteStatus = !onDeleteEvent
                    ? "not-configured"
                    : onDeleteEvent.canExecute === true
                    ? "allowed"
                    : "no-permission";

                options = createExistingEventMenu(
                    event,
                    person,
                    editStatus === "allowed" && onEditEvent
                        ? event => {
                              if (onEditEvent.canExecute && !onEditEvent.isExecuting) {
                                  if (contextEventId?.setValue) {
                                      contextEventId.setValue(event.id);
                                  }
                                  onEditEvent.execute();
                              }
                          }
                        : null,
                    deleteStatus === "allowed" && onDeleteEvent
                        ? event => {
                              if (onDeleteEvent.canExecute && !onDeleteEvent.isExecuting) {
                                  if (contextEventId?.setValue) {
                                      contextEventId.setValue(event.id);
                                  }
                                  onDeleteEvent.execute();
                              }
                          }
                        : null,
                    editStatus,
                    deleteStatus
                );
            } else {
                // Empty cell context menu
                const createStatus = !onCreateEvent
                    ? "not-configured"
                    : onCreateEvent.canExecute === true
                    ? "allowed"
                    : "no-permission";

                options = createEmptyCellMenu(
                    person,
                    date,
                    createStatus === "allowed"
                        ? (personId, date) => {
                              if (onCreateEvent?.canExecute && !onCreateEvent.isExecuting) {
                                  if (contextPersonId?.setValue) {
                                      contextPersonId.setValue(personId);
                                  }
                                  if (contextDate?.setValue) {
                                      contextDate.setValue(date);
                                  }
                                  onCreateEvent.execute();
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
            onCreateEvent,
            onEditEvent,
            onDeleteEvent,
            contextEventId,
            contextPersonId,
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

    // Create event lookup for performance with targeted debugging
    const eventLookup = useMemo(() => {
        const lookup: Record<string, EventAssignment> = {};

        accessibleEvents.forEach(event => {
            const key = `${event.personId}-${event.date}`;
            lookup[key] = event;
        });

        return lookup;
    }, [accessibleEvents]);

    // Helper function to get event for person and date
    const getEvent = useCallback(
        (personId: string, dateString: string): EventAssignment | undefined => {
            const key = `${personId}-${dateString}`;
            const event = eventLookup[key];

            return event;
        },
        [eventLookup]
    );

    // Enhanced cell click handler with multi-select support
    const handleCellClick = useCallback(
        (personId: string, dateString: string, ctrlKey: boolean, shiftKey: boolean) => {
            selectCell(personId, dateString, ctrlKey, shiftKey);
        },
        [selectCell]
    );

    // Keyboard navigation with multi-select support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            if (selectedCells.length === 0 || allPeople.length === 0 || dateColumns.length === 0) {
                return;
            }

            // Use the last selected cell for navigation
            const currentCell = lastSelectedCell || selectedCells[selectedCells.length - 1];
            const currentPersonIndex = allPeople.findIndex(person => person.id === currentCell.personId);
            const currentDateIndex = dateColumns.findIndex(col => col.dateString === currentCell.date);

            if (currentPersonIndex === -1 || currentDateIndex === -1) {
                return;
            }

            let newPersonIndex = currentPersonIndex;
            let newDateIndex = currentDateIndex;

            switch (e.key) {
                case "ArrowUp":
                    newPersonIndex = Math.max(0, currentPersonIndex - 1);
                    e.preventDefault();
                    break;
                case "ArrowDown":
                    newPersonIndex = Math.min(allPeople.length - 1, currentPersonIndex + 1);
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
                            const event = getEvent(currentCell.personId, currentCell.date);
                            if (onEditEvent && event && onEditEvent.canExecute && !onEditEvent.isExecuting) {
                                if (contextEventId?.setValue) {
                                    contextEventId.setValue(event.id);
                                }
                                onEditEvent.execute();
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

            if (newPersonIndex !== currentPersonIndex || newDateIndex !== currentDateIndex) {
                selectCell(
                    allPeople[newPersonIndex].id,
                    dateColumns[newDateIndex].dateString,
                    e.ctrlKey || e.metaKey,
                    e.shiftKey
                );
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [selectedCells, lastSelectedCell, allPeople, dateColumns, getEvent, onEditEvent, selectCell, contextEventId]);

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
    if (teamLaneStructure.length === 0 || allPeople.length === 0) {
        return (
            <EmptyState
                message="No People Available"
                description="No people found. Please check your data configuration."
                className={className}
            />
        );
    }

    return (
        <div className={`shift-scheduler-unified ${className}`}>
            {/* Enhanced debug info panel */}
            {showDebugInfo && (
                <DebugPanel
                    events={accessibleEvents}
                    allPeople={allPeople}
                    dateColumns={dateColumns}
                    teamLaneStructure={teamLaneStructure}
                    eventLookup={eventLookup}
                    selectedCells={selectedCells}
                    groupingDebugInfo={groupingDebugInfo}
                    teamCapacities={teamCapacities}
                    eventsLoading={eventsLoading}
                    onCreateEvent={onCreateEvent}
                    onEditEvent={onEditEvent}
                    onDeleteEvent={onDeleteEvent}
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
                                        {lane.people.map(person => (
                                            <div key={person.id} className="person-name-cell">
                                                {person.name}
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
                                <TeamSection
                                    key={teamData.teamId}
                                    team={teamData}
                                    dateColumns={dateColumns}
                                    getDayCellData={getDayCellData}
                                    getEvent={getEvent}
                                    getCapacityForTeamAndDate={getCapacityForTeamAndDate}
                                    isCellSelected={isCellSelected}
                                    eventsLoading={eventsLoading}
                                    onEditEvent={onEditEvent}
                                    onCreateEvent={onCreateEvent}
                                    onDeleteEvent={onDeleteEvent}
                                    contextEventId={contextEventId}
                                    contextPersonId={contextPersonId}
                                    contextDate={contextDate}
                                    onCellClick={handleCellClick}
                                    onContextMenu={handleCellContextMenu}
                                    readOnly={readOnly}
                                    trackInteractionError={trackInteractionError}
                                />
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
