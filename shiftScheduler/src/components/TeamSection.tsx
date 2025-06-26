import React, { createElement } from "react";
import EngineerRow from "./EngineerRow";
import { Engineer, ShiftAssignment } from "../types";

export interface Props {
    teamName: string;
    engineers: Engineer[];
    startDate: Date;
    daysCount: number;
    shifts: ShiftAssignment[];
    getShiftsForEngineer: (engineerId: string) => ShiftAssignment[];
    onEdit: (mxObject: any) => void;
    onCellClick: (engineerId: string, date: string) => void;
}

const TeamSection: React.FC<Props> = ({
    teamName,
    engineers,
    startDate,
    daysCount,
    shifts: _shifts,
    getShiftsForEngineer,
    onEdit,
    onCellClick
}) => {
    return (
        <div className="team-section">
            <h2>{teamName}</h2>
            {engineers.map(engineer => (
                <EngineerRow
                    key={engineer.id}
                    engineer={engineer}
                    startDate={startDate}
                    daysCount={daysCount}
                    shifts={getShiftsForEngineer(engineer.id)}
                    onEdit={onEdit}
                    onCellClick={onCellClick}
                />
            ))}
        </div>
    );
};

export default TeamSection;
