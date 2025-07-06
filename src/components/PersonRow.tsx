import React, { createElement } from "react";
import DayCell from "./DayCell";
import { PersonRowProps } from "../types/shiftScheduler";
import { executeActionWithMultipleContext } from "../utils/actionHelpers";

const PersonRow: React.FC<PersonRowProps> = ({
    person,
    dateColumns,
    getDayCellData,
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
                                // Prioritize activeEvent, fallback to pendingRequest
                                const targetEvent = cellData.activeEvent || cellData.pendingRequest;

                                if (targetEvent) {
                                    // For double-click, treat both active events and pending requests as editable
                                    // Context menu can provide more specific actions for pending requests
                                    executeActionWithMultipleContext(onEditEvent, [
                                        { variable: contextEventId, value: targetEvent.id }
                                    ]);
                                } else {
                                    // Empty cell: create new event
                                    executeActionWithMultipleContext(onCreateEvent, [
                                        { variable: contextPersonId, value: person.id },
                                        { variable: contextDate, value: col.dateString }
                                    ]);
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
