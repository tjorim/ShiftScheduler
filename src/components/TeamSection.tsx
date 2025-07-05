import React, { createElement } from "react";
import LaneSection from "./LaneSection";
import TeamCapacityIndicator from "./TeamCapacityIndicator";
import { TeamSectionProps } from "../types/shiftScheduler";

const TeamSection: React.FC<TeamSectionProps> = ({
    team,
    dateColumns,
    getDayCellData,
    getEvent,
    getCapacityForTeamAndDate,
    isCellSelected,
    eventsLoading = false,
    onEditEvent,
    onCreateEvent,
    onDeleteEvent,
    contextEventId,
    contextPersonId,
    contextDate,
    onCellClick,
    onContextMenu,
    readOnly = false,
    trackInteractionError
}) => {
    return (
        <div>
            {/* Team capacity row */}
            <div className="team-timeline-row">
                {dateColumns.map((col, idx) => {
                    // For team row, show capacity for the first lane (representative)
                    const firstLaneName = team.lanes[0]?.name || "";
                    const capacity = getCapacityForTeamAndDate(team.teamName, firstLaneName, col.dateString);
                    return (
                        <div key={idx} className="team-timeline-cell">
                            {capacity && <TeamCapacityIndicator capacity={capacity} compact />}
                        </div>
                    );
                })}
            </div>

            {/* Lane sections */}
            {team.lanes?.map(lane => (
                <LaneSection
                    key={`${team.teamId}-${lane.name}`}
                    lane={lane}
                    team={team}
                    dateColumns={dateColumns}
                    getDayCellData={getDayCellData}
                    getEvent={getEvent}
                    getCapacityForTeamAndDate={getCapacityForTeamAndDate}
                    isCellSelected={isCellSelected}
                    eventsLoading={eventsLoading}
                    onEditEvent={onEditEvent}
                    onCreateEvent={onCreateEvent}
                    onDeleteEvent={onDeleteEvent}
                    contextEventId={contextEventId}
                    contextPersonId={contextPersonId}
                    contextDate={contextDate}
                    onCellClick={onCellClick}
                    onContextMenu={onContextMenu}
                    readOnly={readOnly}
                    trackInteractionError={trackInteractionError}
                />
            ))}
        </div>
    );
};

export default TeamSection;
