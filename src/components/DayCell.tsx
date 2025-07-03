import React, { createElement, MouseEvent, useMemo } from "react";
import { DayCellProps, DayCellData } from "../types/shiftScheduler";
import { getShiftColor, getShiftDisplayText } from "../utils/shiftHelpers";

const DayCell: React.FC<DayCellProps> = ({
    date,
    engineer,
    cellData,
    shift, // Legacy backward compatibility
    isToday = false,
    isWeekend = false,
    isSelected = false,
    shiftsLoading = false,
    onDoubleClick,
    onCellClick,
    onContextMenu,
    readOnly = false,
    trackInteractionError,
    showInactiveEvents: _showInactiveEvents = false,
    showRequests = true,
    onlyShowLTF: _onlyShowLTF = false
}) => {
    // Memoize the effective cell data to prevent unnecessary re-renders
    const effectiveCellData: DayCellData = useMemo(() => {
        return cellData || (shift ? { activeEvent: shift } : {});
    }, [cellData, shift]);

    // Memoize cell styling and content for performance
    const displayData = useMemo(() => {
        const dayNumber = date.getDate();

        // Priority: active event for primary display
        const primaryEvent = effectiveCellData.activeEvent;
        const secondaryEvent = showRequests ? effectiveCellData.pendingRequest : undefined;

        const primaryColor = primaryEvent ? getShiftColor(primaryEvent.shift) : null;
        const primaryText = primaryEvent ? getShiftDisplayText(primaryEvent.shift) : null;
        const secondaryText = secondaryEvent ? getShiftDisplayText(secondaryEvent.shift) : null;

        return {
            dayNumber,
            primaryColor,
            primaryText,
            secondaryText,
            hasActiveEvent: !!primaryEvent,
            hasPendingRequest: !!secondaryEvent,
            hasAnyContent: !!primaryEvent || !!secondaryEvent,
            isError: primaryEvent?.status === "error" || secondaryEvent?.status === "error"
        };
    }, [date, effectiveCellData, showRequests]);

    const handleContext = (e: MouseEvent<HTMLDivElement>): void => {
        if (readOnly || !onContextMenu) {
            return;
        }
        try {
            const dateString = date.toISOString().split("T")[0];
            // For now, use primary event (active event) for context menu
            // TODO: In future, detect which part of cell was clicked for different context menus
            const contextEvent = effectiveCellData.activeEvent || shift;
            const eventType = effectiveCellData.activeEvent ? "active" : undefined;
            onContextMenu(e, engineer, dateString, contextEvent, eventType);
        } catch (error) {
            trackInteractionError?.(
                `Context menu failed on ${engineer.name} for ${date.toDateString()}: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        }
    };

    const handleDoubleClick = (): void => {
        if (readOnly) {
            return;
        }
        try {
            onDoubleClick();
        } catch (error) {
            trackInteractionError?.(
                `Double-click failed on ${engineer.name} for ${date.toDateString()}: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
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
            trackInteractionError?.(
                `Cell click failed on ${engineer.name} for ${date.toDateString()}: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
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
        displayData.hasAnyContent && "day-cell-has-content",
        displayData.hasActiveEvent && "day-cell-has-active",
        displayData.hasPendingRequest && "day-cell-has-request",
        displayData.isError && "day-cell-error",
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
                displayData.hasActiveEvent
                    ? ` (${displayData.primaryText}${
                          effectiveCellData.activeEvent?.status ? ` - ${effectiveCellData.activeEvent.status}` : ""
                      })`
                    : displayData.hasPendingRequest
                    ? ` (Request: ${displayData.secondaryText})`
                    : " - No shift"
            }`}
            style={{
                backgroundColor: displayData.primaryColor || undefined,
                cursor: readOnly ? "default" : "pointer"
            }}
        >
            <div className="day-number">{displayData.dayNumber}</div>
            {displayData.hasAnyContent ? (
                <div className="shift-content">
                    {/* Active event (primary) */}
                    {displayData.hasActiveEvent && (
                        <div className="active-event">
                            <span className="shift-text">{displayData.primaryText}</span>
                        </div>
                    )}

                    {/* Pending request (secondary) - shown in brackets */}
                    {displayData.hasPendingRequest && (
                        <div className="pending-request">
                            <span className="request-text">[{displayData.secondaryText}?]</span>
                        </div>
                    )}

                    {/* Error indicator */}
                    {displayData.isError && (
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
                    +
                </div>
            )}
        </div>
    );
};

export default DayCell;
