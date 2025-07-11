import dayjs from "./dateHelpers";
import { ObjectItem } from "mendix";
import { EventAssignment, EventType, isValidEventStatus, isValidEventType } from "../types/shiftScheduler";
import { createTypedValueExtractor } from "./mendixDataExtraction";

/**
 * Extracted event data from Mendix ObjectItem
 */
export interface ExtractedEventData {
    dateStr: string;
    personId: string;
    eventType: EventType;
    status: string;
    isRequest: boolean;
    replacesEventId: string;
}

/**
 * Date validation result
 */
export interface DateValidationResult {
    isValid: boolean;
    date?: Date;
    dateString?: string;
    errorMessage?: string;
}

/**
 * Extract basic event data from Mendix ObjectItem
 */
export const extractEventData = (item: ObjectItem): ExtractedEventData => {
    const { getString, getBoolean } = createTypedValueExtractor(item);

    const eventTypeValue = getString("eventType", "M");

    return {
        dateStr: getString("date"),
        personId: getString("personId", item.id),
        eventType: isValidEventType(eventTypeValue) ? eventTypeValue : "M",
        status: getString("status", "planned"),
        isRequest: getBoolean("isRequest", false),
        replacesEventId: getString("replacesEventId")
    };
};

/**
 * Validate and parse event date
 */
export const validateEventDate = (
    dateStr: string,
    eventId: string,
    showDebugInfo: boolean,
    trackDataQualityIssue?: (issue: string) => void
): DateValidationResult => {
    // Check for missing date
    if (!dateStr) {
        const errorMessage = `Event ${eventId} missing date - filtering out event`;
        if (showDebugInfo && trackDataQualityIssue) {
            trackDataQualityIssue(errorMessage);
        }
        return { isValid: false, errorMessage };
    }

    // Parse and validate date
    const eventDate = dayjs(dateStr);
    if (!eventDate.isValid()) {
        const errorMessage = `Event ${eventId} has invalid date: ${dateStr} - filtering out event`;
        if (showDebugInfo && trackDataQualityIssue) {
            trackDataQualityIssue(errorMessage);
        }
        return { isValid: false, errorMessage };
    }

    // Check for suspicious dates (more than 2 years from now)
    if (showDebugInfo && trackDataQualityIssue) {
        const now = dayjs();
        const yearDiff = Math.abs(eventDate.year() - now.year());
        if (yearDiff > 2) {
            trackDataQualityIssue(`Event ${eventId} has suspicious date: ${dateStr} (${yearDiff} years from now)`);
        }
    }

    return {
        isValid: true,
        date: eventDate.toDate(),
        dateString: dateStr
    };
};

/**
 * Perform data quality validation on extracted event data
 */
export const validateEventDataQuality = (
    data: ExtractedEventData,
    eventId: string,
    showDebugInfo: boolean,
    trackDataQualityIssue?: (issue: string) => void
): void => {
    if (!showDebugInfo || !trackDataQualityIssue) {
        return;
    }

    // Validate personId
    if (!data.personId || data.personId.trim() === "") {
        trackDataQualityIssue(`Event ${eventId} has empty or missing personId`);
    }

    // Validate event type
    if (!data.eventType || !isValidEventType(data.eventType)) {
        trackDataQualityIssue(`Event ${eventId} has invalid event type: ${data.eventType}`);
    }

    // Validate status
    if (!data.status || !isValidEventStatus(data.status)) {
        trackDataQualityIssue(`Event ${eventId} has invalid status: ${data.status}`);
    }

    // Validate request-specific data
    if (data.isRequest && !data.replacesEventId) {
        trackDataQualityIssue(`Event ${eventId} is a request but has no replacesEventId`);
    }
};

/**
 * Transform extracted and validated data into EventAssignment
 * PRECONDITION: dateValidation must be valid (dateValidation.isValid === true)
 * and have non-null date and dateString properties
 */
export const createEventAssignment = (
    item: ObjectItem,
    data: ExtractedEventData,
    dateValidation: DateValidationResult
): EventAssignment => {
    // Explicit runtime checks to replace unsafe non-null assertions
    if (!dateValidation.dateString) {
        throw new Error(`Cannot create EventAssignment for ${item.id}: dateValidation.dateString is null or undefined`);
    }

    if (!dateValidation.date) {
        throw new Error(`Cannot create EventAssignment for ${item.id}: dateValidation.date is null or undefined`);
    }

    return {
        id: item.id,
        date: dateValidation.dateString,
        personId: data.personId,
        eventType: data.eventType,
        status: isValidEventStatus(data.status) ? data.status : undefined,
        isRequest: data.isRequest,
        replacesEventId: data.replacesEventId,
        shiftDate: dateValidation.date,
        mendixObject: item
    };
};
