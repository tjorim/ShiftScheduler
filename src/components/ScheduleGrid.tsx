import React, { createElement, useEffect, useState, useMemo, useCallback } from "react";
// ✅ COMPONENT DECOMPOSITION COMPLETED
// Successfully extracted all major functionality into reusable hooks:
// ✅ useMultiSelect - Multi-select functionality with keyboard modifiers
// ✅ useKeyboardNavigation - Arrow keys, enter, escape handling
// ✅ useContextMenu - Context menu state and option generation
// ✅ useTeamGrouping - Team/lane structure processing
// This refactoring significantly improved cognitive load and enabled better unit testing
import type { ActionValue, Option } from "mendix";
import dayjs, { addDays, formatISODate, isCurrentShiftDay } from "../utils/dateHelpers";
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
    onEditEvent?: ActionValue<{ eventId: Option<string> }>;
    onCreateEvent?: ActionValue<{ personId: Option<string>; date: Option<string> }>;
    onDeleteEvent?: ActionValue<{ eventId: Option<string> }>;
    onApproveRequest?: ActionValue<{ eventId: Option<string> }>;
    onRejectRequest?: ActionValue<{ eventId: Option<string> }>;
    onMarkAsTBD?: ActionValue<{ eventId: Option<string> }>;
    onBatchCreate?: ActionValue<{ selectedCellsJson: Option<string> }>;
    onBatchEdit?: ActionValue<{ selectedCellsJson: Option<string> }>;
    onBatchDelete?: ActionValue<{ selectedCellsJson: Option<string> }>;
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
    trackDataQualityIssue?: (issue: string) => void;
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
    trackInteractionError,
    trackDataQualityIssue
}) => {
    // Use all events; UI action availability is gated via ActionValue.canExecute. Data access is enforced server-side.
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

    const [startDate, setStartDate] = useState(dateRange.start);
    const [endDate, setEndDate] = useState(dateRange.end);

    // Sync dates when dateRange changes
    useEffect(() => {
        setStartDate(dateRange.start);
        setEndDate(prev => (prev < dateRange.end ? dateRange.end : prev)); // don't shrink if user extended
    }, [dateRange.start, dateRange.end]);

    // Scroll navigation hook for unified scrolling and infinite loading
    const { headerScrollRef, contentScrollRef, infiniteScrollRef, isInfiniteScrollVisible } = useScrollNavigation();

    // Tracks the last endDate we extended to prevent duplicate extensions while the sentinel remains visible
    const lastExtendedEndRef = React.useRef<number>(0);
    // Re-entrancy guard to avoid multiple extensions during the same visible period
    const isExtendingRef = React.useRef<boolean>(false);

    // Handle infinite scroll loading when sentinel comes into view
    useEffect(() => {
        if (!isInfiniteScrollVisible || !onDateRangeChange || isExtendingRef.current) {
            return;
        }
        // Prevent duplicate extensions for the same endDate
        if (lastExtendedEndRef.current === endDate.getTime()) {
            return;
        }
        isExtendingRef.current = true;
        const newEndDate = addDays(endDate, 15);
        lastExtendedEndRef.current = endDate.getTime();
        setEndDate(newEndDate);
        onDateRangeChange(startDate, newEndDate);
    }, [isInfiniteScrollVisible, onDateRangeChange, startDate, endDate]);

    // Reset re-entrancy guard when the sentinel leaves view
    useEffect(() => {
        if (!isInfiniteScrollVisible) {
            isExtendingRef.current = false;
        }
    }, [isInfiniteScrollVisible]);

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
        const daysCount = dayjs(endDate).diff(dayjs(startDate), "day") + 1;
        return Array.from({ length: daysCount }, (_, idx) => {
            const date = addDays(startDate, idx);
            return {
                date,
                dateString: formatISODate(date),
                isToday: isCurrentShiftDay(date),
                isWeekend: [0, 6].includes(dayjs(date).day())
            };
        });
    }, [startDate, endDate]);

    // Calculate team capacities for all visible dates
    const teamCapacities = useMemo(() => {
        const dates = dateColumns.map(col => col.dateString);
        return getAllTeamCapacities(dates);
    }, [dateColumns, getAllTeamCapacities]);

    // Build capacity index once for O(1) lookup performance
    const capacityIndex = useMemo(() => {
        const index = new Map<string, TeamCapacity>();
        for (const capacity of teamCapacities) {
            // XT entries only map to XT lane; NXT entries map to any lane
            const keys = capacity.isNXT
                ? [`${capacity.teamName}::${capacity.date}::ANY`]
                : [`${capacity.teamName}::${capacity.date}::XT`];
            for (const key of keys) {
                index.set(key, capacity);
            }
        }
        return index;
    }, [teamCapacities]);

    // Helper function to get capacity for a specific team and date (O(1) lookup)
    const getCapacityForTeamAndDate = useCallback(
        (teamName: string, laneName: string, dateString: string): TeamCapacity | undefined => {
            const key = `${teamName}::${dateString}::${laneName === "XT" ? "XT" : "ANY"}`;
            return capacityIndex.get(key);
        },
        [capacityIndex]
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
                            {dateColumns.map(col => (
                                <div
                                    key={col.dateString}
                                    className={`date-header ${col.isToday ? "date-header-today" : ""} ${
                                        col.isWeekend ? "date-header-weekend" : ""
                                    }`}
                                >
                                    <div className="date-day">{dayjs(col.date).date()}</div>
                                    <div className="date-month">{dayjs(col.date).format("MMM")}</div>
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
                                    onCellClick={handleCellClick}
                                    onContextMenu={handleCellContextMenu}
                                    readOnly={readOnly}
                                    trackInteractionError={trackInteractionError}
                                    trackDataQualityIssue={trackDataQualityIssue}
                                />
                            ))}
                            <div ref={infiniteScrollRef} className="sentinel" aria-hidden />
                        </div>
                    </div>
                </div>
            </div>

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
