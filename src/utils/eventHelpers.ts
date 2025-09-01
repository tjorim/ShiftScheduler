import dayjs, { formatISODate } from "./dateHelpers";
import { EventAssignment } from "../types/shiftScheduler";

// Delimiter constant for composite keys - chosen to avoid common character conflicts
export const COMPOSITE_KEY_DELIMITER = "::" as const;

// Timeline configuration constants
export const DEFAULT_EXTENSION_DAYS = 30; // Aligns with 30-day block guideline
export const DAY_COLUMN_WIDTH = 80; // Width in pixels for each day column in timeline (matches --day-column-width in CSS)

// Department constants for consistent usage across components
export const DEPARTMENT = {
    XT: "XT" as const,
    NXT: "NXT" as const
} as const;

/**
 * Builds a composite key from multiple parts using "::" delimiter
 * to prevent collisions with hyphenated names or date formats.
 * Guards against delimiter collisions by escaping any "::" in parts to ":::"
 */
export const buildCompositeKey = (...parts: string[]): string =>
    parts.map(part => part.split(COMPOSITE_KEY_DELIMITER).join(":::")).join(COMPOSITE_KEY_DELIMITER);

// Event color mappings
export const EVENT_COLORS = {
    M: "#2196F3", // Morning - Blue
    E: "#4CAF50", // Evening - Green
    N: "#FF9800", // Night - Orange
    D: "#F44336", // Day shift (9-17) - Red
    H: "#9E9E9E", // Holiday/day off - Gray
    T: "#FFEB3B", // Training - Yellow
    LTF: "#9C27B0" // Long term flex - Purple
} as const;

// Role indicators
export const ROLE_STYLES = {
    TL: "solid", // Team Leader - solid border
    BTL: "dashed", // Backup Team Leader - dashed border
    SPE: "dotted", // Specialist - dotted border
    OSI: "double" // Other - double border
} as const;

export type EventType = keyof typeof EVENT_COLORS;
export type RoleType = keyof typeof ROLE_STYLES;

/**
 * Get the color for an event type
 * Handles both simple types (M, E, N) and complex types (M.SPE, E.TL, etc.)
 * by extracting the base shift type from the event type
 */
export const getEventColor = (eventType: string): string => {
    // Extract base type from complex event types (e.g., "M.SPE" -> "M", "E.TL" -> "E")
    const baseType = eventType.split(".")[0];
    return EVENT_COLORS[baseType as keyof typeof EVENT_COLORS] || "#607D8B"; // Default gray-blue
};

/**
 * Get CSS classes for an event based on event type and status
 * Combines base event class with status pattern classes
 * Handles complex event types by extracting base type for CSS class
 */
export const getEventCssClasses = (eventType: string, status?: string): string => {
    // Extract base type for CSS class (e.g., "M.SPE" -> "M", "E.TL" -> "E")
    const baseType = eventType.split(".")[0];
    const baseClass = `event-${baseType.toLowerCase()}`;
    const statusClasses: string[] = [];

    // Add status-based pattern classes
    if (status === "New" || status === "requested") {
        statusClasses.push("event-requested");
    } else if (status === "TBD") {
        statusClasses.push("event-tbd");
    }
    // Active/approved events use base class only (solid colors)

    return [baseClass, ...statusClasses].join(" ");
};

/**
 * Extract role from complex event type
 * E.g., "M.SPE" -> "SPE", "E.TL" -> "TL", "H" -> undefined
 */
export const extractRoleFromEventType = (eventType: string): string | undefined => {
    const parts = eventType.split(".");
    return parts.length > 1 ? parts[1] : undefined;
};

/**
 * Get the border style for a role
 */
export const getRoleBorderStyle = (role?: string): string => {
    if (!role) {
        return "solid";
    }
    return ROLE_STYLES[role as RoleType] || "solid";
};

/**
 * Check if an event is a working event (not holiday)
 */
export const isWorkingEvent = (eventType: string): boolean => {
    return !["H"].includes(eventType);
};

/**
 * Get event display name
 */
export const getEventDisplayName = (eventType: string): string => {
    const names = {
        M: "Morning",
        E: "Evening",
        N: "Night",
        D: "Day Shift",
        H: "Holiday",
        T: "Training",
        LTF: "Long Term Flex"
    };
    return names[eventType as EventType] || eventType;
};

/**
 * Get short display text for an event (used in day cells)
 */
export const getEventDisplayText = (eventType: string): string => {
    return eventType || "?";
};

/**
 * Validate shift assignment rules
 */
export const validateEventAssignment = (
    assignment: Partial<EventAssignment>,
    existingEvents: EventAssignment[]
): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Basic required fields validation
    const requiredFields: Array<keyof EventAssignment> = ["date", "personId", "eventType"];
    requiredFields.forEach(field => {
        if (!assignment[field]) {
            errors.push(`Missing required field: ${field}`);
        }
    });
    if (errors.length > 0) {
        return { isValid: false, errors };
    }

    // Check for overlapping events on same date
    const sameDate = existingEvents.filter(
        e => e.date === assignment.date && e.personId === assignment.personId && e.id !== assignment.id
    );

    if (sameDate.length > 0) {
        errors.push("Person already has an event assigned for this date");
    }

    // Check night event followed by morning event (insufficient rest)
    // Extract base shift type for rest period validation
    const baseShiftType = assignment.eventType?.split(".")[0];
    if (baseShiftType === "M") {
        const currentDate = dayjs(assignment.date);
        const previousDay = currentDate.subtract(1, "day");
        const prevDayString = formatISODate(previousDay.toDate());

        const prevNightEvent = existingEvents.find(
            e => e.date === prevDayString && e.personId === assignment.personId && e.eventType.split(".")[0] === "N"
        );

        if (prevNightEvent) {
            errors.push("Insufficient rest: Night event followed by Morning event");
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Get event statistics for a person over a date range
 */
export const getEventStats = (
    personId: string,
    events: EventAssignment[],
    startDate: string,
    endDate: string
): {
    total: number;
    morning: number;
    evening: number;
    night: number;
    day: number;
    holiday: number;
    training: number;
    longTermFlex: number;
} => {
    const personEvents = events.filter(e => e.personId === personId && e.date >= startDate && e.date <= endDate);

    const stats = {
        total: personEvents.length,
        morning: 0,
        evening: 0,
        night: 0,
        day: 0,
        holiday: 0,
        training: 0,
        longTermFlex: 0
    };

    personEvents.forEach(event => {
        // Extract base shift type for statistics (e.g., "M.SPE" -> "M", "E.TL" -> "E")
        const baseShiftType = event.eventType.split(".")[0];
        switch (baseShiftType) {
            case "M":
                stats.morning++;
                break;
            case "E":
                stats.evening++;
                break;
            case "N":
                stats.night++;
                break;
            case "D":
                stats.day++;
                break;
            case "H":
                stats.holiday++;
                break;
            case "T":
                stats.training++;
                break;
            case "LTF":
                stats.longTermFlex++;
                break;
        }
    });

    return stats;
};
