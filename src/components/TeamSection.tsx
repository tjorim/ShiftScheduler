import React, { createElement, useMemo } from "react";
import ScheduleRow from "./ScheduleRow";
import { TeamSectionProps, ShiftAssignment } from "../types/shiftScheduler";

const TeamSection: React.FC<TeamSectionProps> = ({
    team,
    startDate,
    daysCount,
    shifts,
    onEdit,
    onCellClick,
    readOnly = false
}) => {
    // Memoize filtered shifts for this team's engineers for performance
    const teamShifts = useMemo((): ShiftAssignment[] => {
        try {
            const engineerIds = new Set(team.engineers.map(e => e.id));
            return shifts.filter(shift => engineerIds.has(shift.engineerId));
        } catch (error) {
            // Silently return empty shifts on error
            return [];
        }
    }, [team.engineers, shifts, team.name]);

    // Helper function to get shifts for a specific engineer
    const getShiftsForEngineer = (engineerId: string): ShiftAssignment[] => {
        try {
            return teamShifts.filter(shift => shift.engineerId === engineerId);
        } catch (error) {
            // Silently return empty shifts on error
            return [];
        }
    };

    if (!team.engineers || team.engineers.length === 0) {
        return (
            <div className="team-section team-section-empty">
                <h2 className="team-header">{team.name}</h2>
                <p className="team-empty-message">No engineers in this team.</p>
            </div>
        );
    }
    return (
        <div className="team-section">
            <h2 className="team-header">{team.name}</h2>
            <div className="team-engineers">
                {team.engineers.map(engineer => (
                    <ScheduleRow
                        key={engineer.id}
                        engineer={engineer}
                        startDate={startDate}
                        daysCount={daysCount}
                        shifts={getShiftsForEngineer(engineer.id)}
                        onEdit={shift => {
                            try {
                                onEdit(shift);
                            } catch (error) {
                                // Silently handle edit errors
                            }
                        }}
                        onCellClick={(engineerId, date) => {
                            try {
                                onCellClick(engineerId, date);
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
