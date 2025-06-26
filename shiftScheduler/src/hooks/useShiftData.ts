import { useState, useEffect, useMemo, useCallback } from "react";
import { ListValue, ObjectItem, ListAttributeValue } from "mendix";

interface Engineer {
    id: string;
    name: string;
    email?: string;
    team: string;
    lanes: string[];
    mendixObject: ObjectItem;
}

interface ShiftAssignment {
    id: string;
    date: string;
    engineerId: string;
    shift: string;
    eventType?: string;
    status?: string;
    startTime?: Date;
    endTime?: Date;
    mendixObject: ObjectItem;
}

interface UseShiftDataProps {
    engineersSource: ListValue;
    shiftsSource?: ListValue;
    nameAttribute?: ListAttributeValue<string>;
    teamAttribute?: ListAttributeValue<string>;
    startTimeAttribute?: ListAttributeValue<Date>;
    dayTypeAttribute?: ListAttributeValue<string>;
    statusAttribute?: ListAttributeValue<string>;
    engineerIdAttribute?: ListAttributeValue<string>;
}

export const useShiftData = ({
    engineersSource,
    shiftsSource,
    nameAttribute,
    teamAttribute,
    startTimeAttribute,
    dayTypeAttribute,
    statusAttribute,
    engineerIdAttribute
}: UseShiftDataProps) => {
    const [engineers, setEngineers] = useState<Engineer[]>([]);
    const [shifts, setShifts] = useState<ShiftAssignment[]>([]);
    const [loading, setLoading] = useState(true);

    // Transform Mendix engineers data
    const transformedEngineers = useMemo((): Engineer[] => {
        if (engineersSource.status !== "available" || !engineersSource.items) {
            return [];
        }

        return engineersSource.items.map((item: ObjectItem) => {
            const name = nameAttribute?.get(item).value || "Unknown";
            const team = teamAttribute?.get(item).value || "No Team";
            
            return {
                id: item.id,
                name,
                team,
                lanes: [], // Will be populated based on lane flags
                mendixObject: item
            } as Engineer;
        });
    }, [engineersSource, nameAttribute, teamAttribute]);

    // Transform Mendix shifts data
    const transformedShifts = useMemo(() => {
        if (!shiftsSource || shiftsSource.status !== "available" || !shiftsSource.items) {
            return [];
        }

        return shiftsSource.items.map((item: ObjectItem) => {
            const startTime = startTimeAttribute?.get(item).value;
            const dayType = dayTypeAttribute?.get(item).value || "";
            const status = statusAttribute?.get(item).value;
            const engineerId = engineerIdAttribute?.get(item).value;

            return {
                id: item.id,
                date: startTime ? startTime.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
                engineerId: engineerId || item.id,
                shift: dayType,
                status,
                startTime,
                mendixObject: item
            } as ShiftAssignment;
        });
    }, [shiftsSource, startTimeAttribute, dayTypeAttribute, statusAttribute, engineerIdAttribute]);

    useEffect(() => {
        setEngineers(transformedEngineers);
        setLoading(engineersSource.status === "loading");
    }, [transformedEngineers, engineersSource.status]);

    useEffect(() => {
        setShifts(transformedShifts);
    }, [transformedShifts]);

    // Enhanced helper methods
    const getShiftsForEngineer = useCallback((engineerId: string): ShiftAssignment[] => {
        return shifts.filter(shift => shift.engineerId === engineerId);
    }, [shifts]);

    const getEngineersByTeam = useCallback((): { [team: string]: Engineer[] } => {
        const teamGroups: { [team: string]: Engineer[] } = {};
        engineers.forEach(engineer => {
            const teamName = engineer.team;
            if (!teamGroups[teamName]) {
                teamGroups[teamName] = [];
            }
            teamGroups[teamName].push(engineer);
        });
        return teamGroups;
    }, [engineers]);

    const getShiftForDate = useCallback((engineerId: string, date: string): ShiftAssignment | undefined => {
        return shifts.find(shift => shift.engineerId === engineerId && shift.date === date);
    }, [shifts]);

    const updateShift = useCallback((shiftId: string, updates: Partial<ShiftAssignment>) => {
        setShifts(prev => prev.map(shift => 
            shift.id === shiftId ? { ...shift, ...updates } : shift
        ));
    }, []);

    const getEngineerById = useCallback((engineerId: string): Engineer | undefined => {
        return engineers.find(engineer => engineer.id === engineerId);
    }, [engineers]);

    const getShiftsByDateRange = useCallback((startDate: string, endDate: string): ShiftAssignment[] => {
        return shifts.filter(shift => shift.date >= startDate && shift.date <= endDate);
    }, [shifts]);

    return {
        engineers,
        shifts,
        loading,
        getShiftsForEngineer,
        getEngineersByTeam,
        getShiftForDate,
        updateShift,
        getEngineerById,
        getShiftsByDateRange
    };
};

export type { Engineer, ShiftAssignment };
