import { useMemo } from "react";
import { ListValue, ObjectItem } from "mendix";
import { Person } from "../types/shiftScheduler";

export interface UsePeopleTransformProps {
    peopleSource: ListValue;
    showDebugInfo?: boolean;
    trackProcessingError: (error: string) => void;
    trackDataQualityIssue: (issue: string) => void;
}

export interface UsePeopleTransformReturn {
    people: Person[];
}

/**
 * Custom hook for transforming Mendix people data with comprehensive error handling
 * Expects microflow to return objects with standardized field names: id, name, team, lane
 */
export const usePeopleTransform = ({
    peopleSource,
    showDebugInfo = false,
    trackProcessingError,
    trackDataQualityIssue
}: UsePeopleTransformProps): UsePeopleTransformReturn => {
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

    return { people: transformedPeople };
};
