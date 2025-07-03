import React, { createElement, useMemo } from "react";
import ScheduleRow from "./ScheduleRow";
import { TeamSectionProps, EventAssignment } from "../types/shiftScheduler";

const TeamSection: React.FC<TeamSectionProps> = ({
    team,
    startDate,
    daysCount,
    events,
    onEdit,
    onCellClick,
    readOnly = false
}) => {
    // Memoize filtered events for this team's people for performance
    const teamEvents = useMemo((): EventAssignment[] => {
        try {
            const personIds = new Set(team.people.map(e => e.id));
            return events.filter(event => personIds.has(event.personId));
        } catch (error) {
            // Silently return empty events on error
            return [];
        }
    }, [team.people, events]);

    // Helper function to get events for a specific person
    const getEventsForPerson = (personId: string): EventAssignment[] => {
        try {
            return teamEvents.filter(event => event.personId === personId);
        } catch (error) {
            // Silently return empty events on error
            return [];
        }
    };

    if (!team.people || team.people.length === 0) {
        return (
            <div className="team-section team-section-empty">
                <h2 className="team-header">{team.name}</h2>
                <p className="team-empty-message">No people in this team.</p>
            </div>
        );
    }
    return (
        <div className="team-section">
            <h2 className="team-header">{team.name}</h2>
            <div className="team-people">
                {team.people.map(person => (
                    <ScheduleRow
                        key={person.id}
                        person={person}
                        startDate={startDate}
                        daysCount={daysCount}
                        events={getEventsForPerson(person.id)}
                        onEdit={event => {
                            try {
                                onEdit(event);
                            } catch (error) {
                                // Silently handle edit errors
                            }
                        }}
                        onCellClick={(personId, date) => {
                            try {
                                onCellClick(personId, date);
                            } catch (error) {
                                // Silently handle cell click errors
                            }
                        }}
                        readOnly={readOnly}
                    />
                ))}
            </div>
        </div>
    );
};

export default TeamSection;
