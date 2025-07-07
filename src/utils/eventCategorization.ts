import { EventAssignment, DayCellData } from "../types/shiftScheduler";

/**
 * Configuration for event categorization rules
 */
type CategoryConfig = {
    condition: (event: EventAssignment) => boolean;
    action: (event: EventAssignment, cellData: DayCellData) => void;
};

/**
 * Declarative categorization rules for events
 */
const categoryConfigs: CategoryConfig[] = [
    {
        condition: e => e.status === "active" && !e.isRequest,
        action: (e, cellData) => {
            cellData.activeEvent = e;
        }
    },
    {
        condition: e => e.status === "pending" && !!e.isRequest,
        action: (e, cellData) => {
            cellData.pendingRequest = e;
        }
    },
    {
        condition: e => e.status === "inactive",
        action: (e, cellData) => {
            if (!cellData.inactiveEvents) {
                cellData.inactiveEvents = [];
            }
            cellData.inactiveEvents.push(e);
        }
    },
    {
        condition: e => e.status === "rejected" && !!e.isRequest,
        action: (e, cellData) => {
            if (!cellData.rejectedRequests) {
                cellData.rejectedRequests = [];
            }
            cellData.rejectedRequests.push(e);
        }
    },
    {
        condition: e => e.status === "planned",
        action: (e, cellData) => {
            if (!cellData.plannedEvents) {
                cellData.plannedEvents = [];
            }
            cellData.plannedEvents.push(e);
        }
    },
    {
        condition: e => e.status === "approved",
        action: (e, cellData) => {
            if (!cellData.approvedEvents) {
                cellData.approvedEvents = [];
            }
            cellData.approvedEvents.push(e);
        }
    },
    {
        condition: e => e.status === "error",
        action: (e, cellData) => {
            if (!cellData.errorEvents) {
                cellData.errorEvents = [];
            }
            cellData.errorEvents.push(e);
        }
    }
];

/**
 * Categorizes an event into the appropriate DayCellData property using declarative configuration
 * Centralizes the event categorization logic used across multiple hooks
 */
export const categorizeEventIntoCellData = (event: EventAssignment, cellData: DayCellData): void => {
    const config = categoryConfigs.find(c => c.condition(event));
    if (config) {
        config.action(event, cellData);
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
