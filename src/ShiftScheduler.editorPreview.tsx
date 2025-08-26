import React, { ReactElement, createElement } from "react";
import { ShiftSchedulerPreviewProps } from "../typings/ShiftSchedulerProps";
import { VERSION } from "./version";

/**
 * Renders a static preview of a shift scheduler, displaying a weekly schedule for a sample team.
 *
 * The preview includes a styled header, a grid with team and individual shift assignments for each day of the week, and a legend explaining shift codes.
 *
 * @returns A React element representing the shift scheduler preview UI.
 */
export function preview(_props: ShiftSchedulerPreviewProps): ReactElement {
    const headerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "12px",
        padding: "8px 12px",
        backgroundColor: "#f8fafc",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "600"
    };

    const containerStyle = {
        border: "1px solid #e2e8f0",
        borderRadius: "6px",
        overflow: "hidden",
        backgroundColor: "#ffffff"
    };

    const headerContainerStyle = {
        display: "flex"
    };

    const personColumnStyle = {
        width: "120px",
        backgroundColor: "#f8fafc",
        borderRight: "1px solid #e2e8f0"
    };

    const timelineStyle = {
        flex: "1",
        backgroundColor: "#ffffff"
    };

    const barStyle = (bgColor: string): React.CSSProperties => ({
        display: "flex",
        backgroundColor: bgColor,
        borderBottom: "1px solid #e2e8f0"
    });

    const spanStyle = (width: number, bgColor: string, textColor = "#374151"): React.CSSProperties => ({
        flex: `0 0 ${width}px`,
        padding: "6px 8px",
        fontSize: "11px",
        fontWeight: "600",
        textAlign: "center" as const,
        backgroundColor: bgColor,
        color: textColor,
        borderRight: "1px solid #e2e8f0"
    });

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "120px repeat(7, 60px)",
        gap: "1px",
        backgroundColor: "#e2e8f0"
    };

    const cellStyle = (bgColor: string, textColor = "#374151"): React.CSSProperties => ({
        padding: "8px 4px",
        backgroundColor: bgColor,
        fontSize: "11px",
        textAlign: "center" as const,
        fontWeight: "500",
        color: textColor
    });

    const shiftStyle = (color: string): React.CSSProperties => ({
        ...cellStyle("#ffffff"),
        backgroundColor: color,
        color: "#ffffff",
        fontWeight: "600",
        textShadow: "0 1px 2px rgba(0,0,0,0.3)"
    });

    return (
        <div
            style={{
                padding: "16px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                minHeight: "200px"
            }}
        >
            <div style={headerStyle}>
                <span style={{ color: "#1e40af" }}>🎯 Shift Scheduler</span>
                <span style={{ color: "#6b7280", fontSize: "12px" }}>v{VERSION}</span>
            </div>

            <div style={containerStyle}>
                {/* Header with hierarchy */}
                <div style={headerContainerStyle}>
                    <div style={personColumnStyle}>
                        <div style={{ padding: "6px 12px", fontWeight: "600", fontSize: "11px" }}>Person</div>
                    </div>
                    <div style={timelineStyle}>
                        {/* Month Bar */}
                        <div style={barStyle("#f8fafc")}>
                            <div style={spanStyle(420, "#f8fafc", "#374151")}>August 2024</div>
                        </div>
                        {/* Week Bar */}
                        <div style={barStyle("#f1f5f9")}>
                            <div style={spanStyle(420, "#f1f5f9", "#475569")}>W32</div>
                        </div>
                        {/* Day Headers */}
                        <div style={barStyle("#f8fafc")}>
                            {[
                                { day: "Mon", date: 1, bgColor: "#dbeafe", textColor: "#1d4ed8" },
                                { day: "Tue", date: 2, bgColor: "#f8fafc", textColor: "#6b7280" },
                                { day: "Wed", date: 3, bgColor: "#f8fafc", textColor: "#6b7280" },
                                { day: "Thu", date: 4, bgColor: "#f8fafc", textColor: "#6b7280" },
                                { day: "Fri", date: 5, bgColor: "#f8fafc", textColor: "#6b7280" },
                                { day: "Sat", date: 6, bgColor: "#f1f5f9", textColor: "#64748b" },
                                { day: "Sun", date: 7, bgColor: "#f1f5f9", textColor: "#64748b" }
                            ].map(({ day, date, bgColor, textColor }) => (
                                <div key={day} style={spanStyle(60, bgColor, textColor)}>
                                    {day}
                                    <br />
                                    {date}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div style={gridStyle}>
                    {/* Team A */}
                    <div style={cellStyle("#f1f5f9", "#1e40af")}>Team Alpha</div>
                    <div style={cellStyle("#f1f5f9")}></div>
                    <div style={cellStyle("#f1f5f9")}></div>
                    <div style={cellStyle("#f1f5f9")}></div>
                    <div style={cellStyle("#f1f5f9")}></div>
                    <div style={cellStyle("#f1f5f9")}></div>
                    <div style={cellStyle("#f1f5f9")}></div>
                    <div style={cellStyle("#f1f5f9")}></div>

                    {/* People with shifts */}
                    <div style={cellStyle("#ffffff", "#374151")}>John Doe</div>
                    <div style={shiftStyle("#3b82f6")}>M</div>
                    <div style={shiftStyle("#10b981")}>E</div>
                    <div style={shiftStyle("#f59e0b")}>N</div>
                    <div style={cellStyle("#fafafa")}></div>
                    <div style={shiftStyle("#ef4444")}>D</div>
                    <div style={cellStyle("#fafafa")}></div>
                    <div style={shiftStyle("#6b7280")}>H</div>

                    <div style={cellStyle("#ffffff", "#374151")}>Jane Smith</div>
                    <div style={shiftStyle("#10b981")}>E</div>
                    <div style={shiftStyle("#f59e0b")}>N</div>
                    <div style={cellStyle("#fafafa")}></div>
                    <div style={shiftStyle("#3b82f6")}>M</div>
                    <div style={shiftStyle("#10b981")}>E</div>
                    <div style={shiftStyle("#6b7280")}>H</div>
                    <div style={cellStyle("#fafafa")}></div>

                    <div style={cellStyle("#ffffff", "#374151")}>Mike Johnson</div>
                    <div style={shiftStyle("#f59e0b")}>N</div>
                    <div style={cellStyle("#fafafa")}></div>
                    <div style={shiftStyle("#3b82f6")}>M</div>
                    <div style={shiftStyle("#10b981")}>E</div>
                    <div style={shiftStyle("#f59e0b")}>N</div>
                    <div style={cellStyle("#fafafa")}></div>
                    <div style={shiftStyle("#eab308")}>T</div>
                </div>
            </div>

            <div
                style={{
                    marginTop: "8px",
                    fontSize: "10px",
                    color: "#6b7280",
                    textAlign: "center" as const
                }}
            >
                M=Morning, E=Evening, N=Night, D=Day Off, H=Holiday, T=Training
            </div>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/ShiftScheduler.css");
}
