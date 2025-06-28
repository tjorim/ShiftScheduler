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

    const handleEditShift = useCallback(
        (_shift: any) => {
            if (onEditShift && onEditShift.canExecute && !onEditShift.isExecuting) {
                onEditShift.execute();
            }
        },
        [onEditShift]
    );

    // Context menu action handlers
    const handleCreateShift = useCallback(
        (_engineerId: string, _date: string) => {
            if (onCreateShift && onCreateShift.canExecute && !onCreateShift.isExecuting) {
                onCreateShift.execute();
            }
        },
        [onCreateShift]
    );

    const handleDeleteShift = useCallback(
        (_shift: any) => {
            if (onDeleteShift && onDeleteShift.canExecute && !onDeleteShift.isExecuting) {
                onDeleteShift.execute();
            }
        },
        [onDeleteShift]
    );

    const handleBatchEdit = useCallback(
        (selectedCells: Array<{ engineerId: string; date: string }>) => {
            if (onBatchEdit && onBatchEdit.canExecute && !onBatchEdit.isExecuting) {
                // Get event IDs for cells that have shifts
                const eventIds = selectedCells
                    .map(cell => {
                        const shift = shiftsData.find(s => s.engineerId === cell.engineerId && s.date === cell.date);
                        return shift?.id;
                    })
                    .filter(Boolean)
                    .join(",");

                if (eventIds) {
                    onBatchEdit.execute();
                }
            }
        },
        [onBatchEdit, shiftsData]
    );

    const handleBatchDelete = useCallback(
        (selectedCells: Array<{ engineerId: string; date: string }>) => {
            if (onBatchDelete && onBatchDelete.canExecute && !onBatchDelete.isExecuting) {
                // Get event IDs for cells that have shifts
                const eventIds = selectedCells
                    .map(cell => {
                        const shift = shiftsData.find(s => s.engineerId === cell.engineerId && s.date === cell.date);
                        return shift?.id;
                    })
                    .filter(Boolean)
                    .join(",");

                if (eventIds) {
                    onBatchDelete.execute();
                }
            }
        },
        [onBatchDelete, shiftsData]
    );

    const handleBatchCreate = useCallback(
        (selectedCells: Array<{ engineerId: string; date: string }>) => {
            if (onBatchCreate && onBatchCreate.canExecute && !onBatchCreate.isExecuting) {
                // Get empty cells (cells without shifts)
                const emptyCells = selectedCells.filter(cell => {
                    const shift = shiftsData.find(s => s.engineerId === cell.engineerId && s.date === cell.date);
                    return !shift;
                });

                if (emptyCells.length > 0) {
                    onBatchCreate.execute();
                }
            }
        },
        [onBatchCreate, shiftsData]
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
                onEditShift={handleEditShift}
                onCreateShift={handleCreateShift}
                onDeleteShift={handleDeleteShift}
                onBatchCreate={handleBatchCreate}
                onBatchEdit={handleBatchEdit}
                onBatchDelete={handleBatchDelete}
                showDebugInfo={showDebugInfo}
                debugInfo={debugInfo}
                shiftsLoading={shiftsLoading}
            />
        </div>
    );
}
