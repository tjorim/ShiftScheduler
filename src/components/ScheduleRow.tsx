import React, { createElement, useMemo } from "react";
import DayCell from "./DayCell";
import { addDays, formatDateForShift } from "../utils/dateHelpers";
import { PersonRowProps } from "../types/shiftScheduler";

const PersonRow: React.FC<PersonRowProps> = ({
    person,
    startDate,
    daysCount,
    events,
    onEdit,
    onCellClick,
    readOnly = false
}) => {
    // Memoize days array for performance
    const daysArray = useMemo(() => {
        try {
            return Array.from({ length: daysCount }, (_, idx) => {
                const day = addDays(startDate, idx);
                const dayString = formatDateForShift(day);
                const event = events.find(s => s.personId === person.id && s.date === dayString);
                return { day, dayString, event, idx };
            });
        } catch (error) {
            // Silently return empty days on error
            return [];
        }
    }, [startDate, daysCount, events, person.id]);

    if (daysArray.length === 0) {
        return (
            <div className="person-row person-row-error">
                <div className="person-name">{person.name}</div>
                <div className="person-timeline-error">Error loading timeline</div>
            </div>
        );
    }
    return (
        <div className="person-row">
            <div className="person-name">{person.name}</div>
            <div className="person-timeline">
                {daysArray.map(({ day, dayString, event, idx }) => (
                    <DayCell
                        key={`${person.id}-${idx}`}
                        date={day}
                        person={person}
                        cellData={event ? { activeEvent: event } : {}}
                        isToday={dayString === formatDateForShift(new Date())}
                        isWeekend={day.getDay() === 0 || day.getDay() === 6}
                        onDoubleClick={() => {
                            try {
                                onEdit(event);
                            } catch (error) {
                                // Silently handle double-click errors
                            }
                        }}
                        onCellClick={() => {
                            try {
                                onCellClick(person.id, dayString);
                            } catch (error) {
                                // Silently handle cell click errors
                            }
                        }}
                        readOnly={readOnly}
                    />
                ))}
            </div>
        </div>
    );
};

export default PersonRow;
