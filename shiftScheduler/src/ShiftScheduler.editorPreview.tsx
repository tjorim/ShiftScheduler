import { ReactElement, createElement } from "react";
import { ShiftSchedulerPreviewProps } from "../typings/ShiftSchedulerProps";

export function preview(_props: ShiftSchedulerPreviewProps): ReactElement {
    return (
        <div style={{ 
            padding: "20px", 
            border: "2px solid #007acc", 
            borderRadius: "8px", 
            backgroundColor: "#f0f8ff",
            fontFamily: "Arial, sans-serif",
            textAlign: "center"
        }}>
            <h3 style={{ color: "#007acc", margin: "0 0 10px 0" }}>
                🎯 Shift Scheduler Widget
            </h3>
            <p style={{ margin: "5px 0", color: "#666" }}>
                Version: 1.3.0
            </p>
            <p style={{ margin: "5px 0", color: "#008000", fontSize: "12px" }}>
                ✅ Preview rendering working
            </p>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/ShiftScheduler.css");
}
