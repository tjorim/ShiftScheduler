import { createElement, MouseEvent } from "react";

export interface Props {
    date: Date;
    shift?: shiftScheduler.ShiftAssignment;
    onEdit: () => void;
}

const DayCell: React.FC<Props> = ({ date, shift, onEdit }) => {
    console.log("DayCell rendered for date:", date);
    const handleContext = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        // TODO: show context menu
    };

    return (
        <div className="day-cell" onDoubleClick={onEdit} onContextMenu={handleContext} title={shift?.Status ?? ""}>
            {shift && (
                <div
                    className={`shift-block shift-${shift.Type?.toLowerCase() || "default"} role-${
                        shift.Role || "default"
                    }`}
                >
                    {shift.Type || "Shift"}
                </div>
            )}
        </div>
    );
};

export default DayCell;
