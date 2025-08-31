import React, { createElement } from "react";
import { useTimelineSpans, groupByMonth } from "../hooks/useTimelineSpans";

interface MonthBarProps {
    dateColumns: Array<{ dateString: string; date: Date; isToday: boolean; isWeekend: boolean }>;
}

const MonthBar: React.FC<MonthBarProps> = ({ dateColumns }) => {
    const { spans, dayColumnWidth } = useTimelineSpans(dateColumns, groupByMonth);

    if (spans.length === 0) {
        return null;
    }

    return (
        <div className="month-bar" role="list" aria-label="Months">
            {spans.map(span => (
                <div
                    key={`${span.key}-${span.startDate.toISOString().split("T")[0]}`}
                    className="month-span"
                    role="listitem"
                    style={{ width: `${span.spanDays * dayColumnWidth}px` }}
                    title={span.tooltip}
                >
                    {span.displayText}
                </div>
            ))}
        </div>
    );
};

export default MonthBar;
