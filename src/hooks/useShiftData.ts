import { useState, useEffect, useMemo, useCallback } from "react";
import { ListValue, ObjectItem, ListAttributeValue, ListReferenceValue } from "mendix";
import {
    UseShiftDataReturn,
    Engineer,
    ShiftAssignment,
    ShiftType,
    ValidationError,
    TeamCapacity,
    DayCellData
} from "../types/shiftScheduler";
// formatDateForShift and date calculations moved to microflow - no longer needed in widget

interface DataState {
    engineers: Engineer[];
    shifts: ShiftAssignment[];
    shiftsLoading: boolean;
    error: ValidationError | null;
    processingErrors: string[];
    interactionErrors: string[];
    dataQualityIssues: string[];
}

interface UseShiftDataProps {
    engineersSource: ListValue;
    shiftsSource?: ListValue;
    nameAttribute?: ListAttributeValue<string>;
    teamAttribute?: ListAttributeValue<string>;
    laneAttribute?: ListAttributeValue<string>;
    dayTypeAttribute?: ListAttributeValue<string>;
    statusAttribute?: ListAttributeValue<string>;
    spUserAssociation?: ListReferenceValue;
    eventDateAttribute?: ListAttributeValue<Date>;
    // Team capacity parameters (microflow provides complete objects)
    teamCapacitiesSource?: ListValue;
}

export const useShiftData = ({
    engineersSource,
    shiftsSource,
    nameAttribute,
    teamAttribute,
    laneAttribute,
    dayTypeAttribute,
    statusAttribute,
    spUserAssociation,
    eventDateAttribute,
    teamCapacitiesSource
}: UseShiftDataProps): UseShiftDataReturn => {
    const [dataState, setDataState] = useState<DataState>({
        engineers: [],
        shifts: [],
        shiftsLoading: true,
        error: null,
        processingErrors: [],
        interactionErrors: [],
        dataQualityIssues: []
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

    // No client-side filtering - all filtering handled by microflows

    // Helper functions to track different error types
    const trackProcessingError = useCallback((error: string) => {
        setDataState(prev => ({
            ...prev,
            processingErrors: [
                ...prev.processingErrors,
                `${new Date().toISOString().split("T")[1].split(".")[0]}: ${error}`
            ]
        }));
    }, []);

    const trackInteractionError = useCallback((error: string) => {
        setDataState(prev => ({
            ...prev,
            interactionErrors: [
                ...prev.interactionErrors,
                `${new Date().toISOString().split("T")[1].split(".")[0]}: ${error}`
            ]
        }));
    }, []);

    const trackDataQualityIssue = useCallback((issue: string) => {
        setDataState(prev => ({
            ...prev,
            dataQualityIssues: [
                ...prev.dataQualityIssues,
                `${new Date().toISOString().split("T")[1].split(".")[0]}: ${issue}`
            ]
        }));
    }, []);

    // Transform Mendix engineers data with error handling and filtering
    const transformedEngineers = useMemo((): Engineer[] => {
        const errors: string[] = [];

        try {
            if (engineersSource.status !== "available" || !engineersSource.items) {
                return [];
            }

            const engineers = engineersSource.items.map((item: ObjectItem, index: number) => {
                try {
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
                    const errorMsg = `Failed to process engineer ${index}: ${
                        error instanceof Error ? error.message : "Unknown error"
                    }`;
                    errors.push(errorMsg);

                    return {
                        id: item.id,
                        name: "Unknown",
                        team: "General",
                        lane: "General",
                        mendixObject: item
                    } as Engineer;
                }
            });

            // Update error state if we found any errors
            if (errors.length > 0) {
                errors.forEach(error => trackProcessingError(error));
            }

            return engineers;
            // No client-side filtering - microflow handles all filtering
        } catch (error) {
            const errorMsg = `Critical error processing engineers: ${
                error instanceof Error ? error.message : "Unknown error"
            }`;
            trackProcessingError(errorMsg);
            return [];
        }
    }, [engineersSource, nameAttribute, teamAttribute, laneAttribute, trackProcessingError]);

    // Transform Mendix shifts data with error handling
    const transformedShifts = useMemo((): ShiftAssignment[] => {
        const errors: string[] = [];

        try {
            if (!shiftsSource || shiftsSource.status !== "available" || !shiftsSource.items) {
                return [];
            }

            const shifts = shiftsSource.items
                .map((item: ObjectItem, index: number) => {
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

                        // Try to get engineer ID through the SPUser association
                        let engineerId: string | undefined;

                        // Use the spUserAssociation to get the referenced SPUser
                        if (spUserAssociation) {
                            const spUserRef = spUserAssociation.get(item);
                            if (spUserRef.status === "available" && spUserRef.value) {
                                // Get the SPUser ID from the association
                                engineerId = spUserRef.value.id;
                            }
                        }

                        // Fallback to shift ID if no association found
                        if (!engineerId) {
                            engineerId = item.id;
                        }

                        // Skip shifts without proper shift dates
                        if (!shiftDate) {
                            const issue = `Shift ${index} skipped: missing or invalid date`;
                            errors.push(issue);
                            trackDataQualityIssue(issue);
                            return null;
                        }

                        // TODO: Once microflows are updated, extract isRequest and replacesEventId
                        // from CalendarEvent attributes via microflow response
                        // For now, default to legacy behavior (isRequest = false)
                        const isRequest = false; // TODO: Extract from microflow
                        const replacesEventId = undefined; // TODO: Extract from microflow

                        return {
                            id: item.id,
                            date: shiftDate.toISOString().split("T")[0],
                            engineerId: engineerId || item.id,
                            shift: (dayType as ShiftType) || "M",
                            status,
                            isRequest,
                            replacesEventId,
                            shiftDate,
                            mendixObject: item
                        } as ShiftAssignment;
                    } catch (error) {
                        const errorMsg = `Failed to process shift ${index}: ${
                            error instanceof Error ? error.message : "Unknown error"
                        }`;
                        errors.push(errorMsg);
                        return null;
                    }
                })
                .filter((shift): shift is ShiftAssignment => shift !== null);

            // Update error state if we found any errors
            if (errors.length > 0) {
                errors.forEach(error => trackProcessingError(error));
            }

            return shifts;
        } catch (error) {
            const errorMsg = `Critical error processing shifts: ${
                error instanceof Error ? error.message : "Unknown error"
            }`;
            trackProcessingError(errorMsg);
            return [];
        }
    }, [shiftsSource, dayTypeAttribute, statusAttribute, spUserAssociation, eventDateAttribute, trackProcessingError]);

    // Main data processing effect with validation
    useEffect(() => {
        const validationError = validateConfiguration();

        if (validationError) {
            setDataState({
                engineers: [],
                shifts: [],
                shiftsLoading: false,
                error: validationError,
                processingErrors: [],
                interactionErrors: [],
                dataQualityIssues: []
            });
            return;
        }

        const shiftsLoading = shiftsSource?.status === "loading" || false;

        setDataState({
            engineers: transformedEngineers,
            shifts: transformedShifts,
            shiftsLoading,
            error: null,
            processingErrors: dataState.processingErrors,
            interactionErrors: dataState.interactionErrors,
            dataQualityIssues: dataState.dataQualityIssues
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

    const getDayCellData = useCallback(
        (engineerId: string, date: string): DayCellData => {
            try {
                // Get all shifts for this engineer on this date
                const dayShifts = dataState.shifts.filter(
                    shift => shift.engineerId === engineerId && shift.date === date
                );

                // Separate by type and status
                const activeEvent = dayShifts.find(
                    shift => shift.status === 'Active' && !shift.isRequest
                );
                
                const pendingRequest = dayShifts.find(
                    shift => shift.status === 'Pending' && shift.isRequest
                );

                const inactiveEvents = dayShifts.filter(
                    shift => shift.status === 'Inactive'
                );

                const rejectedRequests = dayShifts.filter(
                    shift => shift.status === 'Rejected' && shift.isRequest
                );

                return {
                    activeEvent,
                    pendingRequest,
                    inactiveEvents: inactiveEvents.length > 0 ? inactiveEvents : undefined,
                    rejectedRequests: rejectedRequests.length > 0 ? rejectedRequests : undefined
                };
            } catch (error) {
                // Return empty data on error
                return {};
            }
        },
        [dataState.shifts]
    );

    const updateShift = useCallback(
        (shiftId: string, updates: Partial<ShiftAssignment>) => {
            try {
                setDataState(prev => ({
                    ...prev,
                    shifts: prev.shifts.map(shift => (shift.id === shiftId ? { ...shift, ...updates } : shift))
                }));
            } catch (error) {
                const errorMsg = `Failed to update shift ${shiftId}: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`;
                trackInteractionError(errorMsg);
            }
        },
        [trackInteractionError]
    );

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

    // Note: getWeekNumber calculation moved to microflow
    // The microflow should calculate and provide weekNumber in TeamCapacity objects

    // Get all team capacities for multiple dates
    const getAllTeamCapacities = useCallback(
        (_dates: string[]): TeamCapacity[] => {
            if (!teamCapacitiesSource || teamCapacitiesSource.status !== "available") {
                return [];
            }

            // Microflow validation will be shown in debug panel
            // Expected structure per item from MF_GetCapacityByDateRange:
            // - teamName: string (exact match with Engineer.team)
            // - isNXT: boolean
            // - date: string (ISO format)
            // - percentage: number
            // - target: number
            // - meetsTarget: boolean
            // - weekNumber: number

            // TODO: Once microflows are implemented, extract complete TeamCapacity data directly
            // The microflow should handle all date filtering and data processing
            // For now, return empty array until microflows provide the complete data

            return [];
        },
        [teamCapacitiesSource]
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
        getDayCellData,
        updateShift,
        getEngineerById,
        getShiftsByDateRange,
        refreshData,
        getAllTeamCapacities,
        trackInteractionError,
        debugInfo: {
            attributesConfigured: {
                name: !!nameAttribute,
                team: !!teamAttribute,
                lane: !!laneAttribute,
                spUserAssociation: !!spUserAssociation,
                eventDate: !!eventDateAttribute,
                teamCapacities: !!teamCapacitiesSource
            },
            microflowInfo: {
                message: "Filtering handled by microflows - no client-side filtering"
            },
            microflowValidation: {
                engineers: {
                    status: engineersSource.status,
                    itemCount: engineersSource.items?.length || 0,
                    expectedMicroflow: "MF_GetFilteredEngineers",
                    expectedFields: ["id", "name", "team", "lane"],
                    actualFields: (engineersSource.items && engineersSource.items.length > 0) 
                        ? Object.keys(engineersSource.items[0]).filter(key => !key.startsWith('_'))
                        : [],
                    sampleData: (engineersSource.items && engineersSource.items.length > 0) 
                        ? {
                            id: engineersSource.items[0].id,
                            attributes: Object.keys(engineersSource.items[0]).filter(key => !key.startsWith('_')).slice(0, 10)
                        }
                        : null
                },
                shifts: {
                    status: shiftsSource?.status || "not-configured",
                    itemCount: shiftsSource?.items?.length || 0,
                    expectedMicroflow: "MF_GetShiftsByDateRange",
                    expectedFields: ["id", "engineerId", "date", "shift", "status"],
                    actualFields: (shiftsSource?.items && shiftsSource.items.length > 0) 
                        ? Object.keys(shiftsSource.items[0]).filter(key => !key.startsWith('_'))
                        : [],
                    sampleData: (shiftsSource?.items && shiftsSource.items.length > 0) 
                        ? {
                            id: shiftsSource.items[0].id,
                            attributes: Object.keys(shiftsSource.items[0]).filter(key => !key.startsWith('_')).slice(0, 10)
                        }
                        : null
                },
                teamCapacities: {
                    status: teamCapacitiesSource?.status || "not-configured",
                    itemCount: teamCapacitiesSource?.items?.length || 0,
                    expectedMicroflow: "MF_GetCapacityByDateRange",
                    expectedFields: ["teamName", "isNXT", "date", "percentage", "target", "meetsTarget", "weekNumber"],
                    actualFields: (teamCapacitiesSource?.items && teamCapacitiesSource.items.length > 0) 
                        ? Object.keys(teamCapacitiesSource.items[0]).filter(key => !key.startsWith('_'))
                        : [],
                    sampleData: (teamCapacitiesSource?.items && teamCapacitiesSource.items.length > 0) 
                        ? {
                            id: teamCapacitiesSource.items[0].id,
                            attributes: Object.keys(teamCapacitiesSource.items[0]).filter(key => !key.startsWith('_')).slice(0, 10)
                        }
                        : null
                }
            },
            processingErrors: dataState.processingErrors,
            interactionErrors: dataState.interactionErrors,
            dataQualityIssues: dataState.dataQualityIssues
        }
    };
};
