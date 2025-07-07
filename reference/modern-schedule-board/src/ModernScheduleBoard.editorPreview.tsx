import React from "react";
import { ModernScheduleBoardPreviewProps } from "./types/SchedulerTypes";

export const preview = (props: ModernScheduleBoardPreviewProps) => {
    return (
        <div className={`modern-schedule-board ${props.className}`} style={props.styleObject}>
            <div
                style={{
                    border: "1px solid #e1e5e9",
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    background: "#f8f9fa"
                }}
            >
                <h4 style={{ margin: "0 0 10px 0", color: "#374151" }}>Modern Schedule Board</h4>
                <p style={{ margin: "0", color: "#6b7280", fontSize: "14px" }}>
                    Timeline scheduler with drag-and-drop functionality
                </p>
                <div
                    style={{
                        marginTop: "15px",
                        padding: "10px",
                        background: "white",
                        borderRadius: "4px",
                        border: "1px solid #e1e5e9"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px"
                        }}
                    >
                        <span style={{ fontSize: "12px", fontWeight: "600" }}>Sample Timeline</span>
                        <div style={{ display: "flex", gap: "5px" }}>
                            <div
                                style={{
                                    width: "60px",
                                    height: "20px",
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    borderRadius: "3px"
                                }}
                            ></div>
                            <div
                                style={{
                                    width: "40px",
                                    height: "20px",
                                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                    borderRadius: "3px"
                                }}
                            ></div>
                        </div>
                    </div>
                    <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                        Features: {props.enableDragDrop && "Drag & Drop"}
                        {props.enableResize && ", Resize"}
                        {props.enableMultiSelect && ", Multi-Select"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export function getPreviewCss() {
    return require("./ModernScheduleBoard.css");
}
