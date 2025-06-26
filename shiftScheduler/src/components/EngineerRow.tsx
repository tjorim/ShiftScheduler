import React, { createElement } from "react";
import DayCell from "./DayCell";
import { addDays, formatDateForShift } from "../utils/dateHelpers";
import { Engineer, ShiftAssignment } from "../hooks/useShiftData";

export interface Props {
    engineer: Engineer;
    startDate: Date;
    daysCount: number;
    shifts: ShiftAssignment[];
    onEdit: (mxObject: any) => void;
    onCellClick: (engineerId: string, date: string) => void;
}

const EngineerRow: React.FC<Props> = ({ engineer, startDate, daysCount, shifts, onEdit, onCellClick }) => {
    return (
        <div>
            {/* Render logic for EngineerRow */}
            {/* Example: Render DayCells for each day */}
            {Array.from({ length: daysCount }).map((_, idx) => {
                const day = addDays(startDate, idx);
                const dayString = formatDateForShift(day);
                const shift = shifts.find(
                    s => s.engineerId === engineer.id && s.date === dayString
                );
                return (
                    <DayCell
                        key={idx}
                        date={day}
                        shift={shift}
                        onEdit={() => onEdit(shift?.mendixObject)}
                        onCellClick={() => onCellClick(engineer.id, dayString)}
                    />
                );
            })}
        </div>
    );
};

export default EngineerRow;
