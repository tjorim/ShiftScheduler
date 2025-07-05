import React, { createElement } from "react";
import DayCell from "./DayCell";
import { PersonRowProps } from "../types/shiftScheduler";

const PersonRow: React.FC<PersonRowProps> = ({
    person,
    dateColumns,
    getDayCellData,
    getEvent,
    isCellSelected,
    eventsLoading = false,
    onEditEvent,
    onCreateEvent,
    onDeleteEvent: _onDeleteEvent,
    contextEventId,
    contextPersonId,
    contextDate,
    onCellClick,
    onContextMenu,
    readOnly = false,
    trackInteractionError
}) => {
    return (
        <div key={person.id} className="person-timeline-row">
            {dateColumns.map((col, idx) => {
                const event = getEvent(person.id, col.dateString);
                const cellData = getDayCellData(person.id, col.dateString);
                return (
                    <DayCell
                        key={`${person.id}-${idx}`}
                        date={col.date}
                        person={person}
                        cellData={cellData}
                        isToday={col.isToday}
                        isWeekend={col.isWeekend}
                        isSelected={isCellSelected(person.id, col.dateString)}
                        eventsLoading={eventsLoading}
                        onDoubleClick={() => {
                            try {
                                if (event) {
                                    // Existing event: edit it (same as context menu edit)
                                    const editStatus = !onEditEvent
                                        ? "not-configured"
                                        : onEditEvent.canExecute === true
                                        ? "allowed"
                                        : "no-permission";

                                    if (editStatus === "allowed" && onEditEvent) {
                                        if (!onEditEvent.isExecuting) {
                                            if (contextEventId?.setValue) {
                                                contextEventId.setValue(event.id);
                                            }
                                            onEditEvent.execute();
                                        }
                                    }
                                    // Do nothing for "not-configured" or "no-permission"
                                } else {
                                    // Empty cell: create new event
                                    const createStatus = !onCreateEvent
                                        ? "not-configured"
                                        : onCreateEvent.canExecute === true
                                        ? "allowed"
                                        : "no-permission";

                                    if (createStatus === "allowed" && onCreateEvent) {
                                        if (!onCreateEvent.isExecuting) {
                                            if (contextPersonId?.setValue) {
                                                contextPersonId.setValue(person.id);
                                            }
                                            if (contextDate?.setValue) {
                                                contextDate.setValue(col.dateString);
                                            }
                                            onCreateEvent.execute();
                                        }
                                    }
                                    // Do nothing for "not-configured" or "no-permission"
                                }
                            } catch (error) {
                                trackInteractionError?.(
                                    `Schedule grid double-click failed: ${
                                        error instanceof Error ? error.message : "Unknown error"
                                    }`
                                );
                            }
                        }}
                        onCellClick={e => onCellClick(person.id, col.dateString, e.ctrlKey || e.metaKey, e.shiftKey)}
                        onContextMenu={onContextMenu}
                        readOnly={readOnly}
                        trackInteractionError={trackInteractionError}
                    />
                );
            })}
        </div>
    );
};

export default PersonRow;
