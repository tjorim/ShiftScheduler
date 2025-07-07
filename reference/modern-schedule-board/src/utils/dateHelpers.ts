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
