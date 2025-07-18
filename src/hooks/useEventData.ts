import { useState, useEffect, useCallback } from "react";
import { ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";
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
    teamCapacitiesSource?: ListValue;
    // Person attribute references
    personNameAttribute?: ListAttributeValue<string>;
    personTeamAttribute?: ListAttributeValue<string>;
    personLaneAttribute?: ListAttributeValue<string>;
    // Event attribute references
    eventDateAttribute?: ListAttributeValue<string>;
    eventPersonIdAttribute?: ListAttributeValue<string>;
    eventTypeAttribute?: ListAttributeValue<string>;
    eventStatusAttribute?: ListAttributeValue<string>;
    eventIsRequestAttribute?: ListAttributeValue<boolean>;
    eventReplacesEventIdAttribute?: ListAttributeValue<string>;
    // Team capacity attribute references
    capacityTeamNameAttribute?: ListAttributeValue<string>;
    capacityIsNXTAttribute?: ListAttributeValue<boolean>;
    capacityDateAttribute?: ListAttributeValue<string>;
    capacityWeekNumberAttribute?: ListAttributeValue<Big>;
    capacityPercentageAttribute?: ListAttributeValue<Big>;
    capacityTargetAttribute?: ListAttributeValue<Big>;
    capacityMeetsTargetAttribute?: ListAttributeValue<boolean>;
    showDebugInfo?: boolean;
}

export const useEventData = ({
    peopleSource,
    eventsSource,
    teamCapacitiesSource,
    personNameAttribute,
    personTeamAttribute,
    personLaneAttribute,
    eventDateAttribute,
    eventPersonIdAttribute,
    eventTypeAttribute,
    eventStatusAttribute,
    eventIsRequestAttribute,
    eventReplacesEventIdAttribute,
    capacityTeamNameAttribute,
    capacityIsNXTAttribute,
    capacityDateAttribute,
    capacityWeekNumberAttribute,
    capacityPercentageAttribute,
    capacityTargetAttribute,
    capacityMeetsTargetAttribute,
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
        personNameAttribute,
        personTeamAttribute,
        personLaneAttribute,
        showDebugInfo,
        trackProcessingError,
        trackDataQualityIssue
    });

    const { events: transformedEvents } = useEventsTransform({
        eventsSource,
        eventDateAttribute,
        eventPersonIdAttribute,
        eventTypeAttribute,
        eventStatusAttribute,
        eventIsRequestAttribute,
        eventReplacesEventIdAttribute,
        showDebugInfo,
        trackProcessingError,
        trackDataQualityIssue
    });

    const { getAllTeamCapacities } = useTeamCapacities({
        teamCapacitiesSource,
        capacityTeamNameAttribute,
        capacityIsNXTAttribute,
        capacityDateAttribute,
        capacityWeekNumberAttribute,
        capacityPercentageAttribute,
        capacityTargetAttribute,
        capacityMeetsTargetAttribute,
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

        // Validate critical people attributes are configured
        if (!personNameAttribute) {
            return {
                message: "Person name attribute is required for people data source",
                property: "personNameAttribute"
            };
        }
        if (!personTeamAttribute) {
            return {
                message: "Person team attribute is required for people data source",
                property: "personTeamAttribute"
            };
        }
        if (!personLaneAttribute) {
            return {
                message: "Person lane attribute is required for people data source",
                property: "personLaneAttribute"
            };
        }

        // Validate events configuration if provided
        if (eventsSource && eventsSource.status === "unavailable") {
            return { message: "Events data source is unavailable", property: "events" };
        }

        // Validate critical event attributes if events source is configured
        if (eventsSource) {
            if (!eventDateAttribute) {
                return {
                    message: "Event date attribute is required when events data source is configured",
                    property: "eventDateAttribute"
                };
            }
            if (!eventPersonIdAttribute) {
                return {
                    message: "Event person ID attribute is required when events data source is configured",
                    property: "eventPersonIdAttribute"
                };
            }
            if (!eventTypeAttribute) {
                return {
                    message: "Event type attribute is required when events data source is configured",
                    property: "eventTypeAttribute"
                };
            }
        }

        // Validate team capacities configuration if provided
        if (teamCapacitiesSource && teamCapacitiesSource.status === "unavailable") {
            return { message: "Team capacities data source is unavailable", property: "teamCapacities" };
        }

        // Validate critical team capacity attributes if team capacities source is configured
        if (teamCapacitiesSource) {
            if (!capacityTeamNameAttribute) {
                return {
                    message: "Team name attribute is required when team capacities data source is configured",
                    property: "capacityTeamNameAttribute"
                };
            }
            if (!capacityPercentageAttribute) {
                return {
                    message: "Capacity percentage attribute is required when team capacities data source is configured",
                    property: "capacityPercentageAttribute"
                };
            }
        }

        return null;
    }, [
        peopleSource,
        eventsSource,
        teamCapacitiesSource,
        personNameAttribute,
        personTeamAttribute,
        personLaneAttribute,
        eventDateAttribute,
        eventPersonIdAttribute,
        eventTypeAttribute,
        capacityTeamNameAttribute,
        capacityPercentageAttribute
    ]);

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
        [dataState.events, showDebugInfo, trackProcessingError, trackDataQualityIssue]
    );

    const getPeopleByTeam = useCallback((): { [team: string]: Person[] } => {
        return dataQueries.getPeopleByTeam(dataState.people, showDebugInfo, trackProcessingError);
    }, [dataState.people, showDebugInfo, trackProcessingError]);

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
        [dataState.events, showDebugInfo, trackProcessingError, trackDataQualityIssue]
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
            return dataQueries.getPersonById(
                dataState.people,
                personId,
                showDebugInfo,
                trackDataQualityIssue,
                trackProcessingError
            );
        },
        [dataState.people, showDebugInfo, trackDataQualityIssue, trackProcessingError]
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
        [dataState.events, showDebugInfo, trackProcessingError, trackDataQualityIssue]
    );

    const refreshData = useCallback(() => {
        try {
            // Clear errors and set loading state
            if (showDebugInfo) {
                clearErrors(); // Clear all errors on refresh
            }

            // Trigger Mendix data source refresh by calling reload on each data source
            if (peopleSource?.status === "available" && typeof (peopleSource as any).reload === "function") {
                (peopleSource as any).reload();
            }
            if (eventsSource?.status === "available" && typeof (eventsSource as any).reload === "function") {
                (eventsSource as any).reload();
            }
            if (
                teamCapacitiesSource?.status === "available" &&
                typeof (teamCapacitiesSource as any).reload === "function"
            ) {
                (teamCapacitiesSource as any).reload();
            }

            // Note: The actual data refresh will be handled by the Mendix platform
            // and will trigger re-renders through the data source status changes
        } catch (error) {
            const errorMsg = `Failed to refresh data: ${error instanceof Error ? error.message : "Unknown error"}`;
            trackProcessingError(errorMsg);
        }
    }, [peopleSource, eventsSource, teamCapacitiesSource, showDebugInfo, clearErrors, trackProcessingError]);

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
                    expectedFields: ["id", "personId", "date", "eventType", "status"],
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
