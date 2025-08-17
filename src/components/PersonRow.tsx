import React, { createElement, useMemo, useCallback, MouseEvent } from "react";
import DayCell from "./DayCell";
import { PersonRowProps } from "../types/shiftScheduler";
import { buildCompositeKey } from "../utils/eventHelpers";
// Action execution now uses direct parameter passing with action variables

const PersonRow: React.FC<PersonRowProps> = ({
    person,
    dateColumns,
    getDayCellData,
    isCellSelected,
    eventsLoading = false,
    onEditEvent,
    onCreateEvent,
    onDeleteEvent: _onDeleteEvent,
    onCellClick,
    onContextMenu,
    readOnly = false,
    trackInteractionError
}) => {
    // Memoize double-click handler to prevent function recreation on every render
    const createDoubleClickHandler = useCallback(
        (col: (typeof dateColumns)[0]) => () => {
            // Respect readOnly mode - don't allow any actions when readOnly is true
            if (readOnly) {
                return;
            }

            try {
                const cellData = getDayCellData(person.id, col.dateString);
                // Prioritize activeEvent, fallback to pendingRequest
                const targetEvent = cellData.activeEvent || cellData.pendingRequest;

                if (targetEvent) {
                    // For double-click, treat both active events and pending requests as editable
                    // Context menu can provide more specific actions for pending requests
                    if (onEditEvent && onEditEvent.canExecute && !onEditEvent.isExecuting) {
                        onEditEvent.execute({ eventId: targetEvent.id });
                    }
                } else {
                    // Empty cell: create new event
                    if (onCreateEvent && onCreateEvent.canExecute && !onCreateEvent.isExecuting) {
                        onCreateEvent.execute({ personId: person.id, date: col.dateString });
                    }
                }
            } catch (error) {
                trackInteractionError?.(
                    `Schedule grid double-click failed: ${error instanceof Error ? error.message : "Unknown error"}`
                );
            }
        },
        [person.id, readOnly, onEditEvent, onCreateEvent, trackInteractionError, getDayCellData]
    );

    // Memoize cell click handler to prevent function recreation
    const createCellClickHandler = useCallback(
        (col: (typeof dateColumns)[0]) => (e: MouseEvent) =>
            onCellClick(person.id, col.dateString, e.ctrlKey || e.metaKey, e.shiftKey),
        [person.id, onCellClick]
    );

    // Memoize the date cells to prevent unnecessary re-renders
    const dateCells = useMemo(
        () =>
            dateColumns.map(col => {
                const cellData = getDayCellData(person.id, col.dateString);
                return (
                    <DayCell
                        key={buildCompositeKey(person.id, col.dateString)}
                        date={col.date}
                        person={person}
                        cellData={cellData}
                        isToday={col.isToday}
                        isWeekend={col.isWeekend}
                        isSelected={isCellSelected(person.id, col.dateString)}
                        eventsLoading={eventsLoading}
                        onDoubleClick={createDoubleClickHandler(col)}
                        onCellClick={createCellClickHandler(col)}
                        onContextMenu={onContextMenu}
                        readOnly={readOnly}
                        trackInteractionError={trackInteractionError}
                    />
                );
            }),
        [
            dateColumns,
            person,
            getDayCellData,
            isCellSelected,
            eventsLoading,
            createDoubleClickHandler,
            createCellClickHandler,
            onContextMenu,
            readOnly,
            trackInteractionError
        ]
    );

    return <div className="person-timeline-row">{dateCells}</div>;
};

export default React.memo(PersonRow);
