import { useState, useEffect, useMemo, useCallback } from "react";
import { ListValue, ObjectItem, ListAttributeValue, ListReferenceValue } from "mendix";
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
    emailAttribute?: ListAttributeValue<string>;
    teamAttribute?: ListAttributeValue<string>;
    startTimeAttribute?: ListAttributeValue<Date>;
    dayTypeAttribute?: ListAttributeValue<string>;
    statusAttribute?: ListAttributeValue<string>;
    engineerEmailAttribute?: ListAttributeValue<string>;
    spUserAssociation?: ListReferenceValue;
}

export const useShiftData = ({
    engineersSource,
    shiftsSource,
    nameAttribute,
    emailAttribute,
    teamAttribute,
    startTimeAttribute,
    dayTypeAttribute,
    statusAttribute,
    engineerEmailAttribute,
    spUserAssociation
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
                    // Debug: Check attribute configuration (will be shown in main debug panel)
                    
                    // Store debug info to be displayed in main panel (no floating debug box)
                    
                    // Access SPUser properties through configured attributes
                    const name = nameAttribute ? 
                        (nameAttribute.get(item).status === "available" ? nameAttribute.get(item).value || "Unknown" : "Unknown") : 
                        "Unknown";
                    
                    const email = emailAttribute ? 
                        (emailAttribute.get(item).status === "available" ? emailAttribute.get(item).value || "" : "") : 
                        "";
                    
                    const team = teamAttribute ? 
                        (teamAttribute.get(item).status === "available" ? teamAttribute.get(item).value || "No Team" : "No Team") : 
                        "No Team";

                    return {
                        id: item.id,
                        name,
                        email,
                        team,
                        lanes: [], // Will be populated based on lane flags
                        mendixObject: item
                    } as Engineer;
                } catch (error) {
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
            return [];
        }
    }, [engineersSource, nameAttribute, teamAttribute]);

    // Transform Mendix shifts data with error handling
    const transformedShifts = useMemo((): ShiftAssignment[] => {
        try {
            if (!shiftsSource || shiftsSource.status !== "available" || !shiftsSource.items) {
                return [];
            }

            let successfulAssociations = 0;
            let totalShifts = 0;

            const shifts = shiftsSource.items.map((item: ObjectItem) => {
                try {
                    const startTime = startTimeAttribute?.get(item).value;
                    const dayType = dayTypeAttribute?.get(item).value || "";
                    const status = statusAttribute?.get(item).value;
                    // Debug: Association access (will be shown in main debug panel)
                    
                    // Try to get engineer ID through the SPUser association
                    let engineerId: string | undefined;
                    
                    // Use the spUserAssociation to get the referenced SPUser
                    if (spUserAssociation) {
                        const spUserRef = spUserAssociation.get(item);
                        if (spUserRef.status === "available" && spUserRef.value) {
                            // Get the SPUser ID from the association
                            engineerId = spUserRef.value.id;
                            successfulAssociations++;
                            
                            // Debug: Association successful (will be shown in main debug panel)
                        }
                    }
                    
                    // Fallback to shift ID if no association found
                    if (!engineerId) {
                        engineerId = item.id;
                    }
                    
                    totalShifts++;

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
            
            // Debug: Association success rate (will be shown in main debug panel)
            
            return shifts;
        } catch (error) {
            return [];
        }
    }, [shiftsSource, startTimeAttribute, dayTypeAttribute, statusAttribute, engineerEmailAttribute]);

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
            return {};
        }
    }, [dataState.engineers]);

    const getShiftForDate = useCallback(
        (engineerId: string, date: string): ShiftAssignment | undefined => {
            try {
                return dataState.shifts.find(shift => shift.engineerId === engineerId && shift.date === date);
            } catch (error) {
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
            // Silently fail
        }
    }, []);

    const getEngineerById = useCallback(
        (engineerId: string): Engineer | undefined => {
            try {
                return dataState.engineers.find(engineer => engineer.id === engineerId);
            } catch (error) {
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
        refreshData,
        debugInfo: {
            attributesConfigured: {
                name: !!nameAttribute,
                team: !!teamAttribute,
                email: !!emailAttribute,
                spUserAssociation: !!spUserAssociation
            }
        }
    };
};

