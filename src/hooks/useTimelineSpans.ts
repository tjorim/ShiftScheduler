import { useMemo } from "react";
import dayjs from "../utils/dateHelpers";
import { DAY_COLUMN_WIDTH } from "../utils/eventHelpers";

interface DateColumn {
    dateString: string;
    date: Date;
    isToday: boolean;
    isWeekend: boolean;
}

interface TimelineSpan {
    key: string;
    displayText: string;
    tooltip: string;
    spanDays: number;
    startDate: Date;
    endDate: Date;
}

type GroupingFunction = (date: Date) => {
    groupKey: string;
    displayText: string;
    tooltipPrefix: string;
};

/**
 * Custom hook for calculating timeline spans (months, weeks, etc.) from date columns.
 * Provides memoized span calculations and shared constants for consistent width calculations.
 */
export const useTimelineSpans = (
    dateColumns: DateColumn[],
    groupBy: GroupingFunction
): {
    spans: TimelineSpan[];
    dayColumnWidth: number;
} => {
    const spans = useMemo((): TimelineSpan[] => {
        if (dateColumns.length === 0) {
            return [];
        }

        const spanList: TimelineSpan[] = [];
        let currentSpan: TimelineSpan | null = null;

        dateColumns.forEach(col => {
            const d = dayjs(col.date); // Single dayjs instantiation per iteration
            const { groupKey, displayText, tooltipPrefix } = groupBy(col.date);

            if (!currentSpan || currentSpan.key !== groupKey) {
                // Start new span
                if (currentSpan) {
                    spanList.push(currentSpan);
                }
                currentSpan = {
                    key: groupKey,
                    displayText,
                    tooltip: `${tooltipPrefix} (${d.format("MMM D")} - ${d.format("MMM D")})`,
                    spanDays: 1,
                    startDate: col.date,
                    endDate: col.date
                };
            } else {
                // Extend current span
                currentSpan.endDate = col.date;
                currentSpan.spanDays += 1;
                currentSpan.tooltip = `${tooltipPrefix} (${dayjs(currentSpan.startDate).format("MMM D")} - ${d.format(
                    "MMM D"
                )})`;
            }
        });

        // Add the last span
        if (currentSpan) {
            spanList.push(currentSpan);
        }

        return spanList;
    }, [dateColumns, groupBy]);

    return {
        spans,
        dayColumnWidth: DAY_COLUMN_WIDTH
    };
};

// Predefined grouping functions for common use cases

export const groupByMonth = (date: Date): { groupKey: string; displayText: string; tooltipPrefix: string } => {
    const month = dayjs(date).month();
    const year = dayjs(date).year();
    const monthName = dayjs(date).format("MMMM");

    return {
        groupKey: `${year}-${month}`,
        displayText: `${monthName} ${year}`,
        tooltipPrefix: `${monthName} ${year}`
    };
};

export const groupByWeek = (date: Date): { groupKey: string; displayText: string; tooltipPrefix: string } => {
    const weekNumber = dayjs(date).isoWeek();
    const year = dayjs(date).isoWeekYear();

    return {
        groupKey: `${year}-W${weekNumber}`,
        displayText: `W${weekNumber}`,
        tooltipPrefix: `Week ${weekNumber}, ${year}`
    };
};
