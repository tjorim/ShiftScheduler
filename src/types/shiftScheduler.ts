import React from "react";
import { ObjectItem, ActionValue } from "mendix";

// Enhanced Engineer interface with generic grouping
export interface Engineer {
    id: string;
    name: string;
    header: string; // Primary grouping (e.g., Team)
    subheader: string; // Secondary grouping (e.g., Lane)
    mendixObject: ObjectItem;
}

// Enhanced ShiftAssignment interface matching CalendarEvents
export interface ShiftAssignment {
    id: string;
    date: string; // ISO date string YYYY-MM-DD for display/lookup
    engineerId: string;
    shift: ShiftType;
    eventType?: string;
    status?: ShiftStatus;
    shiftDate?: Date; // The actual shift date from CalendarEvents_Shift/Shift/Date
    comment?: string;
    reasonApprover?: string;
    mendixObject: ObjectItem;
}

// Shift types based on domain model
export type ShiftType = "M" | "E" | "N" | "D" | "H" | "T";

// Shift status types
export type ShiftStatus = "planned" | "approved" | "rejected" | "pending" | "error";

// Role types for engineers
export type RoleType = "TL" | "BTL" | "SPE" | "OSI";

// Team structure
export interface Team {
    id: string;
    name: string;
    engineers: Engineer[];
}

// Date range for shift planning
export interface DateRange {
    start: Date;
    end: Date;
}

// Shift statistics
export interface ShiftStats {
    total: number;
    morning: number;
    evening: number;
    night: number;
    dayOff: number;
    holiday: number;
    training: number;
}

// Validation result
export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings?: string[];
}

// Widget action handlers
export interface WidgetActions {
    onEdit?: ActionValue;
    onCellClick?: ActionValue;
    onCreateShift?: ActionValue;
    onEditShift?: ActionValue;
    onDeleteShift?: ActionValue;
    onCopyShift?: ActionValue;
    onBatchEdit?: ActionValue;
    onBatchCopy?: ActionValue;
    onBatchDelete?: ActionValue;
}

// Enhanced component props interfaces
export interface SchedulerComponentProps {
    engineers: Engineer[];
    shifts: ShiftAssignment[];
    dateRange: DateRange;
    actions: WidgetActions;
    loading?: boolean;
    readOnly?: boolean;
}

export interface DayCellProps {
    date: Date;
    engineer: Engineer;
    shift?: ShiftAssignment;
    isToday?: boolean;
    isWeekend?: boolean;
    isSelected?: boolean;
    shiftsLoading?: boolean;
    onDoubleClick: () => void;
    onCellClick: (e: React.MouseEvent) => void;
    onContextMenu?: (e: React.MouseEvent, engineer: Engineer, date: string, shift?: ShiftAssignment) => void;
    readOnly?: boolean;
}

export interface EngineerRowProps {
    engineer: Engineer;
    startDate: Date;
    daysCount: number;
    shifts: ShiftAssignment[];
    onEdit: (shift?: ShiftAssignment) => void;
    onCellClick: (engineerId: string, date: string) => void;
    readOnly?: boolean;
}

export interface TeamSectionProps {
    team: Team;
    startDate: Date;
    daysCount: number;
    shifts: ShiftAssignment[];
    onEdit: (shift?: ShiftAssignment) => void;
    onCellClick: (engineerId: string, date: string) => void;
    readOnly?: boolean;
}

// Error interface for data validation
export interface ValidationError {
    message: string;
    property?: string;
}

// Data hook return type
export interface UseShiftDataReturn {
    engineers: Engineer[];
    shifts: ShiftAssignment[];
    loading: boolean;
    shiftsLoading: boolean;
    error?: ValidationError | null;
    getShiftsForEngineer: (engineerId: string) => ShiftAssignment[];
    getEngineersByTeam: () => { [team: string]: Engineer[] };
    getShiftForDate: (engineerId: string, date: string) => ShiftAssignment | undefined;
    updateShift: (shiftId: string, updates: Partial<ShiftAssignment>) => void;
    getEngineerById: (engineerId: string) => Engineer | undefined;
    getShiftsByDateRange: (startDate: string, endDate: string) => ShiftAssignment[];
    refreshData: () => void;
    debugInfo: {
        attributesConfigured: {
            name: boolean;
            header: boolean;
            subheader: boolean;
            spUserAssociation: boolean;
            shiftAssociation: boolean;
            shiftDate: boolean;
            filters: boolean;
            filterTeamAssociation: boolean;
            filterLaneAssociation: boolean;
        };
        filterInfo: {
            hasFilters: boolean;
            allowedHeaders: string[];
            allowedSubheaders: string[];
        };
    };
}

// Error types
export type SchedulerError =
    | "INVALID_DATE_RANGE"
    | "ENGINEER_NOT_FOUND"
    | "SHIFT_OVERLAP"
    | "INSUFFICIENT_REST"
    | "INVALID_SHIFT_TYPE"
    | "VALIDATION_FAILED"
    | "DATA_LOAD_ERROR";

export interface SchedulerErrorInfo {
    type: SchedulerError;
    message: string;
    details?: any;
}
