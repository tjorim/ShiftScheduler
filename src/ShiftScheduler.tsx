import { ReactElement, createElement, useEffect } from "react";
import { ShiftSchedulerContainerProps } from "../typings/ShiftSchedulerProps";
import ScheduleGrid from "./components/ScheduleGrid";
import { useEventData } from "./hooks/useEventData";
import "./ui/ShiftScheduler.css";

/**
 * Renders the event scheduling interface, displaying people and their events with capacity and team data.
 *
 * Handles loading, error, and empty states, and passes all relevant data and event handlers to the underlying schedule grid component for interaction and display.
 */
export function ShiftScheduler({
    name,
    class: className,
    style,
    tabIndex,
    people,
    events,
    teamCapacities,
    startDateAttribute,
    endDateAttribute,
    showDebugInfo,
    contextEventId,
    contextPersonId,
    contextDate,
    contextSelectedCells,
    onEditEvent,
    onCreateEvent,
    onDeleteEvent,
    onApproveRequest,
    onRejectRequest,
    onMarkAsTBD,
    onBatchCreate,
    onBatchEdit,
    onBatchDelete
}: ShiftSchedulerContainerProps): ReactElement {
    const {
        people: peopleData,
        events: eventsData,
        loading,
        eventsLoading,
        error,
        getPeopleByTeam,
        getDayCellData,
        getAllTeamCapacities,
        trackInteractionError,
        trackDataQualityIssue,
        debugInfo
    } = useEventData({
        peopleSource: people,
        eventsSource: events,
        teamCapacitiesSource: teamCapacities,
        showDebugInfo
    });

    // Date range parameter handling for microflows
    // Initialize date range parameters for shift and capacity microflows
    useEffect(() => {
        if (startDateAttribute && endDateAttribute) {
            // Set initial date range (current month) for microflows
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            // Update context attributes to trigger microflow refresh
            const currentStartValue = startDateAttribute.value;
            const currentEndValue = endDateAttribute.value;

            if (!currentStartValue || currentStartValue.getTime() !== startOfMonth.getTime()) {
                startDateAttribute.setValue(startOfMonth);
            }
            if (!currentEndValue || currentEndValue.getTime() !== endOfMonth.getTime()) {
                endDateAttribute.setValue(endOfMonth);
            }
        }
    }, [startDateAttribute, endDateAttribute]);

    // All action handling moved to ScheduleGrid - no wrapper handlers needed

    // Error state
    if (error) {
        return (
            <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex}>
                <div className="shift-scheduler-error">
                    <h3>⚠️ Configuration Error</h3>
                    <p>{error.message}</p>
                    {error.property && (
                        <p>
                            <small>Check the {error.property} property in the widget configuration.</small>
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // Loading state - only show if people haven't loaded yet
    if (loading && (!peopleData || peopleData.length === 0)) {
        return (
            <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex}>
                <div className="shift-scheduler-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading people...</p>
                </div>
            </div>
        );
    }

    // Empty state
    if (!peopleData || peopleData.length === 0) {
        return (
            <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex}>
                <div className="shift-scheduler-empty">
                    <h3>📅 No Data Available</h3>
                    <p>No people found. Please check your data source configuration.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex} data-widget-name={name}>
            <ScheduleGrid
                events={eventsData}
                getPeopleByTeam={getPeopleByTeam}
                getDayCellData={getDayCellData}
                getAllTeamCapacities={getAllTeamCapacities}
                onEditEvent={onEditEvent}
                onCreateEvent={onCreateEvent}
                onDeleteEvent={onDeleteEvent}
                onApproveRequest={onApproveRequest}
                onRejectRequest={onRejectRequest}
                onMarkAsTBD={onMarkAsTBD}
                contextEventId={contextEventId}
                contextPersonId={contextPersonId}
                contextDate={contextDate}
                contextSelectedCells={contextSelectedCells}
                onBatchCreate={onBatchCreate}
                onBatchEdit={onBatchEdit}
                onBatchDelete={onBatchDelete}
                showDebugInfo={showDebugInfo}
                debugInfo={debugInfo}
                eventsLoading={eventsLoading}
                // Date range navigation for microflow refresh
                trackInteractionError={trackInteractionError}
                trackDataQualityIssue={trackDataQualityIssue}
                onDateRangeChange={(startDate: Date, endDate: Date) => {
                    if (startDateAttribute && endDateAttribute) {
                        startDateAttribute.setValue(startDate);
                        endDateAttribute.setValue(endDate);
                    }
                }}
            />
        </div>
    );
}
