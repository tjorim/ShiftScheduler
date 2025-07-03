import React, { createElement, useMemo } from "react";
import { Person, EventAssignment, TeamCapacity } from "../types/shiftScheduler";
import { VERSION } from "../version";

interface DebugPanelProps {
    // Core data
    events: EventAssignment[];
    allPeople: Person[];
    dateColumns: Array<{ dateString: string; date: Date; isToday: boolean; isWeekend: boolean }>;
    teamLaneStructure: Array<{
        teamName: string;
        teamId: string;
        lanes: Array<{ name: string; people: Person[] }>;
    }>;
    eventLookup: Record<string, EventAssignment>;
    selectedCells: Array<{ personId: string; date: string }>;
    groupingDebugInfo: string[];
    teamCapacities: TeamCapacity[];
    eventsLoading?: boolean;

    // Actions for permission display
    onCreateEvent?: any;
    onEditEvent?: any;
    onDeleteEvent?: any;
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
            teamCapacities: boolean;
        };
        microflowInfo: {
            message: string;
        };
        microflowValidation?: {
            people: {
                status: string;
                itemCount: number;
                expectedMicroflow: string;
                expectedFields: string[];
                actualFields: string[];
                sampleData: {
                    id: string;
                    attributes: string[];
                } | null;
            };
            events: {
                status: string;
                itemCount: number;
                expectedMicroflow: string;
                expectedFields: string[];
                actualFields: string[];
                sampleData: {
                    id: string;
                    attributes: string[];
                } | null;
            };
            teamCapacities: {
                status: string;
                itemCount: number;
                expectedMicroflow: string;
                expectedFields: string[];
                actualFields: string[];
                sampleData: {
                    id: string;
                    attributes: string[];
                } | null;
            };
        };
        processingErrors?: string[];
        interactionErrors?: string[];
        dataQualityIssues?: string[];
    };
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
    events,
    allPeople,
    dateColumns,
    teamLaneStructure,
    eventLookup,
    selectedCells,
    groupingDebugInfo,
    teamCapacities,
    eventsLoading,
    onCreateEvent,
    onEditEvent,
    onDeleteEvent,
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
            total: events.length
        };
        events.forEach(event => {
            const eventType = event.shift.charAt(0); // Get first character (M, E, N, D, H, T)
            if (Object.prototype.hasOwnProperty.call(stats, eventType)) {
                stats[eventType as keyof typeof stats]++;
            }
        });
        return stats;
    }, [events]);

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
                        <div>• People: {allPeople.length}</div>
                        <div>
                            • Events: {events.length} ({Object.keys(eventLookup).length} lookup keys)
                        </div>
                        <div>• Timeline: {dateColumns.length} days</div>
                        <div>• Selected: {selectedCells.length} cells</div>
                    </div>
                </div>

                {/* Performance Stats */}
                <div className="debug-section">
                    <div className="debug-section-title">⚡ Performance:</div>
                    <div className="debug-section-content">
                        <div>• Total cells: {allPeople.length * dateColumns.length}</div>
                        <div>
                            • Lookup efficiency:{" "}
                            {events.length > 0
                                ? Math.round((Object.keys(eventLookup).length / events.length) * 100)
                                : 0}
                            %
                        </div>
                        <div>• Loading: {eventsLoading ? "🔄 Events loading..." : "✅ All loaded"}</div>
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
                            <div>Team Capacities: {debugInfo.attributesConfigured.teamCapacities ? "✅" : "❌"}</div>
                        </div>
                    </div>
                )}

                {/* Actions Status */}
                <div className="debug-section">
                    <div className="debug-section-title">🎯 Action Configuration:</div>
                    <div className="debug-section-content debug-grid">
                        <div>Create: {getActionStatus(onCreateEvent)}</div>
                        <div>Edit: {getActionStatus(onEditEvent)}</div>
                        <div>Delete: {getActionStatus(onDeleteEvent)}</div>
                        <div>Batch Create: {getActionStatus(onBatchCreate)}</div>
                        <div>Batch Edit: {getActionStatus(onBatchEdit)}</div>
                        <div>Batch Delete: {getActionStatus(onBatchDelete)}</div>
                    </div>
                </div>

                {/* Microflow Information */}
                {debugInfo && debugInfo.microflowInfo && (
                    <div className="debug-section">
                        <div className="debug-section-title">🔄 Data Source Architecture:</div>
                        <div className="debug-section-content">
                            <div>{debugInfo.microflowInfo.message}</div>
                        </div>
                    </div>
                )}

                {/* Microflow Validation */}
                {debugInfo && debugInfo.microflowValidation && (
                    <div className="debug-section">
                        <div className="debug-section-title">🔍 Microflow Data Validation:</div>
                        <div className="debug-section-content">
                            <div>
                                <strong>People ({debugInfo.microflowValidation.people.expectedMicroflow}):</strong>
                            </div>
                            <div>• Status: {debugInfo.microflowValidation.people.status}</div>
                            <div>• Items: {debugInfo.microflowValidation.people.itemCount}</div>
                            <div>
                                • Expected fields: {debugInfo.microflowValidation.people.expectedFields.join(", ")}
                            </div>
                            <div>
                                • Actual fields:{" "}
                                {debugInfo.microflowValidation.people.actualFields.join(", ") || "No data"}
                            </div>
                            {debugInfo.microflowValidation.people.sampleData && (
                                <div style={{ fontSize: "0.8em", color: "#666" }}>
                                    • Sample ID: {debugInfo.microflowValidation.people.sampleData.id}
                                </div>
                            )}

                            <div style={{ marginTop: "8px" }}>
                                <strong>Events ({debugInfo.microflowValidation.events.expectedMicroflow}):</strong>
                            </div>
                            <div>• Status: {debugInfo.microflowValidation.events.status}</div>
                            <div>• Items: {debugInfo.microflowValidation.events.itemCount}</div>
                            <div>
                                • Expected fields: {debugInfo.microflowValidation.events.expectedFields.join(", ")}
                            </div>
                            <div>
                                • Actual fields:{" "}
                                {debugInfo.microflowValidation.events.actualFields.join(", ") || "No data"}
                            </div>
                            {debugInfo.microflowValidation.events.sampleData && (
                                <div style={{ fontSize: "0.8em", color: "#666" }}>
                                    • Sample ID: {debugInfo.microflowValidation.events.sampleData.id}
                                </div>
                            )}

                            <div style={{ marginTop: "8px" }}>
                                <strong>
                                    Capacities ({debugInfo.microflowValidation.teamCapacities.expectedMicroflow}):
                                </strong>
                            </div>
                            <div>• Status: {debugInfo.microflowValidation.teamCapacities.status}</div>
                            <div>• Items: {debugInfo.microflowValidation.teamCapacities.itemCount}</div>
                            <div>
                                • Expected fields:{" "}
                                {debugInfo.microflowValidation.teamCapacities.expectedFields.join(", ")}
                            </div>
                            <div>
                                • Actual fields:{" "}
                                {debugInfo.microflowValidation.teamCapacities.actualFields.join(", ") || "No data"}
                            </div>
                            {debugInfo.microflowValidation.teamCapacities.sampleData && (
                                <div style={{ fontSize: "0.8em", color: "#666" }}>
                                    • Sample ID: {debugInfo.microflowValidation.teamCapacities.sampleData.id}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Processing Errors */}
                {debugInfo && debugInfo.processingErrors && debugInfo.processingErrors.length > 0 && (
                    <div className="debug-section">
                        <div className="debug-section-title">⚠️ Processing Errors:</div>
                        <div className="debug-section-content">
                            <div>Found {debugInfo.processingErrors.length} error(s) during data processing:</div>
                            {debugInfo.processingErrors.slice(0, 10).map((error, index) => (
                                <div key={index} style={{ fontSize: "11px", color: "#dc2626", marginTop: "4px" }}>
                                    • {error}
                                </div>
                            ))}
                            {debugInfo.processingErrors.length > 10 && (
                                <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "4px" }}>
                                    ... and {debugInfo.processingErrors.length - 10} more errors
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Interaction Errors */}
                {debugInfo && debugInfo.interactionErrors && debugInfo.interactionErrors.length > 0 && (
                    <div className="debug-section">
                        <div className="debug-section-title">🔧 Interaction Errors:</div>
                        <div className="debug-section-content">
                            <div>Found {debugInfo.interactionErrors.length} error(s) during UI interactions:</div>
                            {debugInfo.interactionErrors.slice(0, 10).map((error, index) => (
                                <div key={index} style={{ fontSize: "11px", color: "#ea580c", marginTop: "4px" }}>
                                    • {error}
                                </div>
                            ))}
                            {debugInfo.interactionErrors.length > 10 && (
                                <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "4px" }}>
                                    ... and {debugInfo.interactionErrors.length - 10} more errors
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Data Quality Issues */}
                {debugInfo && debugInfo.dataQualityIssues && debugInfo.dataQualityIssues.length > 0 && (
                    <div className="debug-section">
                        <div className="debug-section-title">📊 Data Quality Issues:</div>
                        <div className="debug-section-content">
                            <div>Found {debugInfo.dataQualityIssues.length} data quality issue(s):</div>
                            {debugInfo.dataQualityIssues.slice(0, 10).map((issue, index) => (
                                <div key={index} style={{ fontSize: "11px", color: "#ca8a04", marginTop: "4px" }}>
                                    • {issue}
                                </div>
                            ))}
                            {debugInfo.dataQualityIssues.length > 10 && (
                                <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "4px" }}>
                                    ... and {debugInfo.dataQualityIssues.length - 10} more errors
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
                {events.length > 0 && (
                    <div className="debug-section">
                        <div className="debug-section-title">🔍 Data Quality:</div>
                        <div className="debug-section-content">
                            <div>
                                • First event: {events[0]?.personId} on {events[0]?.date} ({events[0]?.shift})
                            </div>
                            <div>
                                • Date range: {dateColumns[0]?.dateString} →{" "}
                                {dateColumns[dateColumns.length - 1]?.dateString}
                            </div>
                            <div>
                                • Sample lookup: {allPeople[0]?.id}-{dateColumns[0]?.dateString} ={" "}
                                {eventLookup[`${allPeople[0]?.id}-${dateColumns[0]?.dateString}`] ? "✅" : "❌"}
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
                                    • Current: {allPeople.find(e => e.id === selectedCells[0].personId)?.name} on{" "}
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
