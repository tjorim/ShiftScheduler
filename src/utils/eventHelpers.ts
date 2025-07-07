import { EventAssignment } from "../types/shiftScheduler";

// Event color mappings
export const EVENT_COLORS = {
    M: "#2196F3", // Morning - Blue
    E: "#4CAF50", // Evening - Green
    N: "#FF9800", // Night - Orange
    D: "#F44336", // Day off - Red
    H: "#9E9E9E", // Holiday - Gray
    T: "#FFEB3B" // Training - Yellow
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
 */
export const getEventColor = (eventType: string): string => {
    return EVENT_COLORS[eventType as EventType] || "#607D8B"; // Default gray-blue
};

/**
 * Get CSS classes for an event based on shift type and status
 * Combines base shift class with status pattern classes
 */
export const getEventCssClasses = (eventType: string, status?: string): string => {
    const baseClass = `event-${eventType.toLowerCase()}`;
    const statusClasses: string[] = [];

    // Add status-based pattern classes
    if (status === "pending" || status === "requested") {
        statusClasses.push("event-requested");
    } else if (status === "tbd") {
        statusClasses.push("event-tbd");
    }
    // Active/approved events use base class only (solid colors)

    return [baseClass, ...statusClasses].join(" ");
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
 * Check if an event is a working event (not day off or holiday)
 */
export const isWorkingEvent = (eventType: string): boolean => {
    return !["D", "H"].includes(eventType);
};

/**
 * Get event display name
 */
export const getEventDisplayName = (eventType: string): string => {
    const names = {
        M: "Morning",
        E: "Evening",
        N: "Night",
        D: "Day Off",
        H: "Holiday",
        T: "Training"
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

    // Check for overlapping events on same date
    const sameDate = existingEvents.filter(
        e => e.date === assignment.date && e.personId === assignment.personId && e.id !== assignment.id
    );

    if (sameDate.length > 0) {
        errors.push("Person already has an event assigned for this date");
    }

    // Check night event followed by morning event (insufficient rest)
    if (assignment.shift === "M") {
        const previousDay = new Date(assignment.date!);
        previousDay.setDate(previousDay.getDate() - 1);
        const prevDayString = previousDay.toISOString().split("T")[0];

        const prevNightEvent = existingEvents.find(
            e => e.date === prevDayString && e.personId === assignment.personId && e.shift === "N"
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
    dayOff: number;
    holiday: number;
    training: number;
} => {
    const personEvents = events.filter(e => e.personId === personId && e.date >= startDate && e.date <= endDate);

    const stats = {
        total: personEvents.length,
        morning: 0,
        evening: 0,
        night: 0,
        dayOff: 0,
        holiday: 0,
        training: 0
    };

    personEvents.forEach(event => {
        switch (event.shift) {
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
                stats.dayOff++;
                break;
            case "H":
                stats.holiday++;
                break;
            case "T":
                stats.training++;
                break;
        }
    });

    return stats;
};

/**
 * Generate CSS class names for a shift cell
 */
export const getEventCSSClasses = (event?: EventAssignment): string => {
    if (!event) {
        return "day-cell empty";
    }

    const classes = ["day-cell", "has-event"];

    // Add event type class
    classes.push(`event-${event.shift?.toLowerCase() || "unknown"}`);

    // Add status class
    if (event.status) {
        classes.push(`status-${event.status.toLowerCase()}`);
    }

    // Add event type class
    if (event.eventType) {
        classes.push(`event-${event.eventType.toLowerCase()}`);
    }

    return classes.join(" ");
};
