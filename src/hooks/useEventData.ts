import { useState, useEffect, useMemo, useCallback } from "react";
import { ListValue, ObjectItem, ListAttributeValue, ListReferenceValue } from "mendix";
import {
    UseEventDataReturn,
    Person,
    EventAssignment,
    ShiftType,
    ValidationError,
    TeamCapacity,
    DayCellData
} from "../types/shiftScheduler";
// formatDateForShift and date calculations moved to microflow - no longer needed in widget

interface DataState {
    people: Person[];
    events: EventAssignment[];
    eventsLoading: boolean;
    error: ValidationError | null;
    processingErrors: string[];
    interactionErrors: string[];
    dataQualityIssues: string[];
}

interface UseEventDataProps {
    peopleSource: ListValue;
    eventsSource?: ListValue;
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

export const useEventData = ({
    peopleSource,
    eventsSource,
    nameAttribute,
    teamAttribute,
    laneAttribute,
    dayTypeAttribute,
    statusAttribute,
    spUserAssociation,
    eventDateAttribute,
    teamCapacitiesSource
}: UseEventDataProps): UseEventDataReturn => {
    const [dataState, setDataState] = useState<DataState>({
        people: [],
        events: [],
        eventsLoading: true,
        error: null,
        processingErrors: [],
        interactionErrors: [],
        dataQualityIssues: []
    });

    // Validation helper
    const validateConfiguration = useCallback((): ValidationError | null => {
        if (!peopleSource) {
            return { message: "People data source is required", property: "people" };
        }

        if (peopleSource.status === "unavailable") {
            return { message: "People data source is unavailable", property: "people" };
        }

        if (!nameAttribute) {
            return { message: "Name attribute is required for people", property: "nameAttribute" };
        }

        // Validate events configuration if provided
        if (eventsSource && eventsSource.status === "unavailable") {
            return { message: "Events data source is unavailable", property: "events" };
        }

        return null;
    }, [peopleSource, eventsSource, nameAttribute]);

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

    // Transform Mendix people data with error handling and filtering
    const transformedPeople = useMemo((): Person[] => {
        const errors: string[] = [];

        try {
            if (peopleSource.status !== "available" || !peopleSource.items) {
                return [];
            }

            const people = peopleSource.items.map((item: ObjectItem, index: number) => {
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
                    } as Person;
                } catch (error) {
                    const errorMsg = `Failed to process person ${index}: ${
                        error instanceof Error ? error.message : "Unknown error"
                    }`;
                    errors.push(errorMsg);

                    return {
                        id: item.id,
                        name: "Unknown",
                        team: "General",
                        lane: "General",
                        mendixObject: item
                    } as Person;
                }
            });

            // Update error state if we found any errors
            if (errors.length > 0) {
                errors.forEach(error => trackProcessingError(error));
            }

            return people;
            // No client-side filtering - microflow handles all filtering
        } catch (error) {
            const errorMsg = `Critical error processing people: ${
                error instanceof Error ? error.message : "Unknown error"
            }`;
            trackProcessingError(errorMsg);
            return [];
        }
    }, [peopleSource, nameAttribute, teamAttribute, laneAttribute, trackProcessingError]);

    // Transform Mendix events data with error handling
    const transformedEvents = useMemo((): EventAssignment[] => {
        const errors: string[] = [];

        try {
            if (!eventsSource || eventsSource.status !== "available" || !eventsSource.items) {
                return [];
            }

            const events = eventsSource.items
                .map((item: ObjectItem, index: number) => {
                    try {
                        const dayType = dayTypeAttribute?.get(item).value || "";
                        const status = statusAttribute?.get(item).value;

                        // Get the event date directly from the CalendarEvents entity
                        let eventDate: Date | undefined;
                        if (eventDateAttribute) {
                            const eventDateValue = eventDateAttribute.get(item);
                            if (eventDateValue.status === "available" && eventDateValue.value) {
                                eventDate = eventDateValue.value;
                            }
                        }

                        // Try to get person ID through the SPUser association
                        let personId: string | undefined;

                        // Use the spUserAssociation to get the referenced SPUser
                        if (spUserAssociation) {
                            const spUserRef = spUserAssociation.get(item);
                            if (spUserRef.status === "available" && spUserRef.value) {
                                // Get the SPUser ID from the association
                                personId = spUserRef.value.id;
                            }
                        }

                        // Fallback to event ID if no association found
                        if (!personId) {
                            personId = item.id;
                        }

                        // Skip events without proper event dates
                        if (!eventDate) {
                            const issue = `Event ${index} skipped: missing or invalid date`;
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
                            date: eventDate.toISOString().split("T")[0],
                            personId: personId || item.id,
                            shift: (dayType as ShiftType) || "M",
                            status,
                            isRequest,
                            replacesEventId,
                            shiftDate: eventDate,
                            mendixObject: item
                        } as EventAssignment;
                    } catch (error) {
                        const errorMsg = `Failed to process event ${index}: ${
                            error instanceof Error ? error.message : "Unknown error"
                        }`;
                        errors.push(errorMsg);
                        return null;
                    }
                })
                .filter((event): event is EventAssignment => event !== null);

            // Update error state if we found any errors
            if (errors.length > 0) {
                errors.forEach(error => trackProcessingError(error));
            }

            return events;
        } catch (error) {
            const errorMsg = `Critical error processing events: ${
                error instanceof Error ? error.message : "Unknown error"
            }`;
            trackProcessingError(errorMsg);
            return [];
        }
    }, [
        eventsSource,
        dayTypeAttribute,
        statusAttribute,
        spUserAssociation,
        eventDateAttribute,
        trackProcessingError,
        trackDataQualityIssue
    ]);

    // Main data processing effect with validation
    useEffect(() => {
        const validationError = validateConfiguration();

        if (validationError) {
            setDataState({
                people: [],
                events: [],
                eventsLoading: false,
                error: validationError,
                processingErrors: [],
                interactionErrors: [],
                dataQualityIssues: []
            });
            return;
        }

        const eventsLoading = eventsSource?.status === "loading" || false;

        setDataState({
            people: transformedPeople,
            events: transformedEvents,
            eventsLoading,
            error: null,
            processingErrors: dataState.processingErrors,
            interactionErrors: dataState.interactionErrors,
            dataQualityIssues: dataState.dataQualityIssues
        });
    }, [
        validateConfiguration,
        transformedPeople,
        transformedEvents,
        peopleSource.status,
        eventsSource?.status,
        dataState.processingErrors,
        dataState.interactionErrors,
        dataState.dataQualityIssues
    ]);

    // Enhanced helper methods with error handling
    const getEventsForPerson = useCallback(
        (personId: string): EventAssignment[] => {
            try {
                return dataState.events.filter(event => event.personId === personId);
            } catch (error) {
                return [];
            }
        },
        [dataState.events]
    );

    const getPeopleByTeam = useCallback((): { [team: string]: Person[] } => {
        try {
            const teamGroups: { [team: string]: Person[] } = {};
            dataState.people.forEach(person => {
                const teamName = person.team;
                if (!teamGroups[teamName]) {
                    teamGroups[teamName] = [];
                }
                teamGroups[teamName].push(person);
            });
            return teamGroups;
        } catch (error) {
            return {};
        }
    }, [dataState.people]);

    const getEventForDate = useCallback(
        (personId: string, date: string): EventAssignment | undefined => {
            try {
                return dataState.events.find(event => event.personId === personId && event.date === date);
            } catch (error) {
                return undefined;
            }
        },
        [dataState.events]
    );

    const getDayCellData = useCallback(
        (personId: string, date: string): DayCellData => {
            try {
                // Get all events for this person on this date
                const dayEvents = dataState.events.filter(event => event.personId === personId && event.date === date);

                // Separate by type and status
                const activeEvent = dayEvents.find(event => event.status === "Active" && !event.isRequest);

                const pendingRequest = dayEvents.find(event => event.status === "Pending" && event.isRequest);

                const inactiveEvents = dayEvents.filter(event => event.status === "Inactive");

                const rejectedRequests = dayEvents.filter(event => event.status === "Rejected" && event.isRequest);

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
        [dataState.events]
    );

    const updateEvent = useCallback(
        (eventId: string, updates: Partial<EventAssignment>) => {
            try {
                setDataState(prev => ({
                    ...prev,
                    events: prev.events.map(event => (event.id === eventId ? { ...event, ...updates } : event))
                }));
            } catch (error) {
                const errorMsg = `Failed to update event ${eventId}: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`;
                trackInteractionError(errorMsg);
            }
        },
        [trackInteractionError]
    );

    const getPersonById = useCallback(
        (personId: string): Person | undefined => {
            try {
                return dataState.people.find(person => person.id === personId);
            } catch (error) {
                return undefined;
            }
        },
        [dataState.people]
    );

    const getEventsByDateRange = useCallback(
        (startDate: string, endDate: string): EventAssignment[] => {
            try {
                return dataState.events.filter(event => event.date >= startDate && event.date <= endDate);
            } catch (error) {
                return [];
            }
        },
        [dataState.events]
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
        }
    }, [validateConfiguration]);

    // Calculate loading state when needed
    const peopleLoading = peopleSource.status === "loading";
    const loading = peopleLoading || dataState.eventsLoading;

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
        people: dataState.people,
        events: dataState.events,
        loading,
        eventsLoading: dataState.eventsLoading,
        error: dataState.error,
        getEventsForPerson,
        getPeopleByTeam,
        getEventForDate,
        getDayCellData,
        updateEvent,
        getPersonById,
        getEventsByDateRange,
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
            processingErrors: dataState.processingErrors,
            interactionErrors: dataState.interactionErrors,
            dataQualityIssues: dataState.dataQualityIssues
        }
    };
};
