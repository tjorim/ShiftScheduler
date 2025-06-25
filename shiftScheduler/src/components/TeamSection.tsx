import { createElement } from "react";
import EngineerRow from "./EngineerRow";

export interface Props {
    teamName: string;
    engineers: shiftScheduler.Engineer[];
    startDate: Date;
    daysCount: number;
    shifts: shiftScheduler.ShiftAssignment[];
    onEdit: (mxObject: mendix.lib.MxObject) => void;
}

const TeamSection: React.FC<Props> = ({ teamName, engineers, startDate, daysCount, shifts, onEdit }) => {
    return (
        <div className="team-section">
            <h2>{teamName}</h2>
            {engineers.map(engineer => (
                <EngineerRow
                    key={engineer.id}
                    engineer={engineer}
                    startDate={startDate}
                    daysCount={daysCount}
                    shifts={shifts}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};

export default TeamSection;
