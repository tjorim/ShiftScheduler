import { ReactElement, createElement, useEffect } from "react";
import { ShiftSchedulerContainerProps } from "../typings/ShiftSchedulerProps";
import ScheduleGrid from "./components/ScheduleGrid";
import { useShiftData } from "./hooks/useShiftData";
import "./ui/ShiftScheduler.css";

/**
 * Renders the shift scheduling interface, displaying engineers and their shifts with capacity and team data.
 *
 * Handles loading, error, and empty states, and passes all relevant data and event handlers to the underlying schedule grid component for interaction and display.
 */
export function ShiftScheduler({
    name,
    class: className,
    style,
    tabIndex,
    engineers,
    shifts,
    teamCapacities,
    startDateAttribute,
    endDateAttribute,
    nameAttribute,
    teamAttribute,
    laneAttribute,
    showDebugInfo,
    dayTypeAttribute,
    eventTypeAttribute: _eventTypeAttribute,
    statusAttribute,
    spUserAssociation,
    spUserDatasource: _spUserDatasource,
    eventDateAttribute,
    contextShiftId,
    contextEngineerId,
    contextDate,
    contextSelectedCells,
    onEditShift,
    onCreateShift,
    onDeleteShift,
    onBatchCreate,
    onBatchEdit,
    onBatchDelete
}: ShiftSchedulerContainerProps): ReactElement {
    const {
        engineers: engineerData,
        shifts: shiftsData,
        loading,
        shiftsLoading,
        error,
        getShiftsForEngineer,
        getEngineersByTeam,
        getDayCellData,
        getAllTeamCapacities,
        trackInteractionError,
        debugInfo
    } = useShiftData({
        engineersSource: engineers,
        shiftsSource: shifts,
        nameAttribute,
        teamAttribute,
        laneAttribute,
        dayTypeAttribute,
        statusAttribute,
        spUserAssociation,
        eventDateAttribute,
        teamCapacitiesSource: teamCapacities
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

    // Loading state - only show if engineers haven't loaded yet
    if (loading && (!engineerData || engineerData.length === 0)) {
        return (
            <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex}>
                <div className="shift-scheduler-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading engineers...</p>
                </div>
            </div>
        );
    }

    // Empty state
    if (!engineerData || engineerData.length === 0) {
        return (
            <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex}>
                <div className="shift-scheduler-empty">
                    <h3>📅 No Data Available</h3>
                    <p>No engineers found. Please check your data source configuration.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex} data-widget-name={name}>
            <ScheduleGrid
                engineers={engineerData}
                shifts={shiftsData}
                getShiftsForEngineer={getShiftsForEngineer}
                getEngineersByTeam={getEngineersByTeam}
                getDayCellData={getDayCellData}
                getAllTeamCapacities={getAllTeamCapacities}
                onEditShift={onEditShift}
                onCreateShift={onCreateShift}
                onDeleteShift={onDeleteShift}
                contextShiftId={contextShiftId}
                contextEngineerId={contextEngineerId}
                contextDate={contextDate}
                contextSelectedCells={contextSelectedCells}
                onBatchCreate={onBatchCreate}
                onBatchEdit={onBatchEdit}
                onBatchDelete={onBatchDelete}
                showDebugInfo={showDebugInfo}
                debugInfo={debugInfo}
                shiftsLoading={shiftsLoading}
                // Date range navigation for microflow refresh
                trackInteractionError={trackInteractionError}
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
