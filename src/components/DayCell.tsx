import React, { createElement, MouseEvent, useMemo } from "react";
import dayjs, { formatISODate } from "../utils/dateHelpers";
import { DayCellProps, DayCellData, EventAssignment } from "../types/shiftScheduler";
import { getEventColor, getEventDisplayText, getEventCssClasses } from "../utils/eventHelpers";

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
        return cellData;
    }, [cellData]);

    // Memoize cell styling and content for performance
    const displayData = useMemo(() => {
        const dayNumber = dayjs(date).date();
        const dateStr = dayjs(date).format("L"); // UK format: DD/MM/YYYY

        // Priority: active event for primary display
        const primaryEvent = effectiveCellData.activeEvent;
        const secondaryEvent = effectiveCellData.pendingRequest;

        const primaryColor = primaryEvent ? getEventColor(primaryEvent.eventType) : null;
        const primaryCssClasses = primaryEvent ? getEventCssClasses(primaryEvent.eventType, primaryEvent.status) : null;
        const primaryText = primaryEvent ? getEventDisplayText(primaryEvent.eventType) : null;
        const secondaryText = secondaryEvent ? getEventDisplayText(secondaryEvent.eventType) : null;
        const secondaryStatus = secondaryEvent?.isRequest ? "requested" : secondaryEvent?.status;
        const secondaryCssClasses = secondaryEvent
            ? getEventCssClasses(secondaryEvent.eventType, secondaryStatus)
            : null;

        const hasActiveEvent = !!primaryEvent;
        const hasPendingRequest = !!secondaryEvent;

        // Calculate title based on event content
        let title: string;
        if (hasActiveEvent) {
            title = `${person.name} - ${dateStr} (${primaryText})`;
        } else if (hasPendingRequest) {
            title = `${person.name} - ${dateStr} (Request: ${secondaryText})`;
        } else {
            title = `${person.name} - ${dateStr}`;
        }

        return {
            dayNumber,
            primaryColor,
            primaryCssClasses,
            primaryText,
            secondaryText,
            secondaryStatus,
            secondaryCssClasses,
            hasActiveEvent,
            hasPendingRequest,
            hasAnyContent: hasActiveEvent || hasPendingRequest,
            isError: false, // Error status removed from domain model
            title
        };
    }, [date, effectiveCellData, person.name]);

    const handleContext = (e: MouseEvent<HTMLDivElement>): void => {
        if (readOnly || !onContextMenu) {
            return;
        }
        try {
            const dateString = formatISODate(date);

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
                `Context menu failed on ${person.name} for ${dayjs(date).format("LL")}: ${
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
                `Double-click failed on ${person.name} for ${dayjs(date).format("LL")}: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        }
    };

    const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
        // Respect readOnly mode - don't allow cell selection when readOnly is true
        if (readOnly) {
            return;
        }

        // Prevent text selection when using Shift+click for range selection
        if (e.shiftKey) {
            e.preventDefault();
        }

        try {
            onCellClick(e);
        } catch (error) {
            trackInteractionError?.(
                `Cell click failed on ${person.name} for ${dayjs(date).format("LL")}: ${
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
            title={displayData.title}
            style={{
                backgroundColor: displayData.primaryColor || undefined,
                cursor: readOnly ? "default" : "pointer"
            }}
        >
            <div className="day-number">{displayData.dayNumber}</div>
            {displayData.hasAnyContent ? (
                <div className="event-content">
                    {/* Active event (primary) */}
                    {displayData.hasActiveEvent && (
                        <div className={`active-event ${displayData.primaryCssClasses || ""}`}>
                            <span className="event-text">{displayData.primaryText}</span>
                        </div>
                    )}

                    {/* Pending request (secondary) - shown in brackets */}
                    {displayData.hasPendingRequest && (
                        <div className={`pending-request ${displayData.secondaryCssClasses || ""}`}>
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

export default React.memo(DayCell);
