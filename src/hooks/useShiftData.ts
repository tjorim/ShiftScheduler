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
    filterLaneAssociation
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

    // Helper function to check if an engineer is eligible for capacity calculation
    const isEligibleForCapacity = useCallback((engineer: Engineer): boolean => {
        // Exclude TL (Team Lead) and GEN (Generalist) roles
        // This would typically come from an attribute, but for now we'll check the name/lane
        const excludedRoles = ["TL", "GEN", "GENERALIST"];
        const engineerRole = engineer.lane?.toUpperCase() || "";
        return !excludedRoles.includes(engineerRole);
    }, []);

    // Helper function to check if a shift counts as "working"
    const isWorkingShift = useCallback((shift?: ShiftAssignment): boolean => {
        if (!shift) {
            return false;
        }
        // Non-working shift types: H (Holiday), C (Compensation), F (Feestdag)
        const nonWorkingTypes = ["H", "C", "F"];
        return !nonWorkingTypes.includes(shift.shift);
    }, []);

    // Calculate team capacity for a specific team and date
    const getTeamCapacityForDate = useCallback(
        (teamHeader: string, date: string): TeamCapacity | undefined => {
            try {
                // Parse team header to get team name and lane (e.g., "Team 1 XT" -> team: "Team 1", lane: "XT")
                const teamParts = teamHeader.split(" ");
                if (teamParts.length < 2) {
                    return undefined;
                }

                const teamName = teamParts.slice(0, -1).join(" "); // "Team 1"
                const lane = teamParts[teamParts.length - 1]; // "XT"

                // Get engineers for this specific team/lane combination
                const teamEngineers = dataState.engineers.filter(
                    engineer => engineer.team === teamName && engineer.lane === lane && isEligibleForCapacity(engineer)
                );

                if (teamEngineers.length === 0) {
                    return undefined;
                }

                // Count working engineers for this date
                const workingCount = teamEngineers.reduce((count, engineer) => {
                    const shift = dataState.shifts.find(s => s.engineerId === engineer.id && s.date === date);
                    return count + (isWorkingShift(shift) ? 1 : 0);
                }, 0);

                const totalEligible = teamEngineers.length;
                const percentage = totalEligible > 0 ? Math.round((workingCount / totalEligible) * 100) : 0;

                // Get week number for target lookup
                const dateObj = new Date(date);
                const weekNumber = getWeekNumber(dateObj);

                // Default target of 85% (this could be made configurable)
                const target = 85;
                const meetsTarget = percentage >= target;

                return {
                    teamHeader,
                    date,
                    weekNumber,
                    workingCount,
                    totalEligible,
                    percentage,
                    target,
                    meetsTarget
                };
            } catch (error) {
                console.warn(`Error calculating team capacity for ${teamHeader} on ${date}:`, error);
                return undefined;
            }
        },
        [dataState.engineers, dataState.shifts, isEligibleForCapacity, isWorkingShift, getWeekNumber]
    );

    // Get all team capacities for multiple dates
    const getAllTeamCapacities = useCallback(
        (dates: string[]): TeamCapacity[] => {
            const capacities: TeamCapacity[] = [];

            // Get unique team headers from engineers
            const teamHeaders = new Set<string>();
            dataState.engineers.forEach(engineer => {
                if (isEligibleForCapacity(engineer)) {
                    const teamHeader = `${engineer.team} ${engineer.lane}`;
                    teamHeaders.add(teamHeader);
                }
            });

            // Calculate capacity for each team/date combination
            Array.from(teamHeaders).forEach(teamHeader => {
                dates.forEach(date => {
                    const capacity = getTeamCapacityForDate(teamHeader, date);
                    if (capacity) {
                        capacities.push(capacity);
                    }
                });
            });

            return capacities;
        },
        [dataState.engineers, getTeamCapacityForDate, isEligibleForCapacity]
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
        getTeamCapacityForDate,
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
