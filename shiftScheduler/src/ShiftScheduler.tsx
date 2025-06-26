import { ReactElement, createElement, useCallback } from "react";
import { ShiftSchedulerContainerProps } from "../typings/ShiftSchedulerProps";
import ShiftSchedulerComponent from "./components/ShiftSchedulerComponent";
import { useShiftData } from "./hooks/useShiftData";
import "./ui/ShiftScheduler.css";

export function ShiftScheduler({
    name,
    class: className,
    style,
    tabIndex,
    engineers,
    shifts,
    nameAttribute,
    emailAttribute: _emailAttribute,
    teamAttribute,
    laneAttribute: _laneAttribute,
    startTimeAttribute,
    endTimeAttribute: _endTimeAttribute,
    dayTypeAttribute,
    eventTypeAttribute: _eventTypeAttribute,
    statusAttribute,
    engineerIdAttribute,
    onEdit,
    onCellClick
}: ShiftSchedulerContainerProps): ReactElement {
    const {
        engineers: engineerData,
        shifts: shiftsData,
        loading,
        error,
        getShiftsForEngineer,
        getEngineersByTeam
    } = useShiftData({
        engineersSource: engineers,
        shiftsSource: shifts,
        nameAttribute,
        teamAttribute,
        startTimeAttribute,
        dayTypeAttribute,
        statusAttribute,
        engineerIdAttribute
    });

    const handleEdit = useCallback(
        (_mxObject: any) => {
            if (onEdit && onEdit.canExecute) {
                onEdit.execute();
            }
        },
        [onEdit]
    );

    const handleCellClick = useCallback(
        (_engineerId: string, _date: string) => {
            if (onCellClick && onCellClick.canExecute) {
                onCellClick.execute();
            }
        },
        [onCellClick]
    );

    // Error state
    if (error) {
        return (
            <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex}>
                <div className="shift-scheduler-error">
                    <h3>⚠️ Configuration Error</h3>
                    <p>{error.message}</p>
                    {error.property && (
                        <p><small>Check the '{error.property}' property in the widget configuration.</small></p>
                    )}
                </div>
            </div>
        );
    }

    // Loading state
    if (loading) {
        return (
            <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex}>
                <div className="shift-scheduler-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading schedule data...</p>
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
            <ShiftSchedulerComponent
                engineers={engineerData}
                shifts={shiftsData}
                getShiftsForEngineer={getShiftsForEngineer}
                getEngineersByTeam={getEngineersByTeam}
                onEdit={handleEdit}
                onCellClick={handleCellClick}
            />
        </div>
    );
}
