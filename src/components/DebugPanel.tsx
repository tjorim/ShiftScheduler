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
        <div
            style={{
                background: "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)",
                border: "1px solid #0284c7",
                borderRadius: "8px",
                margin: "8px",
                fontSize: "11px",
                color: "#0c4a6e",
                fontFamily: "monospace",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
        >
            {/* Header */}
            <div
                style={{
                    background: "#0284c7",
                    color: "#ffffff",
                    padding: "8px 12px",
                    fontWeight: "bold",
                    borderRadius: "7px 7px 0 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <span>🔍 Shift Scheduler Debug Panel</span>
                <span style={{ fontSize: "10px", opacity: 0.9 }}>v{VERSION}</span>
            </div>

            {/* Content */}
            <div style={{ padding: "12px" }}>
                {/* Core Stats */}
                <div style={{ marginBottom: "8px" }}>
                    <strong>📊 Core Statistics:</strong>
                    <div style={{ marginLeft: "16px", marginTop: "4px" }}>
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
                <div style={{ marginBottom: "8px" }}>
                    <strong>⚡ Performance:</strong>
                    <div style={{ marginLeft: "16px", marginTop: "4px" }}>
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
                    <div style={{ marginBottom: "8px" }}>
                        <strong>⚙️ Widget Configuration:</strong>
                        <div
                            style={{
                                marginLeft: "16px",
                                marginTop: "4px",
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "2px"
                            }}
                        >
                            <div>Name: {debugInfo.attributesConfigured.name ? "✅" : "❌"}</div>
                            <div>Header: {debugInfo.attributesConfigured.header ? "✅" : "❌"}</div>
                            <div>Subheader: {debugInfo.attributesConfigured.subheader ? "✅" : "❌"}</div>
                            <div>SPUser: {debugInfo.attributesConfigured.spUserAssociation ? "✅" : "❌"}</div>
                            <div>Shift Assoc: {debugInfo.attributesConfigured.shiftAssociation ? "✅" : "❌"}</div>
                            <div>Shift Date: {debugInfo.attributesConfigured.shiftDate ? "✅" : "❌"}</div>
                        </div>
                    </div>
                )}

                {/* Actions Status */}
                <div style={{ marginBottom: "8px" }}>
                    <strong>🎯 Action Configuration:</strong>
                    <div
                        style={{
                            marginLeft: "16px",
                            marginTop: "4px",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "2px"
                        }}
                    >
                        <div>Create: {getActionStatus(onCreateShift)}</div>
                        <div>Edit: {getActionStatus(onEditShift)}</div>
                        <div>Delete: {getActionStatus(onDeleteShift)}</div>
                        <div>Batch Create: {getActionStatus(onBatchCreate)}</div>
                        <div>Batch Edit: {getActionStatus(onBatchEdit)}</div>
                        <div>Batch Delete: {getActionStatus(onBatchDelete)}</div>
                    </div>
                </div>

                {/* Shift Distribution */}
                <div style={{ marginBottom: "8px" }}>
                    <strong>📈 Shift Distribution:</strong>
                    <div
                        style={{
                            marginLeft: "16px",
                            marginTop: "4px",
                            display: "flex",
                            gap: "12px",
                            flexWrap: "wrap"
                        }}
                    >
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
                    <div style={{ marginBottom: "8px" }}>
                        <strong>🔍 Data Quality:</strong>
                        <div style={{ marginLeft: "16px", marginTop: "4px" }}>
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
                    <div style={{ marginBottom: "8px" }}>
                        <strong>🎯 Selection Details:</strong>
                        <div style={{ marginLeft: "16px", marginTop: "4px" }}>
                            <div>• Selected: {selectedCells.length} cell(s)</div>
                            {selectedCells.length === 1 && (
                                <div>
                                    • Current: {allEngineers.find(e => e.id === selectedCells[0].engineerId)?.name} on{" "}
                                    {selectedCells[0].date}
                                </div>
                            )}
                            <div style={{ fontSize: "10px", marginTop: "2px", opacity: 0.8 }}>
                                Ctrl+click: toggle, Shift+click: range, Arrows: navigate, Enter/Space: edit, Esc: clear
                            </div>
                        </div>
                    </div>
                )}

                {/* Grouping Details */}
                {Array.isArray(groupingDebugInfo) && groupingDebugInfo.length > 0 && (
                    <details style={{ marginTop: "8px" }}>
                        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>🏗️ Grouping Details</summary>
                        <div
                            style={{
                                marginLeft: "16px",
                                marginTop: "4px",
                                fontSize: "10px",
                                maxHeight: "100px",
                                overflow: "auto"
                            }}
                        >
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
