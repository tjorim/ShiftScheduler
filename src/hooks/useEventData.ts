import { useState, useEffect, useCallback } from "react";
import { ListValue } from "mendix";
import { UseEventDataReturn, Person, EventAssignment, ValidationError } from "../types/shiftScheduler";
import { useErrorTracking } from "./useErrorTracking";
import { usePeopleTransform } from "./usePeopleTransform";
import { useEventsTransform } from "./useEventsTransform";
import { useTeamCapacities } from "./useTeamCapacities";
import { useDayCellData } from "./useDayCellData";
import * as dataQueries from "../utils/dataQueries";

interface DataState {
    people: Person[];
    events: EventAssignment[];
    eventsLoading: boolean;
    error: ValidationError | null;
}

interface UseEventDataProps {
    peopleSource: ListValue;
    eventsSource?: ListValue;
    // Team capacity parameters (microflow provides complete objects)
    teamCapacitiesSource?: ListValue;
    showDebugInfo?: boolean;
}

export const useEventData = ({
    peopleSource,
    eventsSource,
    teamCapacitiesSource,
    showDebugInfo = false
}: UseEventDataProps): UseEventDataReturn => {
    const [dataState, setDataState] = useState<DataState>({
        people: [],
        events: [],
        eventsLoading: true,
        error: null
    });

    // Error tracking and debugging
    const { errorState, trackProcessingError, trackInteractionError, trackDataQualityIssue, clearErrors } =
        useErrorTracking({ showDebugInfo });

    // Data transformation hooks
    const { people: transformedPeople } = usePeopleTransform({
        peopleSource,
        showDebugInfo,
        trackProcessingError,
        trackDataQualityIssue
    });

    const { events: transformedEvents } = useEventsTransform({
        eventsSource,
        showDebugInfo,
        trackProcessingError,
        trackDataQualityIssue
    });

    const { getAllTeamCapacities } = useTeamCapacities({
        teamCapacitiesSource,
        showDebugInfo,
        trackProcessingError,
        trackDataQualityIssue
    });

    const { getDayCellData, validateDayCellData } = useDayCellData({
        events: transformedEvents,
        showDebugInfo,
        trackDataQualityIssue
    });

    // Validation helper
    const validateConfiguration = useCallback((): ValidationError | null => {
        if (!peopleSource) {
            return { message: "People data source is required", property: "people" };
        }

        if (peopleSource.status === "unavailable") {
            return { message: "People data source is unavailable", property: "people" };
        }

        // Validate events configuration if provided
        if (eventsSource && eventsSource.status === "unavailable") {
            return { message: "Events data source is unavailable", property: "events" };
        }

        return null;
    }, [peopleSource, eventsSource]);

    // No client-side filtering - all filtering handled by microflows

    // Main data processing effect with validation
    useEffect(() => {
        const validationError = validateConfiguration();

        if (validationError) {
            setDataState({
                people: [],
                events: [],
                eventsLoading: false,
                error: validationError
            });
            return;
        }

        const eventsLoading = eventsSource?.status === "loading" || false;

        setDataState(prev => ({
            ...prev,
            people: transformedPeople,
            events: transformedEvents,
            eventsLoading,
            error: null
        }));
    }, [validateConfiguration, transformedPeople, transformedEvents, peopleSource.status, eventsSource?.status]);

    // Enhanced helper methods with error handling using utility functions
    const getEventsForPerson = useCallback(
        (personId: string): EventAssignment[] => {
            return dataQueries.getEventsForPerson(
                dataState.events,
                personId,
                showDebugInfo,
                trackDataQualityIssue,
                trackProcessingError
            );
        },
        [dataState.events, showDebugInfo, trackDataQualityIssue, trackProcessingError]
    );

    const getPeopleByTeam = useCallback((): { [team: string]: Person[] } => {
        return dataQueries.getPeopleByTeam(dataState.people);
    }, [dataState.people]);

    const getEventForDate = useCallback(
        (personId: string, date: string): EventAssignment | undefined => {
            return dataQueries.getEventForDate(
                dataState.events,
                personId,
                date,
                showDebugInfo,
                trackDataQualityIssue,
                trackProcessingError
            );
        },
        [dataState.events, showDebugInfo, trackDataQualityIssue, trackProcessingError]
    );

    const updateEvent = useCallback(
        (eventId: string, updates: Partial<EventAssignment>) => {
            try {
                // Validation checks
                if (showDebugInfo) {
                    if (!eventId || eventId.trim() === "") {
                        trackDataQualityIssue("Attempted to update event with empty ID");
                        return;
                    }
                    if (!updates || Object.keys(updates).length === 0) {
                        trackDataQualityIssue(`No updates provided for event ${eventId}`);
                        return;
                    }
                }

                setDataState(prev => {
                    const eventExists = prev.events.some(event => event.id === eventId);
                    if (showDebugInfo && !eventExists) {
                        trackDataQualityIssue(`Attempted to update non-existent event: ${eventId}`);
                    }

                    return {
                        ...prev,
                        events: prev.events.map(event => (event.id === eventId ? { ...event, ...updates } : event))
                    };
                });
            } catch (error) {
                const errorMsg = `Failed to update event ${eventId}: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`;
                trackInteractionError(errorMsg);
            }
        },
        [trackInteractionError, trackDataQualityIssue, showDebugInfo]
    );

    const getPersonById = useCallback(
        (personId: string): Person | undefined => {
            return dataQueries.getPersonById(dataState.people, personId);
        },
        [dataState.people]
    );

    const getEventsByDateRange = useCallback(
        (startDate: string, endDate: string): EventAssignment[] => {
            return dataQueries.getEventsByDateRange(
                dataState.events,
                startDate,
                endDate,
                showDebugInfo,
                trackDataQualityIssue,
                trackProcessingError
            );
        },
        [dataState.events, showDebugInfo, trackDataQualityIssue, trackProcessingError]
    );

    const refreshData = useCallback(() => {
        try {
            // Force re-evaluation of data sources and clear errors
            setDataState(prev => ({ ...prev, loading: true, error: null }));
            if (showDebugInfo) {
                clearErrors(); // Clear all errors on refresh
            }
            // In a real implementation, this would trigger data refresh
            setTimeout(() => {
                const validationError = validateConfiguration();
                setDataState(prev => ({
                    ...prev,
                    loading: false,
                    peopleLoading: false,
                    eventsLoading: false,
                    error: validationError
                }));
            }, 100);
        } catch (error) {
            setDataState(prev => ({
                ...prev,
                loading: false,
                error: { message: "Failed to refresh data" }
            }));
            trackProcessingError("Failed to refresh data");
        }
    }, [validateConfiguration, showDebugInfo, clearErrors, trackProcessingError]);

    // Calculate loading state when needed
    const peopleLoading = peopleSource.status === "loading";
    const loading = peopleLoading || dataState.eventsLoading;

    // Note: getWeekNumber calculation moved to microflow
    // The microflow should calculate and provide weekNumber in TeamCapacity objects

    return {
        people: dataState.people,
        events: dataState.events,
        loading,
        eventsLoading: dataState.eventsLoading,
        error: dataState.error,
        getEventsForPerson,
        getPeopleByTeam,
        getEventForDate,
        getDayCellData,
        validateDayCellData,
        updateEvent,
        getPersonById,
        getEventsByDateRange,
        refreshData,
        getAllTeamCapacities,
        trackInteractionError,
        trackProcessingError,
        trackDataQualityIssue,
        clearErrors,
        debugInfo: {
            microflowConfiguration: {
                people: !!peopleSource,
                events: !!eventsSource,
                teamCapacities: !!teamCapacitiesSource
            },
            microflowInfo: {
                message: "Filtering handled by microflows - no client-side filtering"
            },
            microflowValidation: {
                people: {
                    status: peopleSource.status,
                    itemCount: peopleSource.items?.length || 0,
                    expectedMicroflow: "MF_GetFilteredPeople",
                    expectedFields: ["id", "name", "team", "lane"],
                    actualFields:
                        peopleSource.items && peopleSource.items.length > 0
                            ? Object.keys(peopleSource.items[0]).filter(key => !key.startsWith("_"))
                            : [],
                    sampleData:
                        peopleSource.items && peopleSource.items.length > 0
                            ? {
                                  id: peopleSource.items[0].id,
                                  attributes: Object.keys(peopleSource.items[0])
                                      .filter(key => !key.startsWith("_"))
                                      .slice(0, 10)
                              }
                            : null
                },
                events: {
                    status: eventsSource?.status || "not-configured",
                    itemCount: eventsSource?.items?.length || 0,
                    expectedMicroflow: "MF_GetEventsByDateRange",
                    expectedFields: ["id", "personId", "date", "shift", "status"],
                    actualFields:
                        eventsSource?.items && eventsSource.items.length > 0
                            ? Object.keys(eventsSource.items[0]).filter(key => !key.startsWith("_"))
                            : [],
                    sampleData:
                        eventsSource?.items && eventsSource.items.length > 0
                            ? {
                                  id: eventsSource.items[0].id,
                                  attributes: Object.keys(eventsSource.items[0])
                                      .filter(key => !key.startsWith("_"))
                                      .slice(0, 10)
                              }
                            : null
                },
                teamCapacities: {
                    status: teamCapacitiesSource?.status || "not-configured",
                    itemCount: teamCapacitiesSource?.items?.length || 0,
                    expectedMicroflow: "MF_GetCapacityByDateRange",
                    expectedFields: ["teamName", "isNXT", "date", "percentage", "target", "meetsTarget", "weekNumber"],
                    actualFields:
                        teamCapacitiesSource?.items && teamCapacitiesSource.items.length > 0
                            ? Object.keys(teamCapacitiesSource.items[0]).filter(key => !key.startsWith("_"))
                            : [],
                    sampleData:
                        teamCapacitiesSource?.items && teamCapacitiesSource.items.length > 0
                            ? {
                                  id: teamCapacitiesSource.items[0].id,
                                  attributes: Object.keys(teamCapacitiesSource.items[0])
                                      .filter(key => !key.startsWith("_"))
                                      .slice(0, 10)
                              }
                            : null
                }
            },
            processingErrors: errorState.processingErrors,
            interactionErrors: errorState.interactionErrors,
            dataQualityIssues: errorState.dataQualityIssues
        }
    };
};
