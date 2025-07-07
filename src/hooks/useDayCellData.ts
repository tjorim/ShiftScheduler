import { useMemo, useCallback } from "react";
import { EventAssignment, DayCellData, DayCellDataValidationResult } from "../types/shiftScheduler";
import { createDayCellDataMap } from "../utils/eventCategorization";
import { validateDayCellData } from "../utils/dayCellValidation";

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
                        const invalidEventSet = new Set(validation.invalidEvents);

                        // Filter single events
                        if (cellData.activeEvent && invalidEventSet.has(cellData.activeEvent)) {
                            cellData.activeEvent = undefined;
                        }
                        if (cellData.pendingRequest && invalidEventSet.has(cellData.pendingRequest)) {
                            cellData.pendingRequest = undefined;
                        }

                        // Filter event arrays
                        const arrayFields: Array<keyof DayCellData> = [
                            "inactiveEvents",
                            "rejectedRequests",
                            "plannedEvents",
                            "approvedEvents",
                            "errorEvents"
                        ];

                        arrayFields.forEach(field => {
                            const events = cellData[field] as EventAssignment[] | undefined;
                            if (events) {
                                (cellData[field] as EventAssignment[]) = events.filter(e => !invalidEventSet.has(e));
                            }
                        });
                    }
                }
            }

            return cellData;
        },
        [dayCellDataMap, showDebugInfo, trackDataQualityIssue]
    );

    return {
        getDayCellData,
        validateDayCellData
    };
};
