import { useState, useEffect, useMemo, useCallback } from "react";
import { ListValue, ObjectItem, ListAttributeValue } from "mendix";
import { UseShiftDataReturn, Engineer, ShiftAssignment, ShiftType, ValidationError } from "../types";

interface DataState {
    engineers: Engineer[];
    shifts: ShiftAssignment[];
    loading: boolean;
    error: ValidationError | null;
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
}: UseShiftDataProps): UseShiftDataReturn => {
    const [dataState, setDataState] = useState<DataState>({
        engineers: [],
        shifts: [],
        loading: true,
        error: null
    });

    // Validation helper
    const validateConfiguration = useCallback((): ValidationError | null => {
        if (!engineersSource) {
            return { message: "Engineers data source is required", property: "engineers" };
        }

        if (engineersSource.status === "unavailable") {
            return { message: "Engineers data source is unavailable", property: "engineers" };
        }

        if (!nameAttribute) {
            return { message: "Name attribute is required for engineers", property: "nameAttribute" };
        }

        if (!teamAttribute) {
            return { message: "Team attribute is required for engineers", property: "teamAttribute" };
        }

        // Validate shifts configuration if provided
        if (shiftsSource && shiftsSource.status === "unavailable") {
            return { message: "Shifts data source is unavailable", property: "shifts" };
        }

        if (shiftsSource && !startTimeAttribute) {
            return { message: "Start time attribute is required when shifts data source is provided", property: "startTimeAttribute" };
        }

        return null;
    }, [engineersSource, shiftsSource, nameAttribute, teamAttribute, startTimeAttribute]);

    // Transform Mendix engineers data with error handling
    const transformedEngineers = useMemo((): Engineer[] => {
        try {
            if (engineersSource.status !== "available" || !engineersSource.items) {
                return [];
            }

            return engineersSource.items.map((item: ObjectItem) => {
                try {
                    const name = nameAttribute?.get(item).value || "Unknown";
                    const team = teamAttribute?.get(item).value || "No Team";

                    return {
                        id: item.id,
                        name,
                        team,
                        lanes: [], // Will be populated based on lane flags
                        mendixObject: item
                    } as Engineer;
                } catch (error) {
                    console.warn(`Error transforming engineer ${item.id}:`, error);
                    return {
                        id: item.id,
                        name: "Unknown",
                        team: "Error",
                        lanes: [],
                        mendixObject: item
                    } as Engineer;
                }
            });
        } catch (error) {
            console.error("Error transforming engineers data:", error);
            return [];
        }
    }, [engineersSource, nameAttribute, teamAttribute]);

    // Transform Mendix shifts data with error handling
    const transformedShifts = useMemo((): ShiftAssignment[] => {
        try {
            if (!shiftsSource || shiftsSource.status !== "available" || !shiftsSource.items) {
                return [];
            }

            return shiftsSource.items.map((item: ObjectItem) => {
                try {
                    const startTime = startTimeAttribute?.get(item).value;
                    const dayType = dayTypeAttribute?.get(item).value || "";
                    const status = statusAttribute?.get(item).value;
                    const engineerId = engineerIdAttribute?.get(item).value;

                    return {
                        id: item.id,
                        date: startTime ? startTime.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
                        engineerId: engineerId || item.id,
                        shift: (dayType as ShiftType) || "M",
                        status,
                        startTime,
                        mendixObject: item
                    } as ShiftAssignment;
                } catch (error) {
                    console.warn(`Error transforming shift ${item.id}:`, error);
                    return {
                        id: item.id,
                        date: new Date().toISOString().split("T")[0],
                        engineerId: item.id,
                        shift: "M" as ShiftType,
                        status: "error",
                        startTime: new Date(),
                        mendixObject: item
                    } as ShiftAssignment;
                }
            });
        } catch (error) {
            console.error("Error transforming shifts data:", error);
            return [];
        }
    }, [shiftsSource, startTimeAttribute, dayTypeAttribute, statusAttribute, engineerIdAttribute]);

    // Main data processing effect with validation
    useEffect(() => {
        const validationError = validateConfiguration();
        
        if (validationError) {
            setDataState({
                engineers: [],
                shifts: [],
                loading: false,
                error: validationError
            });
            return;
        }

        const isLoading = engineersSource.status === "loading" || 
                         (shiftsSource?.status === "loading") || false;

        setDataState({
            engineers: transformedEngineers,
            shifts: transformedShifts,
            loading: isLoading,
            error: null
        });
    }, [validateConfiguration, transformedEngineers, transformedShifts, engineersSource.status, shiftsSource?.status]);

    // Enhanced helper methods with error handling
    const getShiftsForEngineer = useCallback(
        (engineerId: string): ShiftAssignment[] => {
            try {
                return dataState.shifts.filter(shift => shift.engineerId === engineerId);
            } catch (error) {
                console.warn(`Error getting shifts for engineer ${engineerId}:`, error);
                return [];
            }
        },
        [dataState.shifts]
    );

    const getEngineersByTeam = useCallback((): { [team: string]: Engineer[] } => {
        try {
            const teamGroups: { [team: string]: Engineer[] } = {};
            dataState.engineers.forEach(engineer => {
            const teamName = engineer.team;
            if (!teamGroups[teamName]) {
                teamGroups[teamName] = [];
            }
            teamGroups[teamName].push(engineer);
            });
            return teamGroups;
        } catch (error) {
            console.warn("Error grouping engineers by team:", error);
            return {};
        }
    }, [dataState.engineers]);

    const getShiftForDate = useCallback(
        (engineerId: string, date: string): ShiftAssignment | undefined => {
            try {
                return dataState.shifts.find(shift => shift.engineerId === engineerId && shift.date === date);
            } catch (error) {
                console.warn(`Error getting shift for engineer ${engineerId} on ${date}:`, error);
                return undefined;
            }
        },
        [dataState.shifts]
    );

    const updateShift = useCallback((shiftId: string, updates: Partial<ShiftAssignment>) => {
        try {
            setDataState(prev => ({
                ...prev,
                shifts: prev.shifts.map(shift => (shift.id === shiftId ? { ...shift, ...updates } : shift))
            }));
        } catch (error) {
            console.error(`Error updating shift ${shiftId}:`, error);
        }
    }, []);

    const getEngineerById = useCallback(
        (engineerId: string): Engineer | undefined => {
            try {
                return dataState.engineers.find(engineer => engineer.id === engineerId);
            } catch (error) {
                console.warn(`Error finding engineer ${engineerId}:`, error);
                return undefined;
            }
        },
        [dataState.engineers]
    );

    const getShiftsByDateRange = useCallback(
        (startDate: string, endDate: string): ShiftAssignment[] => {
            try {
                return dataState.shifts.filter(shift => shift.date >= startDate && shift.date <= endDate);
            } catch (error) {
                console.warn(`Error filtering shifts by date range ${startDate} - ${endDate}:`, error);
                return [];
            }
        },
        [dataState.shifts]
    );

    const refreshData = useCallback(() => {
        try {
            // Force re-evaluation of data sources
            setDataState(prev => ({ ...prev, loading: true, error: null }));
            // In a real implementation, this would trigger data refresh
            setTimeout(() => {
                const validationError = validateConfiguration();
                setDataState(prev => ({ 
                    ...prev, 
                    loading: false,
                    error: validationError
                }));
            }, 100);
        } catch (error) {
            console.error("Error refreshing data:", error);
            setDataState(prev => ({ 
                ...prev, 
                loading: false, 
                error: { message: "Failed to refresh data" }
            }));
        }
    }, []);

    return {
        engineers: dataState.engineers,
        shifts: dataState.shifts,
        loading: dataState.loading,
        error: dataState.error,
        getShiftsForEngineer,
        getEngineersByTeam,
        getShiftForDate,
        updateShift,
        getEngineerById,
        getShiftsByDateRange,
        refreshData
    };
};

