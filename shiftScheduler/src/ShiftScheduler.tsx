import { ReactElement, createElement, useCallback } from "react";
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
    nameAttribute,
    headerAttribute,
    subheaderAttribute,
    showDebugInfo,
    startTimeAttribute,
    endTimeAttribute: _endTimeAttribute,
    dayTypeAttribute,
    eventTypeAttribute: _eventTypeAttribute,
    statusAttribute,
    spUserAssociation,
    spUserDatasource: _spUserDatasource,
    shiftAssociation,
    shiftDatasource: _shiftDatasource,
    shiftDateAttribute,
    onEdit,
    onCellClick,
    onCreateShift,
    onEditShift,
    onDeleteShift,
    onCopyShift,
    onBatchEdit,
    onBatchCopy,
    onBatchDelete
}: ShiftSchedulerContainerProps): ReactElement {
    const {
        engineers: engineerData,
        shifts: shiftsData,
        loading,
        error,
        getShiftsForEngineer,
        getEngineersByTeam,
        debugInfo
    } = useShiftData({
        engineersSource: engineers,
        shiftsSource: shifts,
        nameAttribute,
        headerAttribute,
        subheaderAttribute,
        startTimeAttribute,
        dayTypeAttribute,
        statusAttribute,
        spUserAssociation,
        shiftAssociation,
        shiftDateAttribute
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

    // Context menu action handlers
    const handleCreateShift = useCallback(
        (_engineerId: string, _date: string, _shiftType: string) => {
            if (onCreateShift && onCreateShift.canExecute) {
                onCreateShift.execute();
            }
        },
        [onCreateShift]
    );

    const handleEditShift = useCallback(
        (_shift: any) => {
            if (onEditShift && onEditShift.canExecute) {
                onEditShift.execute();
            }
        },
        [onEditShift]
    );

    const handleDeleteShift = useCallback(
        (_shift: any) => {
            if (onDeleteShift && onDeleteShift.canExecute) {
                onDeleteShift.execute();
            }
        },
        [onDeleteShift]
    );

    const handleCopyShift = useCallback(
        (_shift: any) => {
            if (onCopyShift && onCopyShift.canExecute) {
                onCopyShift.execute();
            }
        },
        [onCopyShift]
    );

    const handleBatchEdit = useCallback(
        (_selectedCells: any[]) => {
            if (onBatchEdit && onBatchEdit.canExecute) {
                onBatchEdit.execute();
            }
        },
        [onBatchEdit]
    );

    const handleBatchCopy = useCallback(
        (_selectedCells: any[]) => {
            if (onBatchCopy && onBatchCopy.canExecute) {
                onBatchCopy.execute();
            }
        },
        [onBatchCopy]
    );

    const handleBatchDelete = useCallback(
        (_selectedCells: any[]) => {
            if (onBatchDelete && onBatchDelete.canExecute) {
                onBatchDelete.execute();
            }
        },
        [onBatchDelete]
    );

    // Error state
    if (error) {
        return (
            <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex}>
                <div className="shift-scheduler-error">
                    <h3>⚠️ Configuration Error</h3>
                    <p>{error.message}</p>
                    {error.property && (
                        <p>
                            <small>Check the '{error.property}' property in the widget configuration.</small>
                        </p>
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
            <ScheduleGrid
                engineers={engineerData}
                shifts={shiftsData}
                getShiftsForEngineer={getShiftsForEngineer}
                getEngineersByTeam={getEngineersByTeam}
                onEdit={handleEdit}
                onCellClick={handleCellClick}
                onCreateShift={handleCreateShift}
                onEditShift={handleEditShift}
                onDeleteShift={handleDeleteShift}
                onCopyShift={handleCopyShift}
                onBatchEdit={handleBatchEdit}
                onBatchCopy={handleBatchCopy}
                onBatchDelete={handleBatchDelete}
                showDebugInfo={showDebugInfo}
                debugInfo={debugInfo}
            />
        </div>
    );
}
