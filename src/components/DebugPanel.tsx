import React, { createElement, useMemo } from "react";
import { Engineer, ShiftAssignment, TeamCapacity } from "../types/shiftScheduler";
import { VERSION } from "../version";

interface DebugPanelProps {
    // Core data
    shifts: ShiftAssignment[];
    allEngineers: Engineer[];
    dateColumns: Array<{ dateString: string; date: Date; isToday: boolean; isWeekend: boolean }>;
    teamLaneStructure: Array<{
        teamName: string;
        teamId: string;
        lanes: Array<{ name: string; engineers: Engineer[] }>;
    }>;
    shiftLookup: Record<string, ShiftAssignment>;
    selectedCells: Array<{ engineerId: string; date: string }>;
    groupingDebugInfo: string[];
    teamCapacities: TeamCapacity[];
    shiftsLoading?: boolean;

    // Actions for permission display
    onCreateShift?: any;
    onEditShift?: any;
    onDeleteShift?: any;
    onBatchCreate?: any;
    onBatchEdit?: any;
    onBatchDelete?: any;

    // Widget configuration
    debugInfo?: {
        attributesConfigured: {
            name: boolean;
            team: boolean;
            lane: boolean;
            spUserAssociation: boolean;
            eventDate: boolean;
            filters: boolean;
            filterTeamAssociation: boolean;
            filterLaneAssociation: boolean;
        };
        filterInfo: {
            hasFilters: boolean;
            filteredTeams: string[];
            filteredLanes: string[];
        };
    };
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
    shifts,
    allEngineers,
    dateColumns,
    teamLaneStructure,
    shiftLookup,
    selectedCells,
    groupingDebugInfo,
    teamCapacities,
    shiftsLoading,
    onCreateShift,
    onEditShift,
    onDeleteShift,
    onBatchCreate,
    onBatchEdit,
    onBatchDelete,
    debugInfo
}) => {
    // Calculate shift statistics
    const shiftStats = useMemo(() => {
        const stats = {
            M: 0,
            E: 0,
            N: 0,
            D: 0,
            H: 0,
            T: 0,
            total: shifts.length
        };
        shifts.forEach(shift => {
            const shiftType = shift.shift.charAt(0); // Get first character (M, E, N, D, H, T)
            if (Object.prototype.hasOwnProperty.call(stats, shiftType)) {
                stats[shiftType as keyof typeof stats]++;
            }
        });
        return stats;
    }, [shifts]);

    // Helper function for action status
    const getActionStatus = (action: any): string => {
        if (!action) {
            return "❌ Not configured";
        }
        if (action.canExecute === true) {
            return "✅ Allowed";
        }
        return "🔒 No permission";
    };

    return (
        <div className="debug-panel">
            {/* Header */}
            <div className="debug-panel-header">
                <span>🔍 Shift Scheduler Debug Panel</span>
                <span className="debug-panel-version">v{VERSION}</span>
            </div>

            {/* Content */}
            <div className="debug-panel-content">
                {/* Core Stats */}
                <div className="debug-section">
                    <div className="debug-section-title">📊 Core Statistics:</div>
                    <div className="debug-section-content">
                        <div>• Teams: {teamLaneStructure.length}</div>
                        <div>• Engineers: {allEngineers.length}</div>
                        <div>
                            • Shifts: {shifts.length} ({Object.keys(shiftLookup).length} lookup keys)
                        </div>
                        <div>• Timeline: {dateColumns.length} days</div>
                        <div>• Selected: {selectedCells.length} cells</div>
                    </div>
                </div>

                {/* Performance Stats */}
                <div className="debug-section">
                    <div className="debug-section-title">⚡ Performance:</div>
                    <div className="debug-section-content">
                        <div>• Total cells: {allEngineers.length * dateColumns.length}</div>
                        <div>
                            • Lookup efficiency:{" "}
                            {shifts.length > 0
                                ? Math.round((Object.keys(shiftLookup).length / shifts.length) * 100)
                                : 0}
                            %
                        </div>
                        <div>• Loading: {shiftsLoading ? "🔄 Shifts loading..." : "✅ All loaded"}</div>
                    </div>
                </div>

                {/* Configuration Status */}
                {debugInfo && (
                    <div className="debug-section">
                        <div className="debug-section-title">⚙️ Widget Configuration:</div>
                        <div className="debug-section-content debug-grid">
                            <div>Name: {debugInfo.attributesConfigured.name ? "✅" : "❌"}</div>
                            <div>Team: {debugInfo.attributesConfigured.team ? "✅" : "❌"}</div>
                            <div>Lane: {debugInfo.attributesConfigured.lane ? "✅" : "❌"}</div>
                            <div>SPUser: {debugInfo.attributesConfigured.spUserAssociation ? "✅" : "❌"}</div>
                            <div>Event Date: {debugInfo.attributesConfigured.eventDate ? "✅" : "❌"}</div>
                            <div>Filters: {debugInfo.attributesConfigured.filters ? "✅" : "❌"}</div>
                            <div>
                                Filter Teams: {debugInfo.attributesConfigured.filterTeamAssociation ? "✅" : "❌"}
                            </div>
                            <div>
                                Filter Lanes: {debugInfo.attributesConfigured.filterLaneAssociation ? "✅" : "❌"}
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions Status */}
                <div className="debug-section">
                    <div className="debug-section-title">🎯 Action Configuration:</div>
                    <div className="debug-section-content debug-grid">
                        <div>Create: {getActionStatus(onCreateShift)}</div>
                        <div>Edit: {getActionStatus(onEditShift)}</div>
                        <div>Delete: {getActionStatus(onDeleteShift)}</div>
                        <div>Batch Create: {getActionStatus(onBatchCreate)}</div>
                        <div>Batch Edit: {getActionStatus(onBatchEdit)}</div>
                        <div>Batch Delete: {getActionStatus(onBatchDelete)}</div>
                    </div>
                </div>

                {/* Filter Information */}
                {debugInfo && debugInfo.filterInfo && (
                    <div className="debug-section">
                        <div className="debug-section-title">🔍 Filter Status:</div>
                        <div className="debug-section-content">
                            <div>Active: {debugInfo.filterInfo.hasFilters ? "✅ Yes" : "❌ No filters configured"}</div>
                            {debugInfo.filterInfo.hasFilters && (
                                <div>
                                    <div className="debug-filter-item">
                                        <strong>Filtered Teams:</strong>
                                        <div className="debug-filter-value">
                                            {debugInfo.filterInfo.filteredTeams.length > 0
                                                ? debugInfo.filterInfo.filteredTeams.join(", ")
                                                : "All teams shown"}
                                        </div>
                                    </div>
                                    <div className="debug-filter-item">
                                        <strong>Filtered Lanes:</strong>
                                        <div className="debug-filter-value">
                                            {debugInfo.filterInfo.filteredLanes.length > 0
                                                ? debugInfo.filterInfo.filteredLanes.join(", ")
                                                : "All lanes shown"}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Shift Distribution */}
                <div className="debug-section">
                    <div className="debug-section-title">📈 Shift Distribution:</div>
                    <div className="debug-section-content debug-flex-row">
                        <span>M: {shiftStats.M}</span>
                        <span>E: {shiftStats.E}</span>
                        <span>N: {shiftStats.N}</span>
                        <span>D: {shiftStats.D}</span>
                        <span>H: {shiftStats.H}</span>
                        <span>T: {shiftStats.T}</span>
                    </div>
                </div>

                {/* Team Capacity */}
                {teamCapacities.length > 0 && (
                    <div className="debug-section">
                        <div className="debug-section-title">⚡ Team Capacity:</div>
                        <div className="debug-section-content">
                            <div>
                                • Total teams:{" "}
                                {new Set(teamCapacities.map(c => `${c.teamName}-${c.isNXT ? "NXT" : "XT"}`)).size}
                            </div>
                            <div>• Total capacity data points: {teamCapacities.length}</div>
                            <div>
                                • Avg capacity:{" "}
                                {teamCapacities.length > 0
                                    ? Math.round(
                                          teamCapacities.reduce((sum, c) => sum + c.percentage, 0) /
                                              teamCapacities.length
                                      )
                                    : 0}
                                %
                            </div>
                            <div>
                                • Teams below target: {teamCapacities.filter(c => !c.meetsTarget).length} /{" "}
                                {teamCapacities.length}
                            </div>
                            {teamCapacities.slice(0, 3).map((capacity, idx) => (
                                <div key={idx} style={{ fontSize: "11px", opacity: 0.8 }}>
                                    • {capacity.teamName} {capacity.isNXT ? "NXT" : "XT"} ({capacity.date}):{" "}
                                    {capacity.percentage}%
                                    {capacity.target > 0 ? (capacity.meetsTarget ? " ✅" : " ❌") : " ⚪"}
                                </div>
                            ))}
                            {teamCapacities.length > 3 && (
                                <div style={{ fontSize: "11px", opacity: 0.6 }}>
                                    ... and {teamCapacities.length - 3} more
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Data Quality */}
                {shifts.length > 0 && (
                    <div className="debug-section">
                        <div className="debug-section-title">🔍 Data Quality:</div>
                        <div className="debug-section-content">
                            <div>
                                • First shift: {shifts[0]?.engineerId} on {shifts[0]?.date} ({shifts[0]?.shift})
                            </div>
                            <div>
                                • Date range: {dateColumns[0]?.dateString} →{" "}
                                {dateColumns[dateColumns.length - 1]?.dateString}
                            </div>
                            <div>
                                • Sample lookup: {allEngineers[0]?.id}-{dateColumns[0]?.dateString} ={" "}
                                {shiftLookup[`${allEngineers[0]?.id}-${dateColumns[0]?.dateString}`] ? "✅" : "❌"}
                            </div>
                        </div>
                    </div>
                )}

                {/* Selected Cells Info */}
                {selectedCells.length > 0 && (
                    <div className="debug-section">
                        <div className="debug-section-title">🎯 Selection Details:</div>
                        <div className="debug-section-content">
                            <div>• Selected: {selectedCells.length} cell(s)</div>
                            {selectedCells.length === 1 && (
                                <div>
                                    • Current: {allEngineers.find(e => e.id === selectedCells[0].engineerId)?.name} on{" "}
                                    {selectedCells[0].date}
                                </div>
                            )}
                            <div className="debug-help-text">
                                Ctrl+click: toggle, Shift+click: range, Arrows: navigate, Enter/Space: edit, Esc: clear
                            </div>
                        </div>
                    </div>
                )}

                {/* Grouping Details */}
                {Array.isArray(groupingDebugInfo) && groupingDebugInfo.length > 0 && (
                    <details className="debug-details">
                        <summary>🏗️ Grouping Details</summary>
                        <div className="debug-details-content">
                            {groupingDebugInfo.map((info, idx) => (
                                <div key={idx}>• {info}</div>
                            ))}
                        </div>
                    </details>
                )}
            </div>
        </div>
    );
};

export default DebugPanel;
