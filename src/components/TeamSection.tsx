import React, { createElement } from "react";
import LaneSection from "./LaneSection";
import TeamCapacityIndicator from "./TeamCapacityIndicator";
import { TeamSectionProps } from "../types/shiftScheduler";

const TeamSection: React.FC<TeamSectionProps> = ({
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
            {/* Team capacity row */}
            <div className="team-timeline-row">
                {dateColumns.map((col, idx) => {
                    // For team row, show capacity for the first lane (representative)
                    const firstLaneName = team.lanes?.[0]?.name ?? "General";
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
                    key={`${team.teamId}-${lane.laneId}`}
                    lane={lane}
                    team={team}
                    dateColumns={dateColumns}
                    getDayCellData={getDayCellData}
                    getCapacityForTeamAndDate={getCapacityForTeamAndDate}
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

export default TeamSection;
