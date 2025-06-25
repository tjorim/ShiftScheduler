import { createElement } from "react";
import DayCell from "./DayCell";
import { addDays } from "date-fns";

export interface Props {
    engineer: shiftScheduler.Engineer;
    startDate: Date;
    daysCount: number;
    shifts: shiftScheduler.ShiftAssignment[];
    onEdit: (mxObject: mendix.lib.MxObject) => void;
}

const EngineerRow: React.FC<Props> = ({ engineer, startDate, daysCount, shifts, onEdit }) => {
    return (
        <div>
            {/* Render logic for EngineerRow */}
            {/* Example: Render DayCells for each day */}
            {Array.from({ length: daysCount }).map((_, idx) => {
                const day = addDays(startDate, idx);
                const shift = shifts.find(s => s.engineerId === engineer.id && s.Date === day.toISOString().slice(0, 10));
                return (
                    <DayCell key={idx} date={day} shift={shift} onEdit={() => onEdit({} as mendix.lib.MxObject)} />
                );
            })}
        </div>
    );
};

export default EngineerRow;
