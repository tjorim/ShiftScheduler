import { useState, useEffect, useMemo, useCallback } from "react";
import { ListValue, ObjectItem, ListAttributeValue, ListReferenceValue, ListReferenceSetValue } from "mendix";
import {
    UseShiftDataReturn,
    Engineer,
    ShiftAssignment,
    ShiftType,
    ValidationError,
    TeamCapacity
} from "../types/shiftScheduler";
import { formatDateForShift } from "../utils/dateHelpers";

interface DataState {
    engineers: Engineer[];
    shifts: ShiftAssignment[];
    shiftsLoading: boolean;
    error: ValidationError | null;
}

interface UseShiftDataProps {
    engineersSource: ListValue;
    shiftsSource?: ListValue;
    filtersSource?: ListValue;
    nameAttribute?: ListAttributeValue<string>;
    teamAttribute?: ListAttributeValue<string>;
    laneAttribute?: ListAttributeValue<string>;
    dayTypeAttribute?: ListAttributeValue<string>;
    statusAttribute?: ListAttributeValue<string>;
    spUserAssociation?: ListReferenceValue;
    eventDateAttribute?: ListAttributeValue<Date>;
    filterTeamAssociation?: ListReferenceValue | ListReferenceSetValue;
    filterLaneAssociation?: ListReferenceValue | ListReferenceSetValue;
    // Team capacity parameters
    teamCapacitiesSource?: ListValue;
    capacityDateAttribute?: ListAttributeValue<Date>;
    capacityPercentageAttribute?: ListAttributeValue<any>;
    isNXTAttribute?: ListAttributeValue<boolean>;
    capacityTeamAssociation?: ListReferenceValue;
    capacityTargetAssociation?: ListReferenceValue;
    targetPercentageAttribute?: ListAttributeValue<any>;
}

export const useShiftData = ({
    engineersSource,
    shiftsSource,
    filtersSource,
    nameAttribute,
    teamAttribute,
    laneAttribute,
    dayTypeAttribute,
    statusAttribute,
    spUserAssociation,
    eventDateAttribute,
    filterTeamAssociation,
    filterLaneAssociation,
    teamCapacitiesSource,
    capacityDateAttribute,
    capacityPercentageAttribute,
    isNXTAttribute,
    capacityTeamAssociation,
    capacityTargetAssociation,
    targetPercentageAttribute
}: UseShiftDataProps): UseShiftDataReturn => {
    const [dataState, setDataState] = useState<DataState>({
        engineers: [],
        shifts: [],
        shiftsLoading: true,
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

        // Validate shifts configuration if provided
        if (shiftsSource && shiftsSource.status === "unavailable") {
            return { message: "Shifts data source is unavailable", property: "shifts" };
        }

        return null;
    }, [engineersSource, shiftsSource, nameAttribute]);

    // Get filtered teams and lanes from filters
    const filteredValues = useMemo(() => {
        if (!filtersSource || filtersSource.status !== "available" || !filtersSource.items) {
            return { teams: new Set<string>(), lanes: new Set<string>(), hasFilters: false };
        }

        const teams = new Set<string>();
        const lanes = new Set<string>();

        filtersSource.items.forEach(filterItem => {
            try {
                // Get teams from filter
                if (filterTeamAssociation) {
                    const teamRefs = filterTeamAssociation.get(filterItem);
                    if (teamRefs.status === "available" && teamRefs.value) {
                        const teamItems = Array.isArray(teamRefs.value) ? teamRefs.value : [teamRefs.value];
                        teamItems.forEach(teamItem => {
                            // Try to get the team name from the teamAttribute of the team object
                            if (teamItem && teamAttribute) {
                                const teamNameValue = teamAttribute.get(teamItem);
                                if (teamNameValue.status === "available" && teamNameValue.value) {
                                    teams.add(teamNameValue.value);
                                }
                            }
                            // Fallback to ID if no team attribute or value
                            else if (teamItem?.id) {
                                teams.add(teamItem.id);
                            }
                        });
                    }
                }

                // Get lanes from filter
                if (filterLaneAssociation) {
                    const laneRefs = filterLaneAssociation.get(filterItem);
                    if (laneRefs.status === "available" && laneRefs.value) {
                        const laneItems = Array.isArray(laneRefs.value) ? laneRefs.value : [laneRefs.value];
                        laneItems.forEach(laneItem => {
                            // Try to get the lane name from the laneAttribute of the lane object
                            if (laneItem && laneAttribute) {
                                const laneNameValue = laneAttribute.get(laneItem);
                                if (laneNameValue.status === "available" && laneNameValue.value) {
                                    lanes.add(laneNameValue.value);
                                }
                            }
                            // Fallback to ID if no lane attribute or value
                            else if (laneItem?.id) {
                                lanes.add(laneItem.id);
                            }
                        });
                    }
                }
            } catch (error) {
                // Skip invalid filter items
            }
        });

        return { teams, lanes, hasFilters: true };
    }, [filtersSource, filterTeamAssociation, filterLaneAssociation, teamAttribute, laneAttribute]);

    // Transform Mendix engineers data with error handling and filtering
    const transformedEngineers = useMemo((): Engineer[] => {
        try {
            if (engineersSource.status !== "available" || !engineersSource.items) {
                return [];
            }

            return engineersSource.items
                .map((item: ObjectItem) => {
                    try {
                        // Debug: Check attribute configuration (will be shown in main debug panel)

                        // Store debug info to be displayed in main panel (no floating debug box)

                        // Access SPUser properties through configured attributes
                        const name = nameAttribute
                            ? nameAttribute.get(item).status === "available"
                                ? nameAttribute.get(item).value || "Unknown"
                                : "Unknown"
                            : "Unknown";

                        const team = teamAttribute
                            ? teamAttribute.get(item).status === "available"
                                ? teamAttribute.get(item).value || "General"
                                : "General"
                            : "General";

                        const lane = laneAttribute
                            ? laneAttribute.get(item).status === "available"
                                ? laneAttribute.get(item).value || "General"
                                : "General"
                            : "General";

                        return {
                            id: item.id,
                            name,
                            team,
                            lane,
                            mendixObject: item
                        } as Engineer;
                    } catch (error) {
                        return {
                            id: item.id,
                            name: "Unknown",
                            team: "General",
                            lane: "General",
                            mendixObject: item
                        } as Engineer;
                    }
                })
                .filter((engineer: Engineer) => {
                    // If no filters are configured, show all engineers
                    if (!filteredValues.hasFilters) {
                        return true;
                    }

                    // Check if engineer's team passes filters
                    const teamFiltered = filteredValues.teams.size === 0 || filteredValues.teams.has(engineer.team);

                    // Check if engineer's lane passes filters
                    const laneFiltered = filteredValues.lanes.size === 0 || filteredValues.lanes.has(engineer.lane);

                    // Engineer must match both team and lane filters (if they exist)
                    return teamFiltered && laneFiltered;
                });
        } catch (error) {
            return [];
        }
    }, [engineersSource, nameAttribute, teamAttribute, laneAttribute, filteredValues]);

    // Transform Mendix shifts data with error handling
    const transformedShifts = useMemo((): ShiftAssignment[] => {
        try {
            if (!shiftsSource || shiftsSource.status !== "available" || !shiftsSource.items) {
                return [];
            }

            // Debug counters (will be shown in debug panel if needed)
            // let successfulAssociations = 0;
            // let totalShifts = 0;

            const shifts = shiftsSource.items
                .map((item: ObjectItem) => {
                    try {
                        const dayType = dayTypeAttribute?.get(item).value || "";
                        const status = statusAttribute?.get(item).value;

                        // Get the event date directly from the CalendarEvents entity
                        let shiftDate: Date | undefined;
                        if (eventDateAttribute) {
                            const eventDateValue = eventDateAttribute.get(item);
                            if (eventDateValue.status === "available" && eventDateValue.value) {
                                shiftDate = eventDateValue.value;
                            }
                        }

                        // Debug: Association access (will be shown in main debug panel)

                        // Try to get engineer ID through the SPUser association
                        let engineerId: string | undefined;

                        // Use the spUserAssociation to get the referenced SPUser
                        if (spUserAssociation) {
                            const spUserRef = spUserAssociation.get(item);
                            if (spUserRef.status === "available" && spUserRef.value) {
                                // Get the SPUser ID from the association
                                engineerId = spUserRef.value.id;
                                // successfulAssociations++;

                                // Debug: Association successful (will be shown in main debug panel)
                            }
                        }

                        // Fallback to shift ID if no association found
                        if (!engineerId) {
                            engineerId = item.id;
                        }

                        // totalShifts++;

                        // Skip shifts without proper shift dates
                        if (!shiftDate) {
                            return null;
                        }

                        return {
                            id: item.id,
                            date: shiftDate.toISOString().split("T")[0],
                            engineerId: engineerId || item.id,
                            shift: (dayType as ShiftType) || "M",
                            status,
                            shiftDate,
                            mendixObject: item
                        } as ShiftAssignment;
                    } catch (error) {
                        // Skip invalid shifts - don't show them with fake dates
                        return null;
                    }
                })
                .filter((shift): shift is ShiftAssignment => shift !== null);

            // Debug: Association success rate (will be shown in main debug panel)

            return shifts;
        } catch (error) {
            return [];
        }
    }, [shiftsSource, dayTypeAttribute, statusAttribute, spUserAssociation, eventDateAttribute]);

    // Main data processing effect with validation
    useEffect(() => {
        const validationError = validateConfiguration();

        if (validationError) {
            setDataState({
                engineers: [],
                shifts: [],
                shiftsLoading: false,
                error: validationError
            });
            return;
        }

        const shiftsLoading = shiftsSource?.status === "loading" || false;

        setDataState({
            engineers: transformedEngineers,
            shifts: transformedShifts,
            shiftsLoading,
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
                    engineersLoading: false,
                    shiftsLoading: false,
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
    }, [validateConfiguration]);

    // Calculate loading state when needed
    const engineersLoading = engineersSource.status === "loading";
    const loading = engineersLoading || dataState.shiftsLoading;

    // Helper function to get week number from date
    const getWeekNumber = useCallback((date: Date): number => {
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
        return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    }, []);

    // Get all team capacities for multiple dates
    const getAllTeamCapacities = useCallback(
        (dates: string[]): TeamCapacity[] => {
            if (!teamCapacitiesSource || teamCapacitiesSource.status !== "available") {
                return [];
            }

            const capacities: TeamCapacity[] = [];

            teamCapacitiesSource.items?.forEach(item => {
                try {
                    // Get attributes from database
                    const dateValue = capacityDateAttribute?.get(item);
                    const percentageValue = capacityPercentageAttribute?.get(item);
                    const isNXTValue = isNXTAttribute?.get(item);

                    if (
                        dateValue?.status === "available" &&
                        percentageValue?.status === "available" &&
                        isNXTValue?.status === "available" &&
                        dateValue.value
                    ) {
                        const date = formatDateForShift(dateValue.value);
                        const percentage = Math.round(Number(percentageValue.value) || 0);
                        const isNXT = Boolean(isNXTValue.value);

                        // Only include if date is in requested range
                        if (dates.includes(date)) {
                            // Get team name from association
                            let teamName = "Unknown Team";
                            if (capacityTeamAssociation) {
                                const teamRef = capacityTeamAssociation.get(item);
                                if (teamRef?.status === "available" && teamRef.value) {
                                    // Use team name from Team entity (assuming it has a name attribute)
                                    // We'll need the teamAttribute to read the team name
                                    if (teamAttribute) {
                                        const teamNameValue = teamAttribute.get(teamRef.value);
                                        if (teamNameValue?.status === "available" && teamNameValue.value) {
                                            teamName = teamNameValue.value;
                                        }
                                    }
                                }
                            }

                            // Get target from association (optional)
                            let target = 0;
                            let meetsTarget = false;

                            if (capacityTargetAssociation && targetPercentageAttribute) {
                                const targetRef = capacityTargetAssociation.get(item);
                                if (targetRef?.status === "available" && targetRef.value) {
                                    // For ListAttributeValue, we access through the associated object
                                    const targetValue = targetPercentageAttribute.get(targetRef.value);
                                    if (targetValue?.status === "available") {
                                        target = Math.round(Number(targetValue.value) || 0);
                                        meetsTarget = target > 0 ? percentage >= target : false;
                                    }
                                }
                            }

                            const dateObj = new Date(date);
                            const weekNumber = getWeekNumber(dateObj);

                            capacities.push({
                                teamName,
                                isNXT,
                                date,
                                weekNumber,
                                percentage,
                                target,
                                meetsTarget
                            });
                        }
                    }
                } catch (error) {
                    console.warn(`Error processing team capacity data:`, error);
                }
            });

            return capacities;
        },
        [
            teamCapacitiesSource,
            capacityDateAttribute,
            capacityPercentageAttribute,
            isNXTAttribute,
            capacityTeamAssociation,
            capacityTargetAssociation,
            targetPercentageAttribute,
            teamAttribute,
            getWeekNumber
        ]
    );

    return {
        engineers: dataState.engineers,
        shifts: dataState.shifts,
        loading,
        shiftsLoading: dataState.shiftsLoading,
        error: dataState.error,
        getShiftsForEngineer,
        getEngineersByTeam,
        getShiftForDate,
        updateShift,
        getEngineerById,
        getShiftsByDateRange,
        refreshData,
        getAllTeamCapacities,
        debugInfo: {
            attributesConfigured: {
                name: !!nameAttribute,
                team: !!teamAttribute,
                lane: !!laneAttribute,
                spUserAssociation: !!spUserAssociation,
                eventDate: !!eventDateAttribute,
                filters: !!filtersSource,
                filterTeamAssociation: !!filterTeamAssociation,
                filterLaneAssociation: !!filterLaneAssociation
            },
            filterInfo: {
                hasFilters: filteredValues.hasFilters,
                filteredTeams: Array.from(filteredValues.teams),
                filteredLanes: Array.from(filteredValues.lanes)
            }
        }
    };
};
