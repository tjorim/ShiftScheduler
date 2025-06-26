import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const formatDate = (date: Date, format = "YYYY-MM-DD HH:mm"): string => {
    return dayjs(date).format(format);
};

export const parseDate = (dateString: string): Date => {
    return dayjs(dateString).toDate();
};

export const addDays = (date: Date, days: number): Date => {
    return dayjs(date).add(days, "day").toDate();
};

export const addHours = (date: Date, hours: number): Date => {
    return dayjs(date).add(hours, "hour").toDate();
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
    return dayjs(date1).isSame(dayjs(date2), "day");
};

export const isWithinRange = (date: Date, start: Date, end: Date): boolean => {
    const dayDate = dayjs(date);
    return dayDate.isSameOrAfter(dayjs(start)) && dayDate.isSameOrBefore(dayjs(end));
};

export const getDurationInMinutes = (start: Date, end: Date): number => {
    return dayjs(end).diff(dayjs(start), "minute");
};

export const getWeekRange = (date: Date): { start: Date; end: Date } => {
    const startOfWeek = dayjs(date).startOf("week");
    const endOfWeek = dayjs(date).endOf("week");

    return {
        start: startOfWeek.toDate(),
        end: endOfWeek.toDate()
    };
};

export const getMonthRange = (date: Date): { start: Date; end: Date } => {
    const startOfMonth = dayjs(date).startOf("month");
    const endOfMonth = dayjs(date).endOf("month");

    return {
        start: startOfMonth.toDate(),
        end: endOfMonth.toDate()
    };
};

export const roundToNearestMinutes = (date: Date, minutes: number): Date => {
    const dayDate = dayjs(date);
    const roundedMinutes = Math.round(dayDate.minute() / minutes) * minutes;
    return dayDate.minute(roundedMinutes).second(0).millisecond(0).toDate();
};

// Shift-specific date functions
export const getShiftBoundary = (date: Date, shiftType: string): { start: Date; end: Date } => {
    const day = dayjs(date);
    
    switch (shiftType) {
        case "M": // Morning (06:00-14:00)
            return {
                start: day.hour(6).minute(0).second(0).toDate(),
                end: day.hour(14).minute(0).second(0).toDate()
            };
        case "E": // Evening (14:00-22:00)
            return {
                start: day.hour(14).minute(0).second(0).toDate(),
                end: day.hour(22).minute(0).second(0).toDate()
            };
        case "N": // Night (22:00-06:00 next day)
            return {
                start: day.hour(22).minute(0).second(0).toDate(),
                end: day.add(1, "day").hour(6).minute(0).second(0).toDate()
            };
        default: // Day shift (08:00-17:00)
            return {
                start: day.hour(8).minute(0).second(0).toDate(),
                end: day.hour(17).minute(0).second(0).toDate()
            };
    }
};

export const get30DayRange = (startDate: Date): { start: Date; end: Date } => {
    return {
        start: dayjs(startDate).startOf("day").toDate(),
        end: dayjs(startDate).add(29, "days").endOf("day").toDate()
    };
};

export const getDateRangeArray = (start: Date, end: Date): Date[] => {
    const dates: Date[] = [];
    let current = dayjs(start);
    const endDay = dayjs(end);

    while (current.isSameOrBefore(endDay, "day")) {
        dates.push(current.toDate());
        current = current.add(1, "day");
    }

    return dates;
};

export const formatShiftDate = (date: Date): string => {
    return dayjs(date).format("MMM DD");
};

export const formatShiftWeekday = (date: Date): string => {
    return dayjs(date).format("ddd");
};

// Legacy compatibility functions (keeping same names as date-fns version)
export const generateDateRange = (startDate: Date, daysCount: number): Date[] => {
    const dates: Date[] = [];
    for (let i = 0; i < daysCount; i++) {
        dates.push(addDays(startDate, i));
    }
    return dates;
};

export const formatDateForShift = (date: Date): string => {
    return dayjs(date).format("YYYY-MM-DD");
};

export const isToday = (date: Date): boolean => {
    return isSameDay(date, new Date());
};

export const isWeekend = (date: Date): boolean => {
    const day = dayjs(date).day();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};