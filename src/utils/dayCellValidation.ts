import { DayCellData, DayCellDataValidationResult, EventAssignment } from "../types/shiftScheduler";

/**
 * Validates day cell data integrity by checking that all events belong to the expected person and date
 */
export const validateDayCellData = (
    cellData: DayCellData,
    expectedPersonId: string,
    expectedDate: string
): DayCellDataValidationResult => {
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

    return {
        isValid: errors.length === 0,
        errors,
        invalidEvents
    };
};
