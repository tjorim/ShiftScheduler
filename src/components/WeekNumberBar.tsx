import React, { createElement } from "react";
import { useTimelineSpans, groupByWeek } from "../hooks/useTimelineSpans";

interface WeekNumberBarProps {
    dateColumns: Array<{ dateString: string; date: Date; isToday: boolean; isWeekend: boolean }>;
}

const WeekNumberBar: React.FC<WeekNumberBarProps> = ({ dateColumns }) => {
    const { spans, dayColumnWidth } = useTimelineSpans(dateColumns, groupByWeek);

    if (spans.length === 0) {
        return null;
    }

    return (
        <div className="week-number-bar" role="list" aria-label="ISO week numbers">
            {spans.map(span => (
                <div
                    key={`${span.key}-${span.startDate.toISOString().split("T")[0]}`}
                    className="week-span"
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

export default WeekNumberBar;
