import React, { createElement, MouseEvent, useMemo } from "react";
import { DayCellProps } from "../types";
import { getShiftColor, getShiftDisplayText } from "../utils/shiftHelpers";

const DayCell: React.FC<DayCellProps> = ({ 
    date, 
    engineer, 
    shift, 
    isToday = false, 
    isWeekend = false, 
    isSelected = false,
    onEdit, 
    onCellClick, 
    readOnly = false 
}) => {
    // Memoize cell styling and content for performance
    const cellData = useMemo(() => {
        const dayNumber = date.getDate();
        const shiftColor = shift ? getShiftColor(shift.shift) : null;
        const shiftText = shift ? getShiftDisplayText(shift.shift) : null;
        
        return {
            dayNumber,
            shiftColor,
            shiftText,
            hasShift: !!shift,
            isError: shift?.status === 'error'
        };
    }, [date, shift]);

    const handleContext = (e: MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        if (readOnly) return;
        // TODO: show context menu for editing
    };

    const handleEdit = () => {
        if (readOnly) return;
        try {
            onEdit();
        } catch (error) {
            console.error(`Error in DayCell onEdit for ${engineer.name} on ${date.toDateString()}:`, error);
        }
    };

    const handleClick = () => {
        try {
            onCellClick();
        } catch (error) {
            console.error(`Error in DayCell onClick for ${engineer.name} on ${date.toDateString()}:`, error);
        }
    };

    // Build CSS classes
    const cellClasses = [
        'day-cell',
        isToday && 'day-cell-today',
        isWeekend && 'day-cell-weekend',
        isSelected && 'day-cell-selected',
        cellData.hasShift && 'day-cell-has-shift',
        cellData.isError && 'day-cell-error',
        readOnly && 'day-cell-readonly'
    ].filter(Boolean).join(' ');

    return (
        <div
            className={cellClasses}
            onDoubleClick={handleEdit}
            onClick={handleClick}
            onContextMenu={handleContext}
            title={`${engineer.name} - ${date.toLocaleDateString()}${shift ? ` (${shift.shift}${shift.status ? ` - ${shift.status}` : ''})` : ' - No shift'}`}
            style={{
                backgroundColor: cellData.shiftColor || undefined,
                cursor: readOnly ? 'default' : 'pointer'
            }}
        >
            <div className="day-number">{cellData.dayNumber}</div>
            {cellData.hasShift && (
                <div className="shift-content">
                    <span className="shift-text">
                        {cellData.shiftText}
                    </span>
                    {shift?.status === 'error' && (
                        <span className="shift-error-indicator" title="Error loading shift data">⚠️</span>
                    )}
                </div>
            )}
            {!cellData.hasShift && (
                <div className="day-cell-empty" title="No shift">-</div>
            )}
        </div>
    );
};

export default DayCell;
