import React, { createElement, useMemo } from "react";
import DayCell from "./DayCell";
import { addDays, formatDateForShift } from "../utils/dateHelpers";
import { EngineerRowProps } from "../types";

const EngineerRow: React.FC<EngineerRowProps> = ({ 
    engineer, 
    startDate, 
    daysCount, 
    shifts, 
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
                const shift = shifts.find(s => s.engineerId === engineer.id && s.date === dayString);
                return { day, dayString, shift, idx };
            });
        } catch (error) {
            console.warn(`Error generating days array for engineer ${engineer.id}:`, error);
            return [];
        }
    }, [startDate, daysCount, shifts, engineer.id]);

    if (daysArray.length === 0) {
        return (
            <div className="engineer-row engineer-row-error">
                <div className="engineer-name">{engineer.name}</div>
                <div className="engineer-timeline-error">Error loading timeline</div>
            </div>
        );
    }
    return (
        <div className="engineer-row">
            <div className="engineer-name" title={`${engineer.name} (${engineer.team})`}>
                {engineer.name}
            </div>
            <div className="engineer-timeline">
                {daysArray.map(({ day, dayString, shift, idx }) => (
                    <DayCell
                        key={`${engineer.id}-${idx}`}
                        date={day}
                        engineer={engineer}
                        shift={shift}
                        isToday={dayString === formatDateForShift(new Date())}
                        isWeekend={day.getDay() === 0 || day.getDay() === 6}
                        onEdit={() => {
                            try {
                                onEdit(shift);
                            } catch (error) {
                                console.error(`Error in onEdit for ${engineer.name} on ${dayString}:`, error);
                            }
                        }}
                        onCellClick={() => {
                            try {
                                onCellClick(engineer.id, dayString);
                            } catch (error) {
                                console.error(`Error in onCellClick for ${engineer.name} on ${dayString}:`, error);
                            }
                        }}
                        readOnly={readOnly}
                    />
                ))}
            </div>
        </div>
    );
};

export default EngineerRow;
