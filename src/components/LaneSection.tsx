import React, { createElement } from "react";
import PersonRow from "./PersonRow";
import TeamCapacityIndicator from "./TeamCapacityIndicator";
import { LaneSectionProps } from "../types/shiftScheduler";

const LaneSection: React.FC<LaneSectionProps> = ({
    lane,
    team,
    dateColumns,
    getDayCellData,
    getCapacityForTeamAndDate,
    isCellSelected,
    eventsLoading = false,
    onEditEvent,
    onCreateEvent,
    onDeleteEvent,
    onCellClick,
    onContextMenu,
    readOnly = false,
    trackInteractionError,
    trackDataQualityIssue
}) => {
    return (
        <div>
            {/* Lane header and capacity row */}
            <div className="lane-timeline-row">
                {dateColumns.map((col, idx) => {
                    // Get capacity for this specific lane
                    const capacity = getCapacityForTeamAndDate(team.teamName, lane.name, col.dateString);
                    return (
                        <div key={idx} className="lane-timeline-cell">
                            {capacity && <TeamCapacityIndicator capacity={capacity} compact />}
                        </div>
                    );
                })}
            </div>

            {/* People rows in this lane */}
            {lane.people?.map(person => (
                <PersonRow
                    key={person.id}
                    person={person}
                    dateColumns={dateColumns}
                    getDayCellData={getDayCellData}
                    isCellSelected={isCellSelected}
                    eventsLoading={eventsLoading}
                    onEditEvent={onEditEvent}
                    onCreateEvent={onCreateEvent}
                    onDeleteEvent={onDeleteEvent}
                    onCellClick={onCellClick}
                    onContextMenu={onContextMenu}
                    readOnly={readOnly}
                    trackInteractionError={trackInteractionError}
                    trackDataQualityIssue={trackDataQualityIssue}
                />
            ))}
        </div>
    );
};

export default LaneSection;
