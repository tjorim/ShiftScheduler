import React, { createElement, useMemo } from "react";
import { Engineer, ShiftAssignment } from "../types/shiftScheduler";
import { VERSION } from "../version";

interface DebugPanelProps {
    // Core data
    shifts: ShiftAssignment[];
    allEngineers: Engineer[];
    dateColumns: Array<{ dateString: string; date: Date; isToday: boolean; isWeekend: boolean }>;
    headerSubheaderStructure: Array<{
        headerName: string;
        headerId: string;
        subheaders: Array<{ name: string; engineers: Engineer[] }>;
    }>;
    shiftLookup: Record<string, ShiftAssignment>;
    selectedCells: Array<{ engineerId: string; date: string }>;
    groupingDebugInfo: string[];
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
            header: boolean;
            subheader: boolean;
            spUserAssociation: boolean;
            shiftAssociation: boolean;
            shiftDate: boolean;
            filters?: boolean;
            filterTeamAssociation?: boolean;
            filterLaneAssociation?: boolean;
        };
        filterInfo?: {
            hasFilters: boolean;
            allowedHeaders: string[];
            allowedSubheaders: string[];
        };
    };
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
    shifts,
    allEngineers,
    dateColumns,
    headerSubheaderStructure,
    shiftLookup,
    selectedCells,
    groupingDebugInfo,
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
                        <div>• Teams: {headerSubheaderStructure.length}</div>
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
                            <div>Header: {debugInfo.attributesConfigured.header ? "✅" : "❌"}</div>
                            <div>Subheader: {debugInfo.attributesConfigured.subheader ? "✅" : "❌"}</div>
                            <div>SPUser: {debugInfo.attributesConfigured.spUserAssociation ? "✅" : "❌"}</div>
                            <div>Shift Assoc: {debugInfo.attributesConfigured.shiftAssociation ? "✅" : "❌"}</div>
                            <div>Shift Date: {debugInfo.attributesConfigured.shiftDate ? "✅" : "❌"}</div>
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
                                        <strong>Allowed Headers (Teams):</strong>
                                        <div className="debug-filter-value">
                                            {debugInfo.filterInfo.allowedHeaders.length > 0
                                                ? debugInfo.filterInfo.allowedHeaders.join(", ")
                                                : "All headers allowed"}
                                        </div>
                                    </div>
                                    <div className="debug-filter-item">
                                        <strong>Allowed Subheaders (Lanes):</strong>
                                        <div className="debug-filter-value">
                                            {debugInfo.filterInfo.allowedSubheaders.length > 0
                                                ? debugInfo.filterInfo.allowedSubheaders.join(", ")
                                                : "All subheaders allowed"}
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
