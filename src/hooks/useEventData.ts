import { useState, useEffect, useMemo, useCallback, useReducer } from "react";
import { ListValue, ObjectItem } from "mendix";
import {
    UseEventDataReturn,
    Person,
    EventAssignment,
    ShiftType,
    ValidationError,
    TeamCapacity,
    DayCellData,
    DayCellDataValidationResult,
    ErrorState,
    ErrorAction
} from "../types/shiftScheduler";
// formatDateForShift and date calculations moved to microflow - no longer needed in widget

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

// Error reducer for managing error state
const errorReducer = (state: ErrorState, action: ErrorAction): ErrorState => {
    switch (action.type) {
        case "ADD_PROCESSING_ERROR":
            return { ...state, processingErrors: [...state.processingErrors, action.payload] };
        case "ADD_INTERACTION_ERROR":
            return { ...state, interactionErrors: [...state.interactionErrors, action.payload] };
        case "ADD_DATA_QUALITY_ISSUE":
            return { ...state, dataQualityIssues: [...state.dataQualityIssues, action.payload] };
        case "CLEAR_ERRORS":
            return { ...state, [action.errorType]: [] };
        case "CLEAR_ALL_ERRORS":
            return { processingErrors: [], interactionErrors: [], dataQualityIssues: [] };
        default:
            return state;
    }
};

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

    // Separate error state management with useReducer
    const [errorState, dispatchError] = useReducer(errorReducer, {
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

    // Enhanced error tracking functions with conditional debug mode
    const trackProcessingError = useCallback(
        (error: string): void => {
            if (!showDebugInfo) {
                return;
            } // Skip error tracking in production

            const timestamp = new Date().toISOString().split("T")[1].split(".")[0];
            dispatchError({
                type: "ADD_PROCESSING_ERROR",
                payload: `${timestamp}: ${error}`
            });
        },
        [showDebugInfo]
    );

    const trackInteractionError = useCallback(
        (error: string): void => {
            if (!showDebugInfo) {
                return;
            } // Skip error tracking in production

            const timestamp = new Date().toISOString().split("T")[1].split(".")[0];
            dispatchError({
                type: "ADD_INTERACTION_ERROR",
                payload: `${timestamp}: ${error}`
            });
        },
        [showDebugInfo]
    );

    const trackDataQualityIssue = useCallback(
        (issue: string): void => {
            if (!showDebugInfo) {
                return;
            } // Skip error tracking in production

            dispatchError({
                type: "ADD_DATA_QUALITY_ISSUE",
                payload: issue
            });
        },
        [showDebugInfo]
    );

    const clearErrors = useCallback(
        (errorType?: keyof ErrorState): void => {
            if (!showDebugInfo) {
                return;
            }

            if (errorType) {
                dispatchError({ type: "CLEAR_ERRORS", errorType });
            } else {
                dispatchError({ type: "CLEAR_ALL_ERRORS" });
            }
        },
        [showDebugInfo]
    );

    // Transform Mendix people data with comprehensive error handling
    // Expects microflow to return objects with standardized field names: id, name, team, lane
    const transformedPeople = useMemo((): Person[] => {
        try {
            if (peopleSource.status !== "available" || !peopleSource.items) {
                if (showDebugInfo && peopleSource.status !== "loading") {
                    trackProcessingError(`People source not available: ${peopleSource.status}`);
                }
                return [];
            }

            const people = peopleSource.items.map((item: ObjectItem, index: number) => {
                try {
                    // Extract person data from microflow - expects standardized field names
                    const getValue = (fieldName: string, fallback = ""): string => {
                        try {
                            // Access Mendix object attributes
                            const attr = (item as any)[fieldName];
                            return attr?.value || attr || fallback;
                        } catch {
                            return fallback;
                        }
                    };

                    const name = getValue("name", `Person ${index}`);
                    const team = getValue("team", "General");
                    const lane = getValue("lane", "General");

                    // Data quality checks - always run but only log in debug mode
                    if (!name || name.trim() === "") {
                        if (showDebugInfo) {
                            trackDataQualityIssue(`Person ${item.id} has empty or missing name`);
                        }
                    }
                    if (!team || team.trim() === "") {
                        if (showDebugInfo) {
                            trackDataQualityIssue(`Person ${item.id} (${name}) has empty or missing team`);
                        }
                    }
                    if (!lane || lane.trim() === "") {
                        if (showDebugInfo) {
                            trackDataQualityIssue(`Person ${item.id} (${name}) has empty or missing lane`);
                        }
                    }
                    if (name === `Person ${index}`) {
                        if (showDebugInfo) {
                            trackDataQualityIssue(`Person ${item.id} using fallback name`);
                        }
                    }

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
                    trackProcessingError(errorMsg);

                    return {
                        id: item.id,
                        name: "Unknown",
                        team: "General",
                        lane: "General",
                        mendixObject: item
                    } as Person;
                }
            });

            // Additional data quality checks
            if (showDebugInfo) {
                const teamCounts = new Map<string, number>();
                const laneCounts = new Map<string, number>();

                people.forEach(person => {
                    teamCounts.set(person.team, (teamCounts.get(person.team) || 0) + 1);
                    laneCounts.set(person.lane, (laneCounts.get(person.lane) || 0) + 1);
                });

                if (teamCounts.size > 10) {
                    trackDataQualityIssue(`High number of teams (${teamCounts.size}) may indicate data quality issues`);
                }
                if (laneCounts.size > 20) {
                    trackDataQualityIssue(`High number of lanes (${laneCounts.size}) may indicate data quality issues`);
                }
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
    }, [peopleSource, trackProcessingError, trackDataQualityIssue, showDebugInfo]);

    // Transform Mendix events data with comprehensive error handling
    const transformedEvents = useMemo((): EventAssignment[] => {
        try {
            if (!eventsSource || eventsSource.status !== "available" || !eventsSource.items) {
                if (showDebugInfo && eventsSource && eventsSource.status !== "loading") {
                    trackProcessingError(`Events source not available: ${eventsSource.status}`);
                }
                return [];
            }

            const events = eventsSource.items
                .map((item: ObjectItem, index: number) => {
                    try {
                        // Extract event data from microflow - expects standardized field names
                        const getValue = (fieldName: string, fallback: any = null): any => {
                            try {
                                const attr = (item as any)[fieldName];
                                return attr?.value || attr || fallback;
                            } catch {
                                return fallback;
                            }
                        };

                        const dateStr = getValue("date");
                        const personId = getValue("personId", item.id);
                        const shift = getValue("shift", "M") as ShiftType;
                        const status = getValue("status", "planned");
                        const isRequest = getValue("isRequest", false);
                        const replacesEventId = getValue("replacesEventId");

                        // Parse date with fallback
                        let eventDate: Date;
                        let dateString: string;

                        if (dateStr) {
                            eventDate = new Date(dateStr);
                            dateString = dateStr;

                            // Data quality checks for date
                            if (showDebugInfo) {
                                if (isNaN(eventDate.getTime())) {
                                    trackDataQualityIssue(`Event ${item.id} has invalid date: ${dateStr}`);
                                }
                                const now = new Date();
                                const yearDiff = Math.abs(eventDate.getFullYear() - now.getFullYear());
                                if (yearDiff > 2) {
                                    trackDataQualityIssue(
                                        `Event ${item.id} has suspicious date: ${dateStr} (${yearDiff} years from now)`
                                    );
                                }
                            }
                        } else {
                            // Fallback to current date + index for demo purposes
                            eventDate = new Date();
                            eventDate.setDate(eventDate.getDate() + index);
                            dateString = eventDate.toISOString().split("T")[0];

                            if (showDebugInfo) {
                                trackDataQualityIssue(`Event ${item.id} missing date, using fallback: ${dateString}`);
                            }
                        }

                        // Data quality checks
                        if (showDebugInfo) {
                            if (!personId || personId.trim() === "") {
                                trackDataQualityIssue(`Event ${item.id} has empty or missing personId`);
                            }
                            if (!shift || !["M", "E", "N", "D", "H", "T"].includes(shift)) {
                                trackDataQualityIssue(`Event ${item.id} has invalid shift type: ${shift}`);
                            }
                            if (
                                !status ||
                                !["active", "inactive", "pending", "rejected", "planned", "approved", "error"].includes(
                                    status
                                )
                            ) {
                                trackDataQualityIssue(`Event ${item.id} has invalid status: ${status}`);
                            }
                            if (isRequest && !replacesEventId) {
                                trackDataQualityIssue(`Event ${item.id} is a request but has no replacesEventId`);
                            }
                        }

                        return {
                            id: item.id,
                            date: dateString,
                            personId,
                            shift,
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
                        trackProcessingError(errorMsg);
                        return null;
                    }
                })
                .filter((event): event is EventAssignment => event !== null);

            // Additional data quality checks
            if (showDebugInfo && events.length > 0) {
                const personIds = new Set(events.map(e => e.personId));
                const statusCounts = new Map<string, number>();

                events.forEach(event => {
                    statusCounts.set(event.status || "unknown", (statusCounts.get(event.status || "unknown") || 0) + 1);
                });

                if (events.length > 10000) {
                    trackDataQualityIssue(`Large number of events (${events.length}) may impact performance`);
                }
                if (personIds.size > 1000) {
                    trackDataQualityIssue(`Large number of unique persons (${personIds.size}) may impact performance`);
                }
            }

            return events;
        } catch (error) {
            const errorMsg = `Critical error processing events: ${
                error instanceof Error ? error.message : "Unknown error"
            }`;
            trackProcessingError(errorMsg);
            return [];
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventsSource, showDebugInfo]); // trackProcessingError and trackDataQualityIssue excluded to prevent infinite re-renders

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

    // Enhanced helper methods with error handling
    const getEventsForPerson = useCallback(
        (personId: string): EventAssignment[] => {
            try {
                if (showDebugInfo && (!personId || personId.trim() === "")) {
                    trackDataQualityIssue("Attempted to get events for empty personId");
                    return [];
                }
                return dataState.events.filter(event => event.personId === personId);
            } catch (error) {
                if (showDebugInfo) {
                    trackProcessingError(
                        `Error getting events for person ${personId}: ${
                            error instanceof Error ? error.message : "Unknown error"
                        }`
                    );
                }
                return [];
            }
        },
        [dataState.events, trackProcessingError, trackDataQualityIssue, showDebugInfo]
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
                if (showDebugInfo) {
                    if (!personId || personId.trim() === "") {
                        trackDataQualityIssue("Attempted to get event for empty personId");
                        return undefined;
                    }
                    if (!date || date.trim() === "") {
                        trackDataQualityIssue(`Attempted to get event for empty date (person: ${personId})`);
                        return undefined;
                    }
                }
                return dataState.events.find(event => event.personId === personId && event.date === date);
            } catch (error) {
                if (showDebugInfo) {
                    trackProcessingError(
                        `Error getting event for person ${personId} on ${date}: ${
                            error instanceof Error ? error.message : "Unknown error"
                        }`
                    );
                }
                return undefined;
            }
        },
        [dataState.events, trackProcessingError, trackDataQualityIssue, showDebugInfo]
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
                } else if (event.status === "planned") {
                    if (!cellData.plannedEvents) {
                        cellData.plannedEvents = [];
                    }
                    cellData.plannedEvents.push(event);
                } else if (event.status === "approved") {
                    if (!cellData.approvedEvents) {
                        cellData.approvedEvents = [];
                    }
                    cellData.approvedEvents.push(event);
                } else if (event.status === "error") {
                    if (!cellData.errorEvents) {
                        cellData.errorEvents = [];
                    }
                    cellData.errorEvents.push(event);
                }
            }
        } catch (error) {
            // Return empty map on error
        }

        // VERIFICATION EXAMPLES for new event categories:
        //
        // Test data examples to verify planned, approved, and error events are correctly processed:
        //
        // Example 1: Planned Event
        // { id: "test-1", date: "2024-01-15", personId: "person-1", shift: "M", status: "planned" }
        // Should be categorized into: cellData.plannedEvents = [event]
        //
        // Example 2: Approved Event
        // { id: "test-2", date: "2024-01-15", personId: "person-1", shift: "E", status: "approved" }
        // Should be categorized into: cellData.approvedEvents = [event]
        //
        // Example 3: Error Event
        // { id: "test-3", date: "2024-01-15", personId: "person-1", shift: "N", status: "error" }
        // Should be categorized into: cellData.errorEvents = [event]
        //
        // DATA INTEGRITY VALIDATION:
        // The getDayCellData method now includes automatic validation to ensure data consistency.
        //
        // Test cases for validation:
        // 1. Valid data: { id: "test-valid", date: "2024-01-15", personId: "person-1", shift: "M", status: "active" }
        //    Should pass validation silently
        //
        // 2. Invalid personId: { id: "test-invalid", date: "2024-01-15", personId: "wrong-person", shift: "M", status: "active" }
        //    Should log warning: "activeEvent has mismatched personId: expected 'person-1', got 'wrong-person'"
        //
        // 3. Invalid date: { id: "test-invalid-date", date: "2024-01-16", personId: "person-1", shift: "M", status: "planned" }
        //    Should log warning: "plannedEvents[0] has mismatched date: expected '2024-01-15', got '2024-01-16'"
        //
        // Verification steps:
        // 1. Add test events with the above statuses to your microflow
        // 2. Check browser console for cellData in DayCell component (line 22)
        // 3. Verify that getDayCellData(personId, date) returns objects with the new arrays
        // 4. Confirm events are properly categorized and not ignored
        // 5. Test validation by introducing data with wrong personId or date values
        // 6. Check console for validation warnings and debugInfo for data quality issues
        //
        // Before fix: Events with planned/approved/error status were ignored (not categorized)
        // After fix: All events are properly categorized into their respective arrays
        // Validation fix: Data integrity is automatically validated with detailed error reporting

        return map;
    }, [dataState.events]);

    const validateDayCellData = useCallback(
        (cellData: DayCellData, expectedPersonId: string, expectedDate: string): DayCellDataValidationResult => {
            const errors: string[] = [];
            const invalidEvents: EventAssignment[] = [];

            // Helper function to validate a single event
            const validateEvent = (event: EventAssignment | undefined, eventType: string): void => {
                if (!event) {
                    return;
                }

                if (event.personId !== expectedPersonId) {
                    errors.push(
                        `${eventType} has mismatched personId: expected '${expectedPersonId}', got '${event.personId}'`
                    );
                    invalidEvents.push(event);
                }

                if (event.date !== expectedDate) {
                    errors.push(`${eventType} has mismatched date: expected '${expectedDate}', got '${event.date}'`);
                    invalidEvents.push(event);
                }
            };

            // Helper function to validate an array of events
            const validateEventArray = (events: EventAssignment[] | undefined, eventType: string): void => {
                if (!events) {
                    return;
                }

                events.forEach((event, index) => {
                    validateEvent(event, `${eventType}[${index}]`);
                });
            };

            // Validate single events
            validateEvent(cellData.activeEvent, "activeEvent");
            validateEvent(cellData.pendingRequest, "pendingRequest");

            // Validate event arrays
            validateEventArray(cellData.inactiveEvents, "inactiveEvents");
            validateEventArray(cellData.rejectedRequests, "rejectedRequests");
            validateEventArray(cellData.plannedEvents, "plannedEvents");
            validateEventArray(cellData.approvedEvents, "approvedEvents");
            validateEventArray(cellData.errorEvents, "errorEvents");

            return {
                isValid: errors.length === 0,
                errors,
                invalidEvents
            };
        },
        []
    );

    const getDayCellData = useCallback(
        (personId: string, date: string): DayCellData => {
            const key = `${personId}-${date}`;
            const cellData = dayCellDataMap.get(key) || {};

            // Validate data integrity - controlled by widget debug configuration
            const shouldValidate = showDebugInfo;
            if (shouldValidate) {
                const validation = validateDayCellData(cellData, personId, date);
                if (!validation.isValid) {
                    console.warn(
                        `DayCellData validation failed for ${personId}-${date}:`,
                        validation.errors,
                        "Invalid events:",
                        validation.invalidEvents
                    );

                    // Track data quality issues for debugging
                    trackDataQualityIssue?.(
                        `DayCellData validation failed for ${personId}-${date}: ${validation.errors.join(", ")}`
                    );
                }
            }

            return cellData;
        },
        [dayCellDataMap, validateDayCellData, trackDataQualityIssue]
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
                if (showDebugInfo) {
                    if (!startDate || !endDate) {
                        trackDataQualityIssue("Attempted to get events for empty date range");
                        return [];
                    }
                    if (startDate > endDate) {
                        trackDataQualityIssue(`Invalid date range: start (${startDate}) is after end (${endDate})`);
                        return [];
                    }
                }
                return dataState.events.filter(event => event.date >= startDate && event.date <= endDate);
            } catch (error) {
                if (showDebugInfo) {
                    trackProcessingError(
                        `Error getting events for date range ${startDate} to ${endDate}: ${
                            error instanceof Error ? error.message : "Unknown error"
                        }`
                    );
                }
                return [];
            }
        },
        [dataState.events, trackProcessingError, trackDataQualityIssue, showDebugInfo]
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

    // Get all team capacities for multiple dates with comprehensive error tracking
    const getAllTeamCapacities = useCallback(
        (_dates: string[]): TeamCapacity[] => {
            if (!teamCapacitiesSource || teamCapacitiesSource.status !== "available" || !teamCapacitiesSource.items) {
                if (showDebugInfo && teamCapacitiesSource && teamCapacitiesSource.status !== "loading") {
                    trackProcessingError(`Team capacities source not available: ${teamCapacitiesSource.status}`);
                }
                return [];
            }

            try {
                const capacities = teamCapacitiesSource.items.map((item: ObjectItem, index: number) => {
                    try {
                        // Extract team capacity data from microflow - expects standardized field names
                        const getValue = (fieldName: string, fallback: any = null): any => {
                            try {
                                const attr = (item as any)[fieldName];
                                return attr?.value || attr || fallback;
                            } catch {
                                return fallback;
                            }
                        };

                        const teamName = getValue("teamName", "");
                        const isNXT = getValue("isNXT", false);
                        const date = getValue("date", "");
                        const weekNumber = getValue("weekNumber", 0);
                        const percentage = getValue("percentage", 0);
                        const target = getValue("target", 0);
                        const meetsTarget = getValue("meetsTarget", percentage >= target);

                        // Data quality checks
                        if (showDebugInfo) {
                            if (!teamName || teamName.trim() === "") {
                                trackDataQualityIssue(`Team capacity ${item.id} has empty or missing teamName`);
                            }
                            if (!date || date.trim() === "") {
                                trackDataQualityIssue(
                                    `Team capacity ${item.id} (${teamName}) has empty or missing date`
                                );
                            }
                            if (percentage < 0 || percentage > 100) {
                                trackDataQualityIssue(
                                    `Team capacity ${item.id} (${teamName}) has invalid percentage: ${percentage}`
                                );
                            }
                            if (target < 0 || target > 100) {
                                trackDataQualityIssue(
                                    `Team capacity ${item.id} (${teamName}) has invalid target: ${target}`
                                );
                            }
                            if (weekNumber < 1 || weekNumber > 53) {
                                trackDataQualityIssue(
                                    `Team capacity ${item.id} (${teamName}) has invalid weekNumber: ${weekNumber}`
                                );
                            }

                            // Parse date for additional validation
                            const capacityDate = new Date(date);
                            if (isNaN(capacityDate.getTime())) {
                                trackDataQualityIssue(
                                    `Team capacity ${item.id} (${teamName}) has invalid date format: ${date}`
                                );
                            }
                        }

                        return {
                            teamName,
                            isNXT,
                            date,
                            weekNumber,
                            percentage,
                            target,
                            meetsTarget
                        } as TeamCapacity;
                    } catch (error) {
                        const errorMsg = `Failed to process team capacity ${index}: ${
                            error instanceof Error ? error.message : "Unknown error"
                        }`;
                        trackProcessingError(errorMsg);

                        // Return minimal fallback capacity
                        return {
                            teamName: "Unknown",
                            isNXT: false,
                            date: "",
                            weekNumber: 0,
                            percentage: 0,
                            target: 0,
                            meetsTarget: false
                        } as TeamCapacity;
                    }
                });

                return capacities;
            } catch (error) {
                const errorMsg = `Failed to process team capacities: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`;
                trackProcessingError(errorMsg);
                return [];
            }
        },
        [teamCapacitiesSource, trackProcessingError, trackDataQualityIssue, showDebugInfo]
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
