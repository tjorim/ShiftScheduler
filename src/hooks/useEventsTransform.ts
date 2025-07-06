import { useMemo } from "react";
import { ListValue, ObjectItem } from "mendix";
import { EventAssignment, ShiftType, isValidShiftStatus, isValidShiftType } from "../types/shiftScheduler";
import { createTypedValueExtractor } from "../utils/mendixDataExtraction";

export interface UseEventsTransformProps {
    eventsSource?: ListValue;
    showDebugInfo?: boolean;
    trackProcessingError: (error: string) => void;
    trackDataQualityIssue: (issue: string) => void;
}

export interface UseEventsTransformReturn {
    events: EventAssignment[];
}

/**
 * Custom hook for transforming Mendix events data with comprehensive error handling
 * Expects microflow to return objects with standardized field names: date, personId, shift, status, etc.
 */
export const useEventsTransform = ({
    eventsSource,
    showDebugInfo = false,
    trackProcessingError,
    trackDataQualityIssue
}: UseEventsTransformProps): UseEventsTransformReturn => {
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
                        // Extract event data from microflow using utility function
                        const { getString, getBoolean } = createTypedValueExtractor(item);

                        const dateStr = getString("date");
                        const personId = getString("personId", item.id);
                        const shift = getString("shift", "M") as ShiftType;
                        const status = getString("status", "planned");
                        const isRequest = getBoolean("isRequest", false);
                        const replacesEventId = getString("replacesEventId");

                        // Parse and validate date - filter out events with missing or invalid dates
                        if (!dateStr) {
                            if (showDebugInfo) {
                                trackDataQualityIssue(`Event ${item.id} missing date - filtering out event`);
                            }
                            return null;
                        }

                        const eventDate = new Date(dateStr);
                        if (isNaN(eventDate.getTime())) {
                            if (showDebugInfo) {
                                trackDataQualityIssue(
                                    `Event ${item.id} has invalid date: ${dateStr} - filtering out event`
                                );
                            }
                            return null;
                        }

                        const dateString = dateStr;

                        // Additional data quality checks for date
                        if (showDebugInfo) {
                            const now = new Date();
                            const yearDiff = Math.abs(eventDate.getFullYear() - now.getFullYear());
                            if (yearDiff > 2) {
                                trackDataQualityIssue(
                                    `Event ${item.id} has suspicious date: ${dateStr} (${yearDiff} years from now)`
                                );
                            }
                        }

                        // Data quality checks using type guards
                        if (showDebugInfo) {
                            if (!personId || personId.trim() === "") {
                                trackDataQualityIssue(`Event ${item.id} has empty or missing personId`);
                            }
                            if (!shift || !isValidShiftType(shift)) {
                                trackDataQualityIssue(`Event ${item.id} has invalid shift type: ${shift}`);
                            }
                            if (!status || !isValidShiftStatus(status)) {
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
    }, [eventsSource, showDebugInfo, trackProcessingError, trackDataQualityIssue]);

    return { events: transformedEvents };
};
