import { Person, EventAssignment } from "../types/shiftScheduler";

/**
 * Utility functions for querying transformed data
 * These are pure functions that can be easily tested in isolation
 */

export const getEventsForPerson = (
    events: EventAssignment[],
    personId: string,
    showDebugInfo = false,
    trackDataQualityIssue?: (issue: string) => void,
    trackProcessingError?: (error: string) => void
): EventAssignment[] => {
    try {
        if (showDebugInfo && (!personId || personId.trim() === "")) {
            trackDataQualityIssue?.("Attempted to get events for empty personId");
            return [];
        }
        return events.filter(event => event.personId === personId);
    } catch (error) {
        if (showDebugInfo) {
            trackProcessingError?.(
                `Error getting events for person ${personId}: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        }
        return [];
    }
};

export const getPeopleByTeam = (
    people: Person[],
    showDebugInfo = false,
    trackProcessingError?: (error: string) => void
): { [team: string]: Person[] } => {
    try {
        const teamGroups: { [team: string]: Person[] } = {};
        people.forEach(person => {
            const teamName = person.team;
            if (!teamGroups[teamName]) {
                teamGroups[teamName] = [];
            }
            teamGroups[teamName].push(person);
        });
        return teamGroups;
    } catch (error) {
        if (showDebugInfo) {
            trackProcessingError?.(
                `Error grouping people by team: ${error instanceof Error ? error.message : "Unknown error"}`
            );
        }
        return {};
    }
};

export const getEventForDate = (
    events: EventAssignment[],
    personId: string,
    date: string,
    showDebugInfo = false,
    trackDataQualityIssue?: (issue: string) => void,
    trackProcessingError?: (error: string) => void
): EventAssignment | undefined => {
    try {
        if (showDebugInfo) {
            if (!personId || personId.trim() === "") {
                trackDataQualityIssue?.("Attempted to get event for empty personId");
                return undefined;
            }
            if (!date || date.trim() === "") {
                trackDataQualityIssue?.(`Attempted to get event for empty date (person: ${personId})`);
                return undefined;
            }
        }
        return events.find(event => event.personId === personId && event.date === date);
    } catch (error) {
        if (showDebugInfo) {
            trackProcessingError?.(
                `Error getting event for person ${personId} on ${date}: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        }
        return undefined;
    }
};

export const getPersonById = (
    people: Person[],
    personId: string,
    showDebugInfo = false,
    trackDataQualityIssue?: (issue: string) => void
): Person | undefined => {
    try {
        if (showDebugInfo && (!personId || personId.trim() === "")) {
            trackDataQualityIssue?.("Attempted to find person with empty ID");
            return undefined;
        }
        return people.find(person => person.id === personId);
    } catch (error) {
        if (showDebugInfo) {
            trackDataQualityIssue?.(
                `Error finding person by ID ${personId}: ${error instanceof Error ? error.message : "Unknown error"}`
            );
        }
        return undefined;
    }
};

export const getEventsByDateRange = (
    events: EventAssignment[],
    startDate: string,
    endDate: string,
    showDebugInfo = false,
    trackDataQualityIssue?: (issue: string) => void,
    trackProcessingError?: (error: string) => void
): EventAssignment[] => {
    try {
        if (showDebugInfo) {
            if (!startDate || !endDate) {
                trackDataQualityIssue?.("Attempted to get events for empty date range");
                return [];
            }
            if (startDate > endDate) {
                trackDataQualityIssue?.(`Invalid date range: start (${startDate}) is after end (${endDate})`);
                return [];
            }
        }
        return events.filter(event => event.date >= startDate && event.date <= endDate);
    } catch (error) {
        if (showDebugInfo) {
            trackProcessingError?.(
                `Error getting events for date range ${startDate} to ${endDate}: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        }
        return [];
    }
};
