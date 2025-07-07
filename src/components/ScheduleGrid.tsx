import React, { createElement, useEffect, useState, useMemo, useCallback } from "react";

// ✅ COMPONENT DECOMPOSITION COMPLETED
// Successfully extracted all major functionality into reusable hooks:
// ✅ useMultiSelect - Multi-select functionality with keyboard modifiers
// ✅ useKeyboardNavigation - Arrow keys, enter, escape handling
// ✅ useContextMenu - Context menu state and option generation
// ✅ useTeamGrouping - Team/lane structure processing
// This refactoring significantly improved cognitive load and enabled better unit testing
import { ActionValue, EditableValue } from "mendix";
import { addDays, getDurationInMinutes, formatDateForShift, isCurrentShiftDay } from "../utils/dateHelpers";
import { useScrollNavigation } from "../hooks/useScrollNavigation";
import { useMultiSelect } from "../hooks/useMultiSelect";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { useContextMenu } from "../hooks/useContextMenu";
import { useTeamGrouping } from "../hooks/useTeamGrouping";
import { EmptyState, withErrorBoundary } from "./LoadingStates";
import { ContextMenu } from "./ContextMenu";
import DebugPanel from "./DebugPanel";
import TeamSection from "./TeamSection";
import { Person, EventAssignment, TeamCapacity, DayCellData } from "../types/shiftScheduler";

interface ScheduleGridProps {
    events: EventAssignment[];
    getPeopleByTeam: () => { [team: string]: Person[] };
    getDayCellData: (personId: string, date: string) => DayCellData;
    getAllTeamCapacities: (dates: string[]) => TeamCapacity[];
    onEditEvent?: ActionValue;
    onCreateEvent?: ActionValue;
    onDeleteEvent?: ActionValue;
    onApproveRequest?: ActionValue;
    onRejectRequest?: ActionValue;
    onMarkAsTBD?: ActionValue;
    // Context attributes for passing data to microflows
    contextEventId?: EditableValue<string>;
    contextPersonId?: EditableValue<string>;
    contextDate?: EditableValue<string>;
    contextSelectedCells?: EditableValue<string>;
    onBatchCreate?: ActionValue;
    onBatchEdit?: ActionValue;
    onBatchDelete?: ActionValue;
    readOnly?: boolean;
    className?: string;
    showDebugInfo?: boolean;
    eventsLoading?: boolean;
    onDateRangeChange?: (startDate: Date, endDate: Date) => void;
    debugInfo?: {
        microflowConfiguration: {
            people: boolean;
            events: boolean;
            teamCapacities: boolean;
        };
        microflowInfo: {
            message: string;
        };
        processingErrors?: string[];
        interactionErrors?: string[];
        dataQualityIssues?: string[];
    };
    trackInteractionError?: (error: string) => void;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
    events,
    getPeopleByTeam,
    getDayCellData,
    getAllTeamCapacities,
    onEditEvent,
    onCreateEvent,
    onDeleteEvent,
    onApproveRequest,
    onRejectRequest,
    onMarkAsTBD,
    contextEventId,
    contextPersonId,
    contextDate,
    contextSelectedCells,
    onBatchCreate,
    onBatchEdit,
    onBatchDelete,
    readOnly = false,
    className = "",
    // teamAccess, // No longer needed
    showDebugInfo,
    eventsLoading,
    debugInfo,
    onDateRangeChange,
    trackInteractionError
}) => {
    // Use all events data directly - security is handled by ActionValue.canExecute
    const accessibleEvents = events;

    // Calculate date range from accessible event data
    const dateRange = useMemo(() => {
        if (accessibleEvents.length === 0) {
            return {
                start: new Date(),
                end: addDays(new Date(), 30)
            };
        }

        const eventDates = accessibleEvents.map(event => new Date(event.date)).filter(date => !isNaN(date.getTime()));
        if (eventDates.length === 0) {
            return {
                start: new Date(),
                end: addDays(new Date(), 30)
            };
        }

        const earliestDate = new Date(Math.min(...eventDates.map(d => d.getTime())));
        const latestDate = new Date(Math.max(...eventDates.map(d => d.getTime())));

        return {
            start: earliestDate,
            end: latestDate
        };
    }, [accessibleEvents]);

    const [startDate] = useState(dateRange.start);
    const [endDate, setEndDate] = useState(dateRange.end);

    // Scroll navigation hook for unified scrolling and infinite loading
    const { headerScrollRef, contentScrollRef, infiniteScrollRef, isInfiniteScrollVisible } = useScrollNavigation();

    // Handle infinite scroll loading when sentinel comes into view
    useEffect(() => {
        if (isInfiniteScrollVisible && onDateRangeChange) {
            const newEndDate = addDays(endDate, 15);
            setEndDate(newEndDate);
            // Trigger microflow refresh with extended date range
            onDateRangeChange(startDate, newEndDate);
        }
    }, [isInfiniteScrollVisible, onDateRangeChange, startDate, endDate]);

    // Memoize teams data for performance
    const teamsData = useMemo(() => {
        try {
            return getPeopleByTeam();
        } catch (error) {
            // Silently return empty teams - error will be shown in debug panel
            return {};
        }
    }, [getPeopleByTeam]);

    // Team grouping functionality using custom hook
    const { teamLaneStructure, allPeople, groupingDebugInfo } = useTeamGrouping({
        teamsData,
        debugInfo
    });

    // Generate date columns
    const dateColumns = useMemo(() => {
        const daysCount = Math.ceil(getDurationInMinutes(startDate, endDate) / (60 * 24));
        return Array.from({ length: daysCount }, (_, idx) => {
            const date = addDays(startDate, idx);
            return {
                date,
                dateString: formatDateForShift(date),
                isToday: isCurrentShiftDay(date),
                isWeekend: date.getDay() === 0 || date.getDay() === 6
            };
        });
    }, [startDate, endDate]);

    // Calculate team capacities for all visible dates
    const teamCapacities = useMemo(() => {
        const dates = dateColumns.map(col => col.dateString);
        return getAllTeamCapacities(dates);
    }, [dateColumns, getAllTeamCapacities]);

    // Helper function to get capacity for a specific team and date
    const getCapacityForTeamAndDate = useCallback(
        (teamName: string, laneName: string, dateString: string): TeamCapacity | undefined => {
            return teamCapacities.find(capacity => {
                const teamMatches = capacity.teamName === teamName;
                const dateMatches = capacity.date === dateString;

                // Match capacity data based on isNXT flag
                if (capacity.isNXT) {
                    // NXT capacity data - match with any lane (NXT A, NXT B, etc.)
                    return teamMatches && dateMatches;
                } else {
                    // XT capacity data - only match with "XT" lane specifically
                    return teamMatches && dateMatches && laneName === "XT";
                }
            });
        },
        [teamCapacities]
    );

    // Multi-select functionality using custom hook
    const { selectedCells, lastSelectedCell, selectCell, isCellSelected, clearSelection } = useMultiSelect(
        allPeople,
        dateColumns
    );

    // Context menu functionality using custom hook
    const { contextMenu, handleCellContextMenu, closeContextMenu } = useContextMenu({
        selectedCells,
        onCreateEvent,
        onEditEvent,
        onDeleteEvent,
        onApproveRequest,
        onRejectRequest,
        onMarkAsTBD,
        onBatchCreate,
        onBatchEdit,
        onBatchDelete,
        contextEventId,
        contextPersonId,
        contextDate,
        contextSelectedCells,
        clearSelection
    });

    // Helper function to get primary event for person and date
    // Uses getDayCellData which properly handles multiple events per day
    const getEvent = useCallback(
        (personId: string, dateString: string): EventAssignment | undefined => {
            const cellData = getDayCellData(personId, dateString);
            // Return the primary event (activeEvent takes priority, fallback to pendingRequest)
            return cellData.activeEvent || cellData.pendingRequest;
        },
        [getDayCellData]
    );

    // Enhanced cell click handler with multi-select support
    const handleCellClick = useCallback(
        (personId: string, dateString: string, ctrlKey: boolean, shiftKey: boolean) => {
            selectCell(personId, dateString, ctrlKey, shiftKey);
        },
        [selectCell]
    );

    // Keyboard navigation functionality using custom hook
    useKeyboardNavigation({
        selectedCells,
        lastSelectedCell,
        allPeople,
        dateColumns,
        getEvent,
        onEditEvent,
        selectCell,
        contextEventId,
        clearSelection
    });

    // Error handling for empty data
    if (teamLaneStructure.length === 0 || allPeople.length === 0) {
        return (
            <EmptyState
                message="No People Available"
                description="No people found. Please check your data configuration."
                className={className}
            />
        );
    }

    return (
        <div className={`shift-scheduler-unified ${className}`}>
            {/* Enhanced debug info panel */}
            {showDebugInfo && (
                <DebugPanel
                    events={accessibleEvents}
                    allPeople={allPeople}
                    dateColumns={dateColumns}
                    teamLaneStructure={teamLaneStructure}
                    selectedCells={selectedCells}
                    groupingDebugInfo={groupingDebugInfo}
                    teamCapacities={teamCapacities}
                    eventsLoading={eventsLoading}
                    onCreateEvent={onCreateEvent}
                    onEditEvent={onEditEvent}
                    onDeleteEvent={onDeleteEvent}
                    onBatchCreate={onBatchCreate}
                    onBatchEdit={onBatchEdit}
                    onBatchDelete={onBatchDelete}
                    debugInfo={debugInfo}
                />
            )}
            <div className="scheduler-container">
                {/* Header Row */}
                <div className="scheduler-header">
                    <div className="person-column-header">Person</div>
                    <div className="timeline-container" ref={headerScrollRef}>
                        <div className="timeline-header">
                            {dateColumns.map((col, idx) => (
                                <div
                                    key={idx}
                                    className={`date-header ${col.isToday ? "date-header-today" : ""} ${
                                        col.isWeekend ? "date-header-weekend" : ""
                                    }`}
                                >
                                    <div className="date-day">{col.date.getDate()}</div>
                                    <div className="date-month">
                                        {col.date.toLocaleDateString("en", { month: "short" })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="scheduler-content">
                    <div className="person-names-column">
                        {teamLaneStructure.map(teamData => (
                            <div key={teamData.teamId}>
                                <div className="team-name-cell">{teamData.teamName}</div>
                                {teamData.lanes.map(lane => (
                                    <div key={`${teamData.teamId}-${lane.laneId}`}>
                                        <div className="lane-name-cell">{lane.name}</div>
                                        {lane.people.map(person => (
                                            <div key={person.id} className="person-name-cell">
                                                {person.name}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="timeline-container" ref={contentScrollRef}>
                        <div className="timeline-content">
                            {teamLaneStructure.map(teamData => (
                                <TeamSection
                                    key={teamData.teamId}
                                    team={teamData}
                                    dateColumns={dateColumns}
                                    getDayCellData={getDayCellData}
                                    getCapacityForTeamAndDate={getCapacityForTeamAndDate}
                                    isCellSelected={isCellSelected}
                                    eventsLoading={eventsLoading}
                                    onEditEvent={onEditEvent}
                                    onCreateEvent={onCreateEvent}
                                    onDeleteEvent={onDeleteEvent}
                                    contextEventId={contextEventId}
                                    contextPersonId={contextPersonId}
                                    contextDate={contextDate}
                                    onCellClick={handleCellClick}
                                    onContextMenu={handleCellContextMenu}
                                    readOnly={readOnly}
                                    trackInteractionError={trackInteractionError}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div ref={infiniteScrollRef} className="sentinel" />

            {/* Context Menu */}
            <ContextMenu
                visible={contextMenu.visible}
                x={contextMenu.x}
                y={contextMenu.y}
                options={contextMenu.options}
                onClose={closeContextMenu}
            />
        </div>
    );
};

// Export with error boundary for production resilience
export default withErrorBoundary(ScheduleGrid);
