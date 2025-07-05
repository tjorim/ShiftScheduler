import React, { ReactElement, createElement } from "react";
import { ShiftSchedulerPreviewProps } from "../typings/ShiftSchedulerProps";
import { VERSION } from "./version";

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

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "120px repeat(7, 60px)",
        gap: "1px",
        backgroundColor: "#e2e8f0",
        border: "1px solid #e2e8f0",
        borderRadius: "6px",
        overflow: "hidden"
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

            <div style={gridStyle}>
                {/* Header row */}
                <div style={cellStyle("#f1f5f9", "#374151")}>Person</div>
                <div style={cellStyle("#dbeafe", "#1d4ed8")}>Mon 1</div>
                <div style={cellStyle("#f8fafc", "#6b7280")}>Tue 2</div>
                <div style={cellStyle("#f8fafc", "#6b7280")}>Wed 3</div>
                <div style={cellStyle("#f8fafc", "#6b7280")}>Thu 4</div>
                <div style={cellStyle("#f8fafc", "#6b7280")}>Fri 5</div>
                <div style={cellStyle("#f3f4f6", "#6b7280")}>Sat 6</div>
                <div style={cellStyle("#f3f4f6", "#6b7280")}>Sun 7</div>

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
