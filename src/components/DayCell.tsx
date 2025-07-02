import React, { createElement, MouseEvent, useMemo } from "react";
import { DayCellProps } from "../types/shiftScheduler";
import { getShiftColor, getShiftDisplayText } from "../utils/shiftHelpers";

const DayCell: React.FC<DayCellProps> = ({
    date,
    engineer,
    shift,
    isToday = false,
    isWeekend = false,
    isSelected = false,
    shiftsLoading = false,
    onDoubleClick,
    onCellClick,
    onContextMenu,
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
            isError: shift?.status === "error"
        };
    }, [date, shift]);

    const handleContext = (e: MouseEvent<HTMLDivElement>): void => {
        if (readOnly || !onContextMenu) {
            return;
        }
        const dateString = date.toISOString().split("T")[0];
        onContextMenu(e, engineer, dateString, shift);
    };

    const handleDoubleClick = (): void => {
        if (readOnly) {
            return;
        }
        try {
            onDoubleClick();
        } catch (error) {
            // Silently handle double-click errors
        }
    };

    const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
        // Prevent text selection when using Shift+click for range selection
        if (e.shiftKey) {
            e.preventDefault();
        }

        try {
            onCellClick(e);
        } catch (error) {
            // Silently handle click errors
        }
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
        // Prevent text selection on mousedown for all modifier key combinations
        if (e.shiftKey || e.ctrlKey || e.metaKey) {
            e.preventDefault();
        }
    };

    // Build CSS classes
    const cellClasses = [
        "day-cell",
        isToday && "day-cell-today",
        isWeekend && "day-cell-weekend",
        isSelected && "day-cell-selected",
        cellData.hasShift && "day-cell-has-shift",
        cellData.isError && "day-cell-error",
        readOnly && "day-cell-readonly"
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={cellClasses}
            onDoubleClick={handleDoubleClick}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onContextMenu={handleContext}
            title={`${engineer.name} - ${date.toLocaleDateString()}${
                shift ? ` (${shift.shift}${shift.status ? ` - ${shift.status}` : ""})` : " - No shift"
            }`}
            style={{
                backgroundColor: cellData.shiftColor || undefined,
                cursor: readOnly ? "default" : "pointer"
            }}
        >
            <div className="day-number">{cellData.dayNumber}</div>
            {cellData.hasShift ? (
                <div className="shift-content">
                    <span className="shift-text">{cellData.shiftText}</span>
                    {shift?.status === "error" && (
                        <span className="shift-error-indicator" title="Error loading shift data">
                            ⚠️
                        </span>
                    )}
                </div>
            ) : shiftsLoading ? (
                <div className="day-cell-loading" title="Loading shifts...">
                    ...
                </div>
            ) : (
                <div className="day-cell-empty" title="No shift">
                    -
                </div>
            )}
        </div>
    );
};

export default DayCell;
