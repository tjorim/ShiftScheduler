import React from "react";
import { ObjectItem, ActionValue } from "mendix";

// Enhanced Engineer interface with generic grouping
export interface Engineer {
    id: string; // SPUser.id - MUST match ShiftAssignment.engineerId
    name: string; // Display name from microflow
    team: string; // Team name for grouping - MUST match TeamCapacity.teamName
    lane: string; // Lane name for grouping (e.g., "XT", "NXT A", "NXT B")
    mendixObject: ObjectItem;
}

// Enhanced ShiftAssignment interface matching CalendarEvents
// Supports both active events and pending requests
export interface ShiftAssignment {
    id: string;
    date: string; // ISO date string YYYY-MM-DD for display/lookup
    engineerId: string;
    shift: ShiftType;
    eventType?: string;
    status?: ShiftStatus;
    isRequest?: boolean; // True for requests, false for assignments
    replacesEventId?: string; // ID of event this request would replace
    shiftDate?: Date; // The actual shift date from CalendarEvents_Shift/Shift/Date
    comment?: string;
    reasonApprover?: string;
    mendixObject: ObjectItem;
}

// Shift types based on domain model
export type ShiftType = "M" | "E" | "N" | "D" | "H" | "T";

// Shift status types - enhanced for request workflow
export type ShiftStatus = "Active" | "Inactive" | "Pending" | "Rejected" | "planned" | "approved" | "error";

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

// Data structure for multiple events per day cell
// Enables display of both active events and pending requests
export interface DayCellData {
    activeEvent?: ShiftAssignment; // Status = 'Active', isRequest = false
    pendingRequest?: ShiftAssignment; // Status = 'Pending', isRequest = true
    inactiveEvents?: ShiftAssignment[]; // Status = 'Inactive' (for filtering)
    rejectedRequests?: ShiftAssignment[]; // Status = 'Rejected' (for filtering)
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
    cellData?: DayCellData; // New: supports multiple events per day
    shift?: ShiftAssignment; // Legacy: backward compatibility
    isToday?: boolean;
    isWeekend?: boolean;
    isSelected?: boolean;
    shiftsLoading?: boolean;
    onDoubleClick: () => void;
    onCellClick: (e: React.MouseEvent) => void;
    onContextMenu?: (
        e: React.MouseEvent,
        engineer: Engineer,
        date: string,
        shift?: ShiftAssignment,
        eventType?: "active" | "request"
    ) => void;
    readOnly?: boolean;
    trackInteractionError?: (error: string) => void;
    // Filter options for displaying different event types
    showInactiveEvents?: boolean;
    showRequests?: boolean;
    onlyShowLTF?: boolean;
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
    getDayCellData: (engineerId: string, date: string) => DayCellData;
    updateShift: (shiftId: string, updates: Partial<ShiftAssignment>) => void;
    getEngineerById: (engineerId: string) => Engineer | undefined;
    getShiftsByDateRange: (startDate: string, endDate: string) => ShiftAssignment[];
    refreshData: () => void;
    getAllTeamCapacities: (dates: string[]) => TeamCapacity[];
    trackInteractionError: (error: string) => void;
    debugInfo: {
        attributesConfigured: {
            name: boolean;
            team: boolean; // Team attribute configured
            lane: boolean; // Lane attribute configured
            spUserAssociation: boolean;
            eventDate: boolean;
            teamCapacities: boolean;
        };
        microflowInfo: {
            message: string;
        };
        microflowValidation: {
            engineers: {
                status: string;
                itemCount: number;
                expectedMicroflow: string;
                expectedFields: string[];
                actualFields: string[];
                sampleData: {
                    id: string;
                    attributes: string[];
                } | null;
            };
            shifts: {
                status: string;
                itemCount: number;
                expectedMicroflow: string;
                expectedFields: string[];
                actualFields: string[];
                sampleData: {
                    id: string;
                    attributes: string[];
                } | null;
            };
            teamCapacities: {
                status: string;
                itemCount: number;
                expectedMicroflow: string;
                expectedFields: string[];
                actualFields: string[];
                sampleData: {
                    id: string;
                    attributes: string[];
                } | null;
            };
        };
        processingErrors: string[];
        interactionErrors: string[];
        dataQualityIssues: string[];
    };
}

// Team capacity interfaces
export interface TeamCapacity {
    teamName: string; // Team name - MUST match Engineer.team for proper grouping
    isNXT: boolean; // Department type: true = NXT, false = XT
    date: string; // ISO date string
    weekNumber: number; // Week number for target lookup
    percentage: number; // Capacity percentage from database
    target: number; // Target % from database (0 if no target)
    meetsTarget: boolean; // percentage >= target
}

export interface TeamCapacityProps {
    capacity: TeamCapacity;
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
