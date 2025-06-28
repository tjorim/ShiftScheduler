import React, { createElement, useEffect, useState, useMemo, useCallback } from "react";
import { addDays, getDurationInMinutes, formatDateForShift } from "../utils/dateHelpers";
import { useScrollNavigation } from "../hooks/useScrollNavigation";
import { useTeamAccess, TeamAccessConfig } from "../hooks/useTeamAccess";
import { EmptyState, withErrorBoundary } from "./LoadingStates";
import DayCell from "./DayCell";
import {
    ContextMenu,
    ContextMenuOption,
    createEmptyCellMenu,
    createExistingShiftMenu,
    createMultiSelectMenu
} from "./ContextMenu";
import { Engineer, ShiftAssignment } from "../types/shiftScheduler";

interface ScheduleGridProps {
    engineers: Engineer[];
    shifts: ShiftAssignment[];
    getShiftsForEngineer: (engineerId: string) => ShiftAssignment[];
    getEngineersByTeam: () => { [team: string]: Engineer[] };
    onEditShift: (shift: any) => void;
    onCreateShift?: any; // ActionValue with canExecute and execute
    onDeleteShift?: (shift: any) => void;
    onBatchCreate?: (selectedCells: any[]) => void;
    onBatchEdit?: (selectedCells: any[]) => void;
    onBatchDelete?: (selectedCells: any[]) => void;
    readOnly?: boolean;
    className?: string;
    teamAccess?: TeamAccessConfig;
    showDebugInfo?: boolean;
    shiftsLoading?: boolean;
    debugInfo?: {
        attributesConfigured: {
            name: boolean;
            header: boolean;
            subheader: boolean;
            spUserAssociation: boolean;
            shiftAssociation: boolean;
            shiftDate: boolean;
        };
    };
}

// Helper functions for disabled actions with correct signatures
const noOpShiftFunction = (_shift: any): void => {
    // Intentionally empty - used for disabled shift menu actions
};

const noOpFunction = (): void => {
    // Intentionally empty - used for disabled menu actions
};

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
    engineers: _engineers,
    shifts,
    getShiftsForEngineer: _getShiftsForEngineer,
    getEngineersByTeam,
    onEditShift,
    onCreateShift,
    onDeleteShift,
    onBatchCreate,
    onBatchEdit,
    onBatchDelete,
    readOnly = false,
    className = "",
    teamAccess,
    showDebugInfo,
    shiftsLoading,
    debugInfo
}) => {
    // Team access control - use provided config or default to engineer role
    const defaultTeamAccess: TeamAccessConfig = {
        userRole: "engineer",
        allowCrossTeamView: false,
        allowShiftEditing: false,
        allowBatchOperations: false
    };

    const accessConfig = teamAccess || defaultTeamAccess;
    const { filteredShifts, canEditShift, canDeleteShift, canPerformBatchOperations, userPermissions } = useTeamAccess(
        _engineers,
        shifts,
        accessConfig
    );

    // Use filtered data based on user permissions
    // TODO: Filter teamsData to respect user access permissions
    const accessibleShifts = filteredShifts;

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
        if (isInfiniteScrollVisible) {
            setEndDate(d => addDays(d, 15));
        }
    }, [isInfiniteScrollVisible]);

    // Memoize teams data for performance
    const teamsData = useMemo(() => {
        try {
            return getEngineersByTeam();
        } catch (error) {
            console.warn("Error getting engineers by team:", error);
            return {};
        }
    }, [getEngineersByTeam]);

    // Group engineers by Header → Subheader → Engineers (data-driven with fallback)
    const { headerSubheaderStructure, allEngineers, groupingDebugInfo } = useMemo(() => {
        const debugMessages: string[] = [];

        // Check if we have any header grouping configured
        const hasHeaderGrouping = !!debugInfo && debugInfo.attributesConfigured?.header;
        const hasSubheaderGrouping = !!debugInfo && debugInfo.attributesConfigured?.subheader;

        debugMessages.push(`Processing ${Object.keys(teamsData).length} header groups`);
        debugMessages.push(`Header grouping: ${hasHeaderGrouping ? "✅" : "❌"}`);
        debugMessages.push(`Subheader grouping: ${hasSubheaderGrouping ? "✅" : "❌"}`);

        if (!hasHeaderGrouping) {
            // No grouping - flat list of all engineers
            const flatEngineers = Object.values(teamsData).flat();
            debugMessages.push("No header grouping - showing all engineers in single group");

            return {
                headerSubheaderStructure: [
                    {
                        headerName: "All Engineers",
                        headerId: "all-engineers",
                        subheaders: [
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

        const structure = Object.entries(teamsData).map(([headerName, engineers]) => {
            debugMessages.push(`Header "${headerName}": ${engineers.length} engineers`);

            if (!hasSubheaderGrouping) {
                // Only header grouping - no subheader grouping
                debugMessages.push(`  No subheader grouping for ${headerName}`);
                return {
                    headerName,
                    headerId: headerName.toLowerCase().replace(/\s+/g, "-"),
                    subheaders: [
                        {
                            name: "General",
                            engineers
                        }
                    ]
                };
            }

            // Both header and subheader grouping
            const subheaderGroups: { [subheader: string]: Engineer[] } = {};

            engineers.forEach((engineer, index) => {
                // Use engineer's subheader, default to 'General' if not specified
                const engineerSubheader = engineer.subheader || "General";

                if (!subheaderGroups[engineerSubheader]) {
                    subheaderGroups[engineerSubheader] = [];
                }
                subheaderGroups[engineerSubheader].push(engineer);

                // Debug first few engineers
                if (index < 2) {
                    debugMessages.push(
                        `  Engineer ${index}: ${engineer.name} (${engineer.header}/${engineer.subheader})`
                    );
                }
            });

            // Sort subheaders alphabetically (data-driven, no hardcoded order)
            const sortedSubheaders = Object.keys(subheaderGroups).sort();
            debugMessages.push(`  Subheaders: ${sortedSubheaders.join(", ")}`);

            return {
                headerName,
                headerId: headerName.toLowerCase().replace(/\s+/g, "-"),
                subheaders: sortedSubheaders.map(subheader => ({
                    name: subheader,
                    engineers: subheaderGroups[subheader]
                }))
            };
        });

        const flatEngineers: Engineer[] = structure.flatMap(header =>
            header.subheaders.flatMap(subheader => subheader.engineers)
        );

        return { headerSubheaderStructure: structure, allEngineers: flatEngineers, groupingDebugInfo: debugMessages };
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
                if (canPerformBatchOperations) {
                    // Multi-selection context menu (full permissions)
                    options = createMultiSelectMenu(
                        selectedCells.length,
                        () => {
                            if (onBatchCreate) {
                                onBatchCreate(selectedCells);
                            }
                        },
                        () => {
                            if (onBatchEdit) {
                                onBatchEdit(selectedCells);
                            }
                        },
                        () => {
                            if (onBatchDelete) {
                                onBatchDelete(selectedCells);
                            }
                        },
                        () => {
                            setSelectedCells([]);
                            setLastSelectedCell(null);
                        }
                    );
                } else {
                    // Limited menu when no batch permissions
                    options = [
                        {
                            label: `${selectedCells.length} cells selected`,
                            icon: "📊",
                            action: noOpFunction,
                            disabled: true,
                            separator: false
                        },
                        { separator: true } as ContextMenuOption,
                        {
                            label: "Clear Selection",
                            icon: "✕",
                            action: () => {
                                setSelectedCells([]);
                                setLastSelectedCell(null);
                            },
                            disabled: false,
                            separator: false
                        },
                        {
                            label: "Batch operations not permitted",
                            icon: "🔒",
                            action: noOpFunction,
                            disabled: true,
                            separator: false
                        }
                    ];
                }
            } else if (shift) {
                // Existing shift context menu (check edit/delete permissions)
                options = createExistingShiftMenu(
                    shift,
                    engineer,
                    canEditShift(shift)
                        ? shift => {
                              if (onEditShift) {
                                  onEditShift(shift);
                              }
                          }
                        : noOpShiftFunction,
                    canDeleteShift(shift)
                        ? shift => {
                              if (onDeleteShift) {
                                  onDeleteShift(shift);
                              }
                          }
                        : noOpShiftFunction
                );
            } else if (onCreateShift?.canExecute) {
                // Empty cell context menu (only if user can execute create action)
                options = createEmptyCellMenu(engineer, date, (engineerId, date) => {
                    if (onCreateShift && onCreateShift.canExecute && !onCreateShift.isExecuting) {
                        (onCreateShift as any).execute({
                            engineerId,
                            shiftDate: date
                        });
                    }
                });
            } else {
                // No permissions - show limited menu
                options = [
                    {
                        label: "No permissions",
                        icon: "🔒",
                        action: noOpFunction,
                        disabled: true,
                        separator: false
                    }
                ];
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
            selectedCells,
            canPerformBatchOperations,
            canEditShift,
            canDeleteShift,
            onEditShift,
            onDeleteShift,
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

        // Force console output for critical debugging
        console.log("🔍 SHIFTS DEBUG - Total shifts:", accessibleShifts.length);

        accessibleShifts.forEach((shift, index) => {
            const key = `${shift.engineerId}-${shift.date}`;
            lookup[key] = shift;

            // Debug only first 2 shifts due to large dataset
            if (index < 2) {
                console.log(`🔍 SHIFT ${index}:`, {
                    engineerId: shift.engineerId,
                    date: shift.date,
                    shift: shift.shift,
                    type: typeof shift.date,
                    key
                });
            }
        });

        console.log("🔍 LOOKUP DEBUG - Total keys:", Object.keys(lookup).length);
        console.log("🔍 SAMPLE KEYS:", Object.keys(lookup).slice(0, 3));

        return lookup;
    }, [accessibleShifts]);

    // Helper function to get shift for engineer and date
    const getShift = useCallback(
        (engineerId: string, dateString: string): ShiftAssignment | undefined => {
            const key = `${engineerId}-${dateString}`;
            const shift = shiftLookup[key];

            // Debug first few lookups only
            if (Math.random() < 0.001) {
                // Sample 0.1% of lookups
                console.log("🔍 LOOKUP TEST:", {
                    engineerId,
                    dateString,
                    key,
                    found: !!shift,
                    shift: shift ? `${shift.shift}` : "none"
                });
            }

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
                            console.error("Error in keyboard edit:", error);
                        }
                    } else {
                        // Multi-selection: could batch edit or show context menu
                        console.log(`Multi-edit for ${selectedCells.length} cells`);
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
    const shiftStats = useMemo(() => {
        const stats = {
            M: 0,
            E: 0,
            N: 0,
            D: 0,
            H: 0,
            T: 0,
            total: accessibleShifts.length
        };
        accessibleShifts.forEach(shift => {
            const shiftType = shift.shift.charAt(0); // Get first character (M, E, N, D, H, T)
            if (Object.prototype.hasOwnProperty.call(stats, shiftType)) {
                stats[shiftType as keyof typeof stats]++;
            }
        });
        return stats;
    }, [accessibleShifts]);

    // Error handling for empty data
    if (headerSubheaderStructure.length === 0 || allEngineers.length === 0) {
        return (
            <EmptyState
                message="No Engineers Available"
                description={
                    userPermissions.crossTeamAccess
                        ? "No engineers found. Please check your data configuration."
                        : "No engineers found in your accessible teams. Contact your administrator if this seems incorrect."
                }
                className={className}
            />
        );
    }

    return (
        <div className={`shift-scheduler-unified ${className}`}>
            {/* Enhanced debug info panel */}
            {showDebugInfo && (
                <div
                    style={{
                        background: "#e0f2fe",
                        padding: "12px",
                        fontSize: "11px",
                        borderBottom: "1px solid #0284c7",
                        color: "#0c4a6e",
                        fontFamily: "monospace"
                    }}
                >
                    <div>
                        🔍 Debug: Headers: {headerSubheaderStructure.length}, Engineers: {allEngineers.length}, Shifts:{" "}
                        {shifts.length}
                    </div>
                    <div>📊 Shift Lookup Keys: {Object.keys(shiftLookup).length}</div>
                    <div>
                        🏗️ Grouping:{" "}
                        {Array.isArray(groupingDebugInfo) ? groupingDebugInfo.join(" | ") : "Debug info unavailable"}
                    </div>
                    {debugInfo && (
                        <div>
                            ⚙️ Config: Name={debugInfo.attributesConfigured.name ? "✅" : "❌"}, Header=
                            {debugInfo.attributesConfigured.header ? "✅" : "❌"}, Subheader=
                            {debugInfo.attributesConfigured.subheader ? "✅" : "❌"}, SPUser=
                            {debugInfo.attributesConfigured.spUserAssociation ? "✅" : "❌"}, Shift=
                            {debugInfo.attributesConfigured.shiftAssociation ? "✅" : "❌"}, ShiftDate=
                            {debugInfo.attributesConfigured.shiftDate ? "✅" : "❌"}
                        </div>
                    )}
                    {shifts.length > 0 && (
                        <div>
                            <div>
                                🎯 First Shift: ID={shifts[0]?.engineerId}, Date={shifts[0]?.date}, Type=
                                {typeof shifts[0]?.date}, Shift={shifts[0]?.shift}
                            </div>
                            <div>🔑 Sample Keys: {Object.keys(shiftLookup).slice(0, 3).join(", ")}</div>
                        </div>
                    )}
                    {allEngineers.length > 0 && (
                        <div>
                            👤 First Engineer: ID={allEngineers[0]?.id}, Name={allEngineers[0]?.name}
                        </div>
                    )}
                    {dateColumns.length > 0 && (
                        <div>
                            📅 Timeline: {dateColumns[0]?.dateString} to{" "}
                            {dateColumns[dateColumns.length - 1]?.dateString} ({dateColumns.length} days)
                        </div>
                    )}
                    <div>
                        🔍 Test Lookup: Key={allEngineers[0]?.id}-{dateColumns[0]?.dateString} Found=
                        {!!shiftLookup[`${allEngineers[0]?.id}-${dateColumns[0]?.dateString}`]}
                    </div>
                    <div>
                        🔍 Engineer ID Types: Engineer={typeof allEngineers[0]?.id}, Shift=
                        {typeof shifts[0]?.engineerId}
                    </div>
                    <div>
                        🔍 Date Match Test: Timeline={dateColumns[0]?.dateString}, Shift={shifts[0]?.date}
                    </div>
                    <div>
                        📈 Performance: {Object.keys(shiftLookup).length} lookup keys,{" "}
                        {allEngineers.length * dateColumns.length} total cells
                    </div>
                    <div>
                        📊 Shift Stats: M:{shiftStats.M} E:{shiftStats.E} N:{shiftStats.N} D:{shiftStats.D} H:
                        {shiftStats.H} T:{shiftStats.T}
                    </div>
                    {selectedCells.length > 0 && (
                        <div>
                            🎯 Selected: {selectedCells.length} cell(s){" "}
                            {selectedCells.length === 1
                                ? `(${allEngineers.find(e => e.id === selectedCells[0].engineerId)?.name} on ${
                                      selectedCells[0].date
                                  })`
                                : ""}{" "}
                            - Ctrl+click: toggle, Shift+click: range, Arrows: navigate, Enter/Space: edit, Esc: clear
                        </div>
                    )}
                    <div
                        style={{
                            marginTop: "8px",
                            fontSize: "10px",
                            backgroundColor: "#f0f0f0",
                            padding: "8px",
                            borderRadius: "4px"
                        }}
                    >
                        <div>
                            <strong>🔍 Find engineers with shifts:</strong>
                        </div>
                        <pre style={{ fontSize: "9px", overflow: "auto", maxHeight: "80px" }}>
                            {(() => {
                                const engineersWithShifts = allEngineers
                                    .filter(eng => {
                                        const hasShift = shiftLookup[`${eng.id}-${dateColumns[0]?.dateString}`];
                                        return hasShift;
                                    })
                                    .slice(0, 3);

                                return JSON.stringify(
                                    engineersWithShifts.map(eng => ({
                                        id: eng.id,
                                        name: eng.name,
                                        header: eng.header,
                                        subheader: eng.subheader,
                                        hasShiftOnFirstDate: !!shiftLookup[`${eng.id}-${dateColumns[0]?.dateString}`]
                                    })),
                                    null,
                                    2
                                );
                            })()}
                        </pre>
                        <div style={{ marginTop: "4px" }}>
                            <strong>🔍 Sample shift engineer IDs:</strong>
                        </div>
                        <pre style={{ fontSize: "9px", overflow: "auto", maxHeight: "80px" }}>
                            {JSON.stringify(
                                shifts.slice(0, 5).map(shift => ({
                                    shiftId: shift.id,
                                    engineerId: shift.engineerId,
                                    shift: shift.shift,
                                    date: shift.date
                                })),
                                null,
                                2
                            )}
                        </pre>
                        <div style={{ marginTop: "4px" }}>
                            <strong>💡 Check: Do any engineer IDs match shift engineer IDs?</strong>
                        </div>
                        <pre style={{ fontSize: "9px", overflow: "auto", maxHeight: "60px" }}>
                            {(() => {
                                const shiftEngineerIds = new Set(shifts.map(s => s.engineerId));
                                const engineerIds = new Set(allEngineers.map(e => e.id));
                                const matches = [...shiftEngineerIds].filter(id => engineerIds.has(id));
                                const totalShiftEngineers = shiftEngineerIds.size;
                                const totalEngineers = engineerIds.size;

                                return JSON.stringify(
                                    {
                                        matchingIds: matches.slice(0, 3),
                                        totalMatches: matches.length,
                                        totalShiftEngineers,
                                        totalEngineers,
                                        sampleShiftIds: [...shiftEngineerIds].slice(0, 3),
                                        sampleEngineerIds: [...engineerIds].slice(0, 3)
                                    },
                                    null,
                                    2
                                );
                            })()}
                        </pre>

                        <div style={{ marginTop: "8px" }}>
                            <strong>🔍 Raw SPUser Object Properties:</strong>
                        </div>
                        <pre style={{ fontSize: "9px", overflow: "auto", maxHeight: "80px" }}>
                            {allEngineers.length > 0
                                ? JSON.stringify(
                                      {
                                          id: allEngineers[0].mendixObject.id,
                                          allOwnProperties: Object.getOwnPropertyNames(allEngineers[0].mendixObject),
                                          allPrototypeProperties: Object.getOwnPropertyNames(
                                              Object.getPrototypeOf(allEngineers[0].mendixObject)
                                          ),
                                          objectKeys: Object.keys(allEngineers[0].mendixObject),
                                          directAccess: {
                                              Username: (allEngineers[0].mendixObject as any).Username,
                                              Name: (allEngineers[0].mendixObject as any).Name,
                                              Email: (allEngineers[0].mendixObject as any).Email,
                                              Abbreviation: (allEngineers[0].mendixObject as any).Abbreviation,
                                              id: (allEngineers[0].mendixObject as any).id
                                          },
                                          typeofCheck: typeof allEngineers[0].mendixObject,
                                          constructorName: allEngineers[0].mendixObject.constructor.name
                                      },
                                      null,
                                      2
                                  )
                                : "No engineers"}
                        </pre>

                        <div style={{ marginTop: "8px" }}>
                            <strong>🔍 Raw CalendarEvent Object Properties:</strong>
                        </div>
                        <pre style={{ fontSize: "9px", overflow: "auto", maxHeight: "80px" }}>
                            {shifts.length > 0
                                ? JSON.stringify(
                                      {
                                          id: shifts[0].mendixObject.id,
                                          allProperties: Object.keys(shifts[0].mendixObject),
                                          directAccess: {
                                              SPUser: (shifts[0].mendixObject as any).SPUser,
                                              CalendarEvents_SPUser: (shifts[0].mendixObject as any)
                                                  .CalendarEvents_SPUser,
                                              Engineer: (shifts[0].mendixObject as any).Engineer,
                                              User: (shifts[0].mendixObject as any).User
                                          }
                                      },
                                      null,
                                      2
                                  )
                                : "No shifts"}
                        </pre>
                    </div>
                </div>
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
                        {headerSubheaderStructure.map(headerData => (
                            <div key={headerData.headerId}>
                                <div className="team-name-cell">{headerData.headerName}</div>
                                {headerData.subheaders.map(subheader => (
                                    <div key={`${headerData.headerId}-${subheader.name}`}>
                                        <div className="lane-name-cell">{subheader.name}</div>
                                        {subheader.engineers.map(engineer => (
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
                            {headerSubheaderStructure.map(headerData => (
                                <div key={headerData.headerId}>
                                    <div className="team-timeline-row">
                                        {dateColumns.map((_, idx) => (
                                            <div key={idx} className="team-timeline-cell"></div>
                                        ))}
                                    </div>
                                    {headerData.subheaders.map(subheader => (
                                        <div key={`${headerData.headerId}-${subheader.name}`}>
                                            <div className="lane-timeline-row">
                                                {dateColumns.map((_, idx) => (
                                                    <div key={idx} className="lane-timeline-cell"></div>
                                                ))}
                                            </div>
                                            {subheader.engineers.map(engineer => (
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
                                                                            if (onEditShift) {
                                                                                onEditShift(shift);
                                                                            }
                                                                        } else {
                                                                            // Empty cell: create new shift
                                                                            if (
                                                                                onCreateShift?.canExecute &&
                                                                                !onCreateShift.isExecuting
                                                                            ) {
                                                                                (onCreateShift as any).execute({
                                                                                    engineerId: engineer.id,
                                                                                    shiftDate: col.dateString
                                                                                });
                                                                            }
                                                                        }
                                                                    } catch (error) {
                                                                        console.error(
                                                                            `Error in onDoubleClick for ${engineer.name}:`,
                                                                            error
                                                                        );
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
            <div ref={infiniteScrollRef} className="sentinel" style={{ height: "20px", visibility: "hidden" }} />

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
