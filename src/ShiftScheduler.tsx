import { ReactElement, createElement } from "react";
import { ShiftSchedulerContainerProps } from "../typings/ShiftSchedulerProps";
import ScheduleGrid from "./components/ScheduleGrid";
import { useShiftData } from "./hooks/useShiftData";
import "./ui/ShiftScheduler.css";

export function ShiftScheduler({
    name,
    class: className,
    style,
    tabIndex,
    engineers,
    shifts,
    filters,
    nameAttribute,
    headerAttribute,
    subheaderAttribute,
    showDebugInfo,
    dayTypeAttribute,
    eventTypeAttribute: _eventTypeAttribute,
    statusAttribute,
    spUserAssociation,
    spUserDatasource: _spUserDatasource,
    shiftAssociation,
    shiftDatasource: _shiftDatasource,
    shiftDateAttribute,
    filterTeamAssociation,
    teamDatasource: _teamDatasource,
    filterLaneAssociation,
    laneDatasource: _laneDatasource,
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
        debugInfo
    } = useShiftData({
        engineersSource: engineers,
        shiftsSource: shifts,
        filtersSource: filters,
        nameAttribute,
        headerAttribute,
        subheaderAttribute,
        dayTypeAttribute,
        statusAttribute,
        spUserAssociation,
        shiftAssociation,
        shiftDateAttribute,
        filterTeamAssociation,
        filterLaneAssociation
    });

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
            />
        </div>
    );
}
