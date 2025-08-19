import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import "dayjs/locale/en-gb"; // UK locale

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(localizedFormat);
dayjs.extend(isoWeek);

// Set UK locale for formatting (timezone remains NL)
dayjs.locale("en-gb");

// Export the configured dayjs instance for direct use
export default dayjs;

// Frequently used date utility functions
export const addDays = (date: Date, days: number): Date => {
    return dayjs(date).add(days, "day").toDate();
};

// ISO date format for data consistency and lookups
export const formatISODate = (date: Date): string => {
    return dayjs(date).format("YYYY-MM-DD");
};

/**
 * Determines if a given date is the current "shift day"
 *
 * Shift day logic:
 * - Before 07:00: Current shift day is the PREVIOUS calendar day
 * - 07:00 and after: Current shift day is the CURRENT calendar day
 *
 * This handles night shifts correctly:
 * - Tuesday night shift (23:00 Tue - 07:00 Wed) stays on "Tuesday"
 * - Even at 06:00 Wednesday, it's still considered "Tuesday shift day"
 */
export const isCurrentShiftDay = (date: Date): boolean => {
    const now = dayjs();
    const currentHour = now.hour();

    // Determine the current shift day based on the time
    let currentShiftDay: dayjs.Dayjs;

    if (currentHour < 7) {
        // Before 07:00: we're in a night shift that started yesterday
        currentShiftDay = now.subtract(1, "day");
    } else {
        // 07:00 and after: we're in a shift that starts today
        currentShiftDay = now;
    }

    // Compare dates (ignoring time)
    return dayjs(date).isSame(currentShiftDay, "day");
};
