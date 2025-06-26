import { ReactElement, createElement, useCallback } from "react";
import ShiftScheduler from "./components/ShiftSchedulerComponent";
import { ShiftSchedulerContainerProps } from "../typings/ShiftSchedulerProps";
import { useShiftData } from "./hooks/useShiftData";
import "./ui/ShiftScheduler.css";

export function ShiftSchedulerWidget({
    name,
    class: className,
    style,
    tabIndex,
    engineers,
    shifts,
    nameAttribute,
    teamAttribute,
    startTimeAttribute,
    dayTypeAttribute,
    statusAttribute,
    engineerIdAttribute,
    onEdit,
    onCellClick
}: ShiftSchedulerContainerProps): ReactElement {
    const {
        engineers: engineerData,
        shifts: shiftsData,
        loading,
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

    if (loading) {
        return (
            <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex}>
                <div className="shift-scheduler-loading">Loading schedule...</div>
            </div>
        );
    }

    return (
        <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex} data-widget-name={name}>
            <ShiftScheduler
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
