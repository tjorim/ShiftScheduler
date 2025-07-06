import { useMemo, useCallback } from "react";
import { EventAssignment, DayCellData, DayCellDataValidationResult } from "../types/shiftScheduler";
import { createDayCellDataMap } from "../utils/eventCategorization";

export interface UseDayCellDataProps {
    events: EventAssignment[];
    showDebugInfo?: boolean;
    trackDataQualityIssue?: (issue: string) => void;
}

export interface UseDayCellDataReturn {
    getDayCellData: (personId: string, date: string) => DayCellData;
    validateDayCellData: (
        cellData: DayCellData,
        expectedPersonId: string,
        expectedDate: string
    ) => DayCellDataValidationResult;
}

/**
 * Custom hook for managing day cell data with memoized lookup and validation
 * Efficiently organizes events by person/date and provides data integrity validation
 */
export const useDayCellData = ({
    events,
    showDebugInfo = false,
    trackDataQualityIssue
}: UseDayCellDataProps): UseDayCellDataReturn => {
    // Memoized lookup map for efficient day cell data retrieval using utility function
    const dayCellDataMap = useMemo(() => {
        const onError = showDebugInfo && trackDataQualityIssue ? trackDataQualityIssue : undefined;
        return createDayCellDataMap(events, onError);
    }, [events, showDebugInfo, trackDataQualityIssue]);

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

            // Helper function to validate event arrays
            const validateEventArray = (eventArray: EventAssignment[] | undefined, arrayName: string): void => {
                if (!eventArray) {
                    return;
                }

                eventArray.forEach((event, index) => {
                    validateEvent(event, `${arrayName}[${index}]`);
                });
            };

            // Validate all event types
            validateEvent(cellData.activeEvent, "activeEvent");
            validateEvent(cellData.pendingRequest, "pendingRequest");
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
            let cellData = dayCellDataMap.get(key) || {};

            // Validate data integrity in debug mode
            if (showDebugInfo && trackDataQualityIssue) {
                const validation = validateDayCellData(cellData, personId, date);
                if (!validation.isValid) {
                    validation.errors.forEach(error => {
                        trackDataQualityIssue(`Day cell data validation error for ${personId} on ${date}: ${error}`);
                    });

                    // Filter out invalid events to prevent further errors
                    cellData = { ...cellData };
                    if (validation.invalidEvents.length > 0) {
                        // Remove invalid events from the returned data
                        validation.invalidEvents.forEach(invalidEvent => {
                            if (cellData.activeEvent === invalidEvent) {
                                cellData.activeEvent = undefined;
                            }
                            if (cellData.pendingRequest === invalidEvent) {
                                cellData.pendingRequest = undefined;
                            }
                            if (cellData.inactiveEvents) {
                                cellData.inactiveEvents = cellData.inactiveEvents.filter(e => e !== invalidEvent);
                            }
                            if (cellData.rejectedRequests) {
                                cellData.rejectedRequests = cellData.rejectedRequests.filter(e => e !== invalidEvent);
                            }
                            if (cellData.plannedEvents) {
                                cellData.plannedEvents = cellData.plannedEvents.filter(e => e !== invalidEvent);
                            }
                            if (cellData.approvedEvents) {
                                cellData.approvedEvents = cellData.approvedEvents.filter(e => e !== invalidEvent);
                            }
                            if (cellData.errorEvents) {
                                cellData.errorEvents = cellData.errorEvents.filter(e => e !== invalidEvent);
                            }
                        });
                    }
                }
            }

            return cellData;
        },
        [dayCellDataMap, showDebugInfo, trackDataQualityIssue, validateDayCellData]
    );

    return {
        getDayCellData,
        validateDayCellData
    };
};
