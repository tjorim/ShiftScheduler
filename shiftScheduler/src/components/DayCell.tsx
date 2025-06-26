import React, { createElement, MouseEvent } from "react";
import { ShiftAssignment } from "../types";

export interface Props {
    date: Date;
    shift?: ShiftAssignment;
    onEdit: () => void;
    onCellClick: () => void;
}

const DayCell: React.FC<Props> = ({ date, shift, onEdit, onCellClick }) => {
    console.log("DayCell rendered for date:", date);
    const handleContext = (e: MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        // TODO: show context menu
    };

    return (
        <div
            className="day-cell"
            onDoubleClick={onEdit}
            onClick={onCellClick}
            onContextMenu={handleContext}
            title={shift?.status ?? ""}
        >
            {shift && (
                <div
                    className={`shift-block shift-${shift.shift?.toLowerCase() || "default"} event-${
                        shift.eventType?.toLowerCase() || "default"
                    }`}
                >
                    {shift.shift || "Shift"}
                </div>
            )}
        </div>
    );
};

export default DayCell;
