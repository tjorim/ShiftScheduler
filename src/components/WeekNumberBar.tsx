import React, { createElement } from "react";
import dayjs from "../utils/dateHelpers";

interface WeekSpan {
    weekNumber: number;
    year: number;
    startDate: Date;
    endDate: Date;
    spanDays: number;
}

interface WeekNumberBarProps {
    dateColumns: Array<{ dateString: string; date: Date; isToday: boolean; isWeekend: boolean }>;
}

const WeekNumberBar: React.FC<WeekNumberBarProps> = ({ dateColumns }) => {
    // Group consecutive dates by week number
    const getWeekSpans = (): WeekSpan[] => {
        if (dateColumns.length === 0) {
            return [];
        }

        const spans: WeekSpan[] = [];
        let currentWeek: WeekSpan | null = null;

        dateColumns.forEach(col => {
            const weekNumber = dayjs(col.date).isoWeek();
            const year = dayjs(col.date).isoWeekYear();

            if (!currentWeek || currentWeek.weekNumber !== weekNumber || currentWeek.year !== year) {
                // Start new week span
                if (currentWeek) {
                    spans.push(currentWeek);
                }
                currentWeek = {
                    weekNumber,
                    year,
                    startDate: col.date,
                    endDate: col.date,
                    spanDays: 1
                };
            } else {
                // Extend current week span
                currentWeek.endDate = col.date;
                currentWeek.spanDays += 1;
            }
        });

        // Add the last week span
        if (currentWeek) {
            spans.push(currentWeek);
        }

        return spans;
    };

    const weekSpans = getWeekSpans();

    if (weekSpans.length === 0) {
        return null;
    }

    return (
        <div className="week-number-bar">
            {weekSpans.map(span => (
                <div
                    key={`${span.year}-W${span.weekNumber}`}
                    className="week-span"
                    style={{ width: `${span.spanDays * 80}px` }}
                    title={`Week ${span.weekNumber}, ${span.year} (${dayjs(span.startDate).format("MMM D")} - ${dayjs(
                        span.endDate
                    ).format("MMM D")})`}
                >
                    W{span.weekNumber}
                </div>
            ))}
        </div>
    );
};

export default WeekNumberBar;
