import { ObjectItem, ActionValue } from "mendix";

// Enhanced Engineer interface matching our domain model
export interface Engineer {
    id: string;
    name: string;
    email?: string;
    team: string;
    lanes: string[];
    isXT?: boolean;
    isNXT?: boolean;
    isGEN?: boolean;
    isSupport?: boolean;
    mendixObject: ObjectItem;
}

// Enhanced ShiftAssignment interface matching CalendarEvents
export interface ShiftAssignment {
    id: string;
    date: string; // ISO date string YYYY-MM-DD
    engineerId: string;
    shift: ShiftType;
    eventType?: string;
    status?: ShiftStatus;
    startTime?: Date;
    endTime?: Date;
    comment?: string;
    reasonApprover?: string;
    mendixObject: ObjectItem;
}

// Shift types based on domain model
export type ShiftType = "M" | "E" | "N" | "D" | "H" | "T";

// Shift status types
export type ShiftStatus = "planned" | "approved" | "rejected" | "pending";

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
    onShiftCreate?: ActionValue;
    onShiftUpdate?: ActionValue;
    onShiftDelete?: ActionValue;
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
    onEdit: () => void;
    onCellClick: () => void;
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

// Data hook return type
export interface UseShiftDataReturn {
    engineers: Engineer[];
    shifts: ShiftAssignment[];
    loading: boolean;
    error?: string;
    getShiftsForEngineer: (engineerId: string) => ShiftAssignment[];
    getEngineersByTeam: () => { [team: string]: Engineer[] };
    getShiftForDate: (engineerId: string, date: string) => ShiftAssignment | undefined;
    updateShift: (shiftId: string, updates: Partial<ShiftAssignment>) => void;
    getEngineerById: (engineerId: string) => Engineer | undefined;
    getShiftsByDateRange: (startDate: string, endDate: string) => ShiftAssignment[];
    refreshData: () => void;
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

