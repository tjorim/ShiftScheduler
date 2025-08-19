import React, { createElement } from "react";
import dayjs from "../utils/dateHelpers";

interface MonthSpan {
    month: number;
    year: number;
    monthName: string;
    startDate: Date;
    endDate: Date;
    spanDays: number;
}

interface MonthBarProps {
    dateColumns: Array<{ dateString: string; date: Date; isToday: boolean; isWeekend: boolean }>;
}

const MonthBar: React.FC<MonthBarProps> = ({ dateColumns }) => {
    // Group consecutive dates by month
    const getMonthSpans = (): MonthSpan[] => {
        if (dateColumns.length === 0) {
            return [];
        }

        const spans: MonthSpan[] = [];
        let currentMonth: MonthSpan | null = null;

        dateColumns.forEach(col => {
            const month = dayjs(col.date).month();
            const year = dayjs(col.date).year();
            const monthName = dayjs(col.date).format("MMMM");

            if (!currentMonth || currentMonth.month !== month || currentMonth.year !== year) {
                // Start new month span
                if (currentMonth) {
                    spans.push(currentMonth);
                }
                currentMonth = {
                    month,
                    year,
                    monthName,
                    startDate: col.date,
                    endDate: col.date,
                    spanDays: 1
                };
            } else {
                // Extend current month span
                currentMonth.endDate = col.date;
                currentMonth.spanDays += 1;
            }
        });

        // Add the last month span
        if (currentMonth) {
            spans.push(currentMonth);
        }

        return spans;
    };

    const monthSpans = getMonthSpans();

    if (monthSpans.length === 0) {
        return null;
    }

    return (
        <div className="month-bar">
            {monthSpans.map(span => (
                <div
                    key={`${span.year}-${span.month}`}
                    className="month-span"
                    style={{ width: `${span.spanDays * 80}px` }}
                    title={`${span.monthName} ${span.year} (${dayjs(span.startDate).format("MMM D")} - ${dayjs(
                        span.endDate
                    ).format("MMM D")})`}
                >
                    {span.monthName} {span.year}
                </div>
            ))}
        </div>
    );
};

export default MonthBar;
