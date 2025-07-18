import { useMemo } from "react";
import { ListValue, ObjectItem, ListAttributeValue } from "mendix";
import { EventAssignment } from "../types/shiftScheduler";
import {
    extractEventData,
    validateEventDate,
    validateEventDataQuality,
    createEventAssignment
} from "../utils/eventProcessing";

export interface UseEventsTransformProps {
    eventsSource?: ListValue;
    eventDateAttribute?: ListAttributeValue<string>;
    eventPersonIdAttribute?: ListAttributeValue<string>;
    eventTypeAttribute?: ListAttributeValue<string>;
    eventStatusAttribute?: ListAttributeValue<string>;
    eventIsRequestAttribute?: ListAttributeValue<boolean>;
    eventReplacesEventIdAttribute?: ListAttributeValue<string>;
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
    eventDateAttribute,
    eventPersonIdAttribute,
    eventTypeAttribute,
    eventStatusAttribute,
    eventIsRequestAttribute,
    eventReplacesEventIdAttribute,
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
                        // Extract event data from microflow using attribute references
                        const eventData = extractEventData(item, {
                            eventDateAttribute,
                            eventPersonIdAttribute,
                            eventTypeAttribute,
                            eventStatusAttribute,
                            eventIsRequestAttribute,
                            eventReplacesEventIdAttribute
                        });

                        // Validate date - filter out events with missing or invalid dates
                        const dateValidation = validateEventDate(
                            eventData.dateStr,
                            item.id,
                            showDebugInfo,
                            trackDataQualityIssue
                        );

                        if (!dateValidation.isValid) {
                            return null;
                        }

                        // Perform data quality validation
                        validateEventDataQuality(eventData, item.id, showDebugInfo, trackDataQualityIssue);

                        // Create and return event assignment
                        return createEventAssignment(item, eventData, dateValidation);
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
    }, [
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
    ]);

    return { events: transformedEvents };
};
