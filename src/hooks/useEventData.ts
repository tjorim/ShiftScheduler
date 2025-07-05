import { useState, useEffect, useMemo, useCallback } from "react";
import { ListValue, ObjectItem } from "mendix";
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
    // Team capacity parameters (microflow provides complete objects)
    teamCapacitiesSource?: ListValue;
}

export const useEventData = ({
    peopleSource,
    eventsSource,
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

        // Validate events configuration if provided
        if (eventsSource && eventsSource.status === "unavailable") {
            return { message: "Events data source is unavailable", property: "events" };
        }

        return null;
    }, [peopleSource, eventsSource]);

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

    // Transform Mendix people data with error handling
    // Expects microflow to return objects with standardized field names: id, name, team, lane
    const transformedPeople = useMemo((): Person[] => {
        const errors: string[] = [];

        try {
            if (peopleSource.status !== "available" || !peopleSource.items) {
                return [];
            }

            const people = peopleSource.items.map((item: ObjectItem, index: number) => {
                try {
                    // TODO: Implement microflow data extraction
                    // For now, return basic structure until microflows are implemented
                    // Microflow should return objects with standardized fields: name, team, lane

                    return {
                        id: item.id,
                        name: `Person ${index}`, // TODO: Extract from microflow
                        team: "General", // TODO: Extract from microflow
                        lane: "General", // TODO: Extract from microflow
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
    }, [peopleSource, trackProcessingError]);

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
                        // TODO: Implement microflow data extraction
                        // For now, return basic structure until microflows are implemented
                        // Microflow should return objects with standardized fields: date, personId, shift, status

                        const today = new Date();
                        const eventDate = new Date(today.getTime() + index * 24 * 60 * 60 * 1000); // Dummy dates

                        return {
                            id: item.id,
                            date: eventDate.toISOString().split("T")[0],
                            personId: item.id, // TODO: Extract from microflow
                            shift: "M" as ShiftType, // TODO: Extract from microflow
                            status: "planned", // TODO: Extract from microflow
                            isRequest: false, // TODO: Extract from microflow
                            replacesEventId: undefined, // TODO: Extract from microflow
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
    }, [eventsSource, trackProcessingError]);

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

        setDataState(prev => ({
            ...prev,
            people: transformedPeople,
            events: transformedEvents,
            eventsLoading,
            error: null
        }));
    }, [validateConfiguration, transformedPeople, transformedEvents, peopleSource.status, eventsSource?.status]);

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

    // Memoized lookup map for efficient day cell data retrieval
    const dayCellDataMap = useMemo(() => {
        const map = new Map<string, DayCellData>();

        try {
            for (const event of dataState.events) {
                const key = `${event.personId}-${event.date}`;
                if (!map.has(key)) {
                    map.set(key, {});
                }
                const cellData = map.get(key)!;

                if (event.status === "active" && !event.isRequest) {
                    cellData.activeEvent = event;
                } else if (event.status === "pending" && event.isRequest) {
                    cellData.pendingRequest = event;
                } else if (event.status === "inactive") {
                    if (!cellData.inactiveEvents) {
                        cellData.inactiveEvents = [];
                    }
                    cellData.inactiveEvents.push(event);
                } else if (event.status === "rejected" && event.isRequest) {
                    if (!cellData.rejectedRequests) {
                        cellData.rejectedRequests = [];
                    }
                    cellData.rejectedRequests.push(event);
                }
            }
        } catch (error) {
            // Return empty map on error
        }

        return map;
    }, [dataState.events]);

    const getDayCellData = useCallback(
        (personId: string, date: string): DayCellData => {
            const key = `${personId}-${date}`;
            return dayCellDataMap.get(key) || {};
        },
        [dayCellDataMap]
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
            processingErrors: dataState.processingErrors,
            interactionErrors: dataState.interactionErrors,
            dataQualityIssues: dataState.dataQualityIssues
        }
    };
};
