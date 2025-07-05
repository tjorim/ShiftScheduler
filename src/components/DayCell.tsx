import React, { createElement, MouseEvent, useMemo } from "react";
import { DayCellProps, DayCellData, EventAssignment } from "../types/shiftScheduler";
import { getEventColor, getEventDisplayText } from "../utils/shiftHelpers";

const DayCell: React.FC<DayCellProps> = ({
    date,
    person,
    cellData,
    isToday = false,
    isWeekend = false,
    isSelected = false,
    eventsLoading = false,
    onDoubleClick,
    onCellClick,
    onContextMenu,
    readOnly = false,
    trackInteractionError
}) => {
    // Memoize the effective cell data to prevent unnecessary re-renders
    const effectiveCellData: DayCellData = useMemo(() => {
        if (!cellData) {
            console.warn(`DayCell: No cellData provided for ${person.name} on ${date.toISOString()}`);
            return {};
        }
        return cellData;
    }, [cellData, person.name, date]);

    // Memoize cell styling and content for performance
    const displayData = useMemo(() => {
        const dayNumber = date.getDate();

        // Priority: active event for primary display
        const primaryEvent = effectiveCellData.activeEvent;
        const secondaryEvent = effectiveCellData.pendingRequest;

        const primaryColor = primaryEvent ? getEventColor(primaryEvent.shift) : null;
        const primaryText = primaryEvent ? getEventDisplayText(primaryEvent.shift) : null;
        const secondaryText = secondaryEvent ? getEventDisplayText(secondaryEvent.shift) : null;

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
    }, [date, effectiveCellData]);

    const handleContext = (e: MouseEvent<HTMLDivElement>): void => {
        if (readOnly || !onContextMenu) {
            return;
        }
        try {
            const dateString = date.toISOString().split("T")[0];

            // Detect which part of the cell was clicked for targeted context menu
            const target = e.target as HTMLElement;
            const clickedActiveEvent = target.closest(".active-event");
            const clickedPendingRequest = target.closest(".pending-request");

            let contextEvent: EventAssignment | undefined;
            let eventType: "active" | "request" | undefined;

            if (clickedActiveEvent && effectiveCellData.activeEvent) {
                // User clicked on the active event part
                contextEvent = effectiveCellData.activeEvent;
                eventType = "active";
            } else if (clickedPendingRequest && effectiveCellData.pendingRequest) {
                // User clicked on the pending request part
                contextEvent = effectiveCellData.pendingRequest;
                eventType = "request";
            } else {
                // Default priority: active event first, then pending request, then empty cell
                contextEvent = effectiveCellData.activeEvent || effectiveCellData.pendingRequest;
                eventType = effectiveCellData.activeEvent
                    ? "active"
                    : effectiveCellData.pendingRequest
                    ? "request"
                    : undefined;
            }

            onContextMenu(e, person, dateString, contextEvent, eventType);
        } catch (error) {
            trackInteractionError?.(
                `Context menu failed on ${person.name} for ${date.toDateString()}: ${
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
                `Double-click failed on ${person.name} for ${date.toDateString()}: ${
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
                `Cell click failed on ${person.name} for ${date.toDateString()}: ${
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
            title={(() => {
                const dateStr = date.toLocaleDateString();
                if (displayData.hasActiveEvent) {
                    return `${person.name} - ${dateStr} (${displayData.primaryText})`;
                } else if (displayData.hasPendingRequest) {
                    return `${person.name} - ${dateStr} (Request: ${displayData.secondaryText})`;
                }
                return `${person.name} - ${dateStr}`;
            })()}
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
                        <span className="event-error-indicator" title="Error loading event data">
                            ⚠️
                        </span>
                    )}
                </div>
            ) : eventsLoading ? (
                <div className="day-cell-loading" title="Loading events...">
                    ...
                </div>
            ) : (
                <div className="day-cell-empty" title="No event">
                    +
                </div>
            )}
        </div>
    );
};

export default DayCell;
