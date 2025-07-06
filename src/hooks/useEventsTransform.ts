import { useMemo } from "react";
import { ListValue, ObjectItem } from "mendix";
import { EventAssignment, ShiftType } from "../types/shiftScheduler";

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

    return { events: transformedEvents };
};
