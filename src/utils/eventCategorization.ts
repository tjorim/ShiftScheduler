import { EventAssignment, DayCellData } from "../types/shiftScheduler";

/**
 * Categorizes an event into the appropriate DayCellData property
 * Centralizes the event categorization logic used across multiple hooks
 */
export const categorizeEventIntoCellData = (event: EventAssignment, cellData: DayCellData): void => {
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
};

/**
 * Creates a Map of DayCellData from an array of events
 * Uses the centralized categorization logic for consistency
 */
export const createDayCellDataMap = (
    events: EventAssignment[],
    onError?: (error: string) => void
): Map<string, DayCellData> => {
    const map = new Map<string, DayCellData>();

    try {
        for (const event of events) {
            const key = `${event.personId}-${event.date}`;
            if (!map.has(key)) {
                map.set(key, {});
            }
            const cellData = map.get(key)!;
            categorizeEventIntoCellData(event, cellData);
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        if (onError) {
            onError(`Failed to build dayCellDataMap: ${errorMessage}`);
        }
        // Return empty map on error to ensure no incomplete data is returned
        return new Map<string, DayCellData>();
    }

    return map;
};
