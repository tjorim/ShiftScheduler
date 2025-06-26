import React, { createElement, useEffect, useState } from "react";
import { addDays, getDurationInMinutes } from "../utils/dateHelpers";
import { useInView } from "react-intersection-observer";
import TeamSection from "./TeamSection";
import { Engineer, ShiftAssignment } from "../hooks/useShiftData";

interface Props {
    engineers: Engineer[];
    shifts: ShiftAssignment[];
    getShiftsForEngineer: (engineerId: string) => ShiftAssignment[];
    getEngineersByTeam: () => { [team: string]: Engineer[] };
    onEdit: (mxObject: any) => void;
    onCellClick: (engineerId: string, date: string) => void;
}

const ShiftScheduler: React.FC<Props> = ({
    engineers: _engineers,
    shifts,
    getShiftsForEngineer,
    getEngineersByTeam,
    onEdit,
    onCellClick
}) => {
    const [startDate] = useState(new Date());
    const [endDate, setEndDate] = useState(addDays(new Date(), 30));

    const { ref, inView } = useInView({ rootMargin: "0px", threshold: 1 });
    useEffect(() => {
        if (inView) {
            setEndDate(d => addDays(d, 15));
        }
    }, [inView]);

    const teams = getEngineersByTeam();

    return (
        <div className="shift-scheduler-grid">
            {Object.entries(teams).map(([teamName, engs]) => (
                <TeamSection
                    key={teamName}
                    teamName={teamName}
                    engineers={engs}
                    startDate={startDate}
                    daysCount={Math.ceil(getDurationInMinutes(startDate, endDate) / (60 * 24))}
                    shifts={shifts}
                    getShiftsForEngineer={getShiftsForEngineer}
                    onEdit={onEdit}
                    onCellClick={onCellClick}
                />
            ))}
            <div ref={ref} className="sentinel" />
        </div>
    );
};

export default ShiftScheduler;
