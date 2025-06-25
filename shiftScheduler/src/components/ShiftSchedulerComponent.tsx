import React, { createElement, useEffect, useState } from "react";
import { addDays } from "date-fns";
import { useInView } from "react-intersection-observer";
import TeamSection from "./TeamSection";

interface Props {
    engineers: shiftScheduler.Engineer[];
    onEdit: (mxObject: mendix.lib.MxObject) => void;
}

const ShiftScheduler: React.FC<Props> = ({ engineers, onEdit }) => {
    const [startDate] = useState(new Date());
    const [endDate, setEndDate] = useState(addDays(new Date(), 30));
    const [shifts, setShifts] = useState<shiftScheduler.ShiftAssignment[]>([]);

    useEffect(() => {
        const from = startDate.toISOString().slice(0, 10);
        const to = endDate.toISOString().slice(0, 10);
        mx.data.get({
            xpath: `//Module.ShiftAssignment[Date >= '${from}' and Date <= '${to}']`,
            callback: (objs: any[]) => setShifts(objs)
        });
    }, [startDate, endDate]);

    const { ref, inView } = useInView({ rootMargin: "0px", threshold: 1 });
    useEffect(() => {
        if (inView) {
            setEndDate(d => addDays(d, 15));
        }
    }, [inView]);

    const teams = engineers.reduce((acc, e) => {
        const team = e.Team.Name;
        acc[team] = acc[team] ? [...acc[team], e] : [e];
        return acc;
    }, {} as Record<string, shiftScheduler.Engineer[]>);

    return (
        <div>
            {Object.entries(teams).map(([teamName, engs]) => (
                <TeamSection
                    key={teamName}
                    teamName={teamName}
                    engineers={engs}
                    startDate={startDate}
                    daysCount={Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))}
                    shifts={shifts}
                    onEdit={onEdit}
                />
            ))}
            <div ref={ref} className="sentinel" />
        </div>
    );
};

export default ShiftScheduler;
