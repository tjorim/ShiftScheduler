import { ShiftAssignment } from "../types";

// Shift color mappings
export const SHIFT_COLORS = {
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

export type ShiftType = keyof typeof SHIFT_COLORS;
export type RoleType = keyof typeof ROLE_STYLES;

/**
 * Get the color for a shift type
 */
export const getShiftColor = (shiftType: string): string => {
    return SHIFT_COLORS[shiftType as ShiftType] || "#607D8B"; // Default gray-blue
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
 * Check if a shift is a working shift (not day off or holiday)
 */
export const isWorkingShift = (shiftType: string): boolean => {
    return !["D", "H"].includes(shiftType);
};

/**
 * Get shift display name
 */
export const getShiftDisplayName = (shiftType: string): string => {
    const names = {
        M: "Morning",
        E: "Evening",
        N: "Night",
        D: "Day Off",
        H: "Holiday",
        T: "Training"
    };
    return names[shiftType as ShiftType] || shiftType;
};

/**
 * Get short display text for a shift (used in day cells)
 */
export const getShiftDisplayText = (shiftType: string): string => {
    return shiftType || "?";
};

/**
 * Validate shift assignment rules
 */
export const validateShiftAssignment = (
    assignment: Partial<ShiftAssignment>,
    existingShifts: ShiftAssignment[]
): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Check for overlapping shifts on same date
    const sameDate = existingShifts.filter(
        s => s.date === assignment.date && s.engineerId === assignment.engineerId && s.id !== assignment.id
    );

    if (sameDate.length > 0) {
        errors.push("Engineer already has a shift assigned for this date");
    }

    // Check night shift followed by morning shift (insufficient rest)
    if (assignment.shift === "M") {
        const previousDay = new Date(assignment.date!);
        previousDay.setDate(previousDay.getDate() - 1);
        const prevDayString = previousDay.toISOString().split("T")[0];

        const prevNightShift = existingShifts.find(
            s => s.date === prevDayString && s.engineerId === assignment.engineerId && s.shift === "N"
        );

        if (prevNightShift) {
            errors.push("Insufficient rest: Night shift followed by Morning shift");
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Get shift statistics for an engineer over a date range
 */
export const getShiftStats = (
    engineerId: string,
    shifts: ShiftAssignment[],
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
    const engineerShifts = shifts.filter(s => s.engineerId === engineerId && s.date >= startDate && s.date <= endDate);

    const stats = {
        total: engineerShifts.length,
        morning: 0,
        evening: 0,
        night: 0,
        dayOff: 0,
        holiday: 0,
        training: 0
    };

    engineerShifts.forEach(shift => {
        switch (shift.shift) {
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
export const getShiftCSSClasses = (shift?: ShiftAssignment): string => {
    if (!shift) {
        return "day-cell empty";
    }

    const classes = ["day-cell", "has-shift"];

    // Add shift type class
    classes.push(`shift-${shift.shift?.toLowerCase() || "unknown"}`);

    // Add status class
    if (shift.status) {
        classes.push(`status-${shift.status.toLowerCase()}`);
    }

    // Add event type class
    if (shift.eventType) {
        classes.push(`event-${shift.eventType.toLowerCase()}`);
    }

    return classes.join(" ");
};
