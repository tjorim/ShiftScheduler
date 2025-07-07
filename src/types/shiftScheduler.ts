import React from "react";
import { ObjectItem, ActionValue, EditableValue } from "mendix";

// Type alias for ISO date strings used throughout the application
type ISODateString = string; // Format: YYYY-MM-DD

// Enhanced Person interface with generic grouping
export interface Person {
    id: string; // SPUser.id - MUST match EventAssignment.personId
    name: string; // Display name from microflow
    team: string; // Team name for grouping - MUST match TeamCapacity.teamName
    lane: string; // Lane name for grouping (e.g., "XT", "NXT A", "NXT B"). Defaults to "General" if not specified
    mendixObject: ObjectItem;
}

// Enhanced EventAssignment interface matching CalendarEvents
// Supports both active events and pending requests
export interface EventAssignment {
    id: string;
    date: ISODateString; // ISO date string YYYY-MM-DD for display/lookup
    personId: string;
    eventType: EventType;
    status?: EventStatus;
    /** True for requests, false for assignments. Defaults to false if not specified. */
    isRequest?: boolean;
    /** ID of event this request would replace. Only valid when isRequest is true. */
    replacesEventId?: string;
    shiftDate?: Date; // The actual shift date from CalendarEvents_Shift/Shift/Date
    comment?: string;
    reasonApprover?: string;
    mendixObject: ObjectItem;
}

// Event types based on domain model
// M=Morning, E=Evening, N=Night, D=Day(9-17), H=Holiday/day off, T=Training, LTF=Long term flex
export type EventType = "M" | "E" | "N" | "D" | "H" | "T" | "LTF";

// Event status types - enhanced for request workflow
export type EventStatus = "active" | "inactive" | "pending" | "rejected" | "planned" | "approved" | "error" | "tbd";

// Type guards for validation
export const isValidEventStatus = (status: string): status is EventStatus => {
    return ["active", "inactive", "pending", "rejected", "planned", "approved", "error", "tbd"].includes(status);
};

export const isValidEventType = (eventType: string): eventType is EventType => {
    return ["M", "E", "N", "D", "H", "T", "LTF"].includes(eventType);
};

// Role types for people
export type RoleType = "TL" | "BTL" | "SPE" | "OSI";

// Team structure
export interface Team {
    id: string;
    name: string;
    people: Person[];
}

// Date range for shift planning
export interface DateRange {
    start: Date;
    end: Date;
}

// Event statistics
export interface EventStats {
    total: number;
    morning: number;
    evening: number;
    night: number;
    day: number;
    holiday: number;
    training: number;
    longTermFlex: number;
}

// Data structure for multiple events per day cell
// Enables display of both active events and pending requests
export interface DayCellData {
    activeEvent?: EventAssignment; // Status = 'active', isRequest = false
    pendingRequest?: EventAssignment; // Status = 'pending', isRequest = true
    inactiveEvents?: EventAssignment[]; // Status = 'inactive' (for filtering)
    rejectedRequests?: EventAssignment[]; // Status = 'rejected' (for filtering)
    plannedEvents?: EventAssignment[]; // Status = 'planned' (scheduled but not yet active)
    approvedEvents?: EventAssignment[]; // Status = 'approved' (approved events)
    errorEvents?: EventAssignment[]; // Status = 'error' (events with processing errors)
}

// DayCellData validation result
export interface DayCellDataValidationResult {
    isValid: boolean;
    errors: string[];
    invalidEvents: EventAssignment[];
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
    onCreateEvent?: ActionValue;
    onEditEvent?: ActionValue;
    onDeleteEvent?: ActionValue;
    onCopyEvent?: ActionValue;
    onBatchEdit?: ActionValue;
    onBatchCopy?: ActionValue;
    onBatchDelete?: ActionValue;
}

// Enhanced component props interfaces
export interface SchedulerComponentProps {
    people: Person[];
    events: EventAssignment[];
    dateRange: DateRange;
    actions: WidgetActions;
    loading?: boolean;
    readOnly?: boolean;
}

export interface DayCellProps {
    date: Date;
    person: Person;
    cellData: DayCellData;
    isToday?: boolean;
    isWeekend?: boolean;
    isSelected?: boolean;
    eventsLoading?: boolean;
    onDoubleClick: () => void;
    onCellClick: (e: React.MouseEvent) => void;
    onContextMenu?: (
        e: React.MouseEvent,
        person: Person,
        date: string,
        event?: EventAssignment,
        eventType?: "active" | "request"
    ) => void;
    readOnly?: boolean;
    trackInteractionError?: (error: string) => void;
}

// Base interface for shared schedule component props
interface BaseScheduleProps {
    dateColumns: Array<{
        date: Date;
        dateString: string;
        isToday: boolean;
        isWeekend: boolean;
    }>;
    getDayCellData: (personId: string, date: ISODateString) => DayCellData;
    isCellSelected: (personId: string, date: ISODateString) => boolean;
    eventsLoading?: boolean;
    // Event handlers
    onEditEvent?: ActionValue;
    onCreateEvent?: ActionValue;
    onDeleteEvent?: ActionValue;
    // Context attributes for passing data to microflows
    contextEventId?: EditableValue<string>;
    contextPersonId?: EditableValue<string>;
    contextDate?: EditableValue<string>;
    onCellClick: (personId: string, dateString: string, ctrlKey: boolean, shiftKey: boolean) => void;
    onContextMenu: (
        e: React.MouseEvent,
        person: Person,
        date: string,
        event?: EventAssignment,
        eventType?: "active" | "request"
    ) => void;
    readOnly?: boolean;
    trackInteractionError?: (error: string) => void;
    trackDataQualityIssue?: (issue: string) => void;
}

export interface PersonRowProps extends BaseScheduleProps {
    person: Person;
}

export interface LaneSectionProps extends BaseScheduleProps {
    lane: {
        name: string;
        laneId: string;
        people: Person[];
    };
    team: {
        teamName: string;
        teamId: string;
    };
    getCapacityForTeamAndDate: (teamName: string, laneName: string, dateString: string) => TeamCapacity | undefined;
}

export interface TeamSectionProps extends BaseScheduleProps {
    team: {
        teamName: string;
        teamId: string;
        lanes: Array<{
            name: string;
            laneId: string;
            people: Person[];
        }>;
    };
    getCapacityForTeamAndDate: (teamName: string, laneName: string, dateString: string) => TeamCapacity | undefined;
}

// Error interface for data validation
export interface ValidationError {
    message: string;
    property?: string;
}

// Data hook return type
export interface UseEventDataReturn {
    people: Person[];
    events: EventAssignment[];
    loading: boolean;
    eventsLoading: boolean;
    error?: ValidationError | null;
    getEventsForPerson: (personId: string) => EventAssignment[];
    getPeopleByTeam: () => { [team: string]: Person[] };
    getEventForDate: (personId: string, date: string) => EventAssignment | undefined;
    getDayCellData: (personId: string, date: ISODateString) => DayCellData;
    validateDayCellData: (
        cellData: DayCellData,
        expectedPersonId: string,
        expectedDate: string
    ) => DayCellDataValidationResult;
    updateEvent: (eventId: string, updates: Partial<EventAssignment>) => void;
    getPersonById: (personId: string) => Person | undefined;
    getEventsByDateRange: (startDate: string, endDate: string) => EventAssignment[];
    refreshData: () => void;
    getAllTeamCapacities: () => TeamCapacity[];
    trackInteractionError: (error: string) => void;
    trackProcessingError: (error: string) => void;
    trackDataQualityIssue: (issue: string) => void;
    clearErrors: (errorType?: keyof ErrorState) => void;
    debugInfo: {
        microflowConfiguration: {
            people: boolean;
            events: boolean;
            teamCapacities: boolean;
        };
        microflowInfo: {
            message: string;
        };
        microflowValidation: {
            people: {
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
            events: {
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
    teamName: string; // Team name - MUST match Person.team for proper grouping
    isNXT: boolean; // Department type: true = NXT, false = XT
    date: ISODateString; // ISO date string
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
    | "PERSON_NOT_FOUND"
    | "EVENT_OVERLAP"
    | "INSUFFICIENT_REST"
    | "INVALID_EVENT_TYPE"
    | "VALIDATION_FAILED"
    | "DATA_LOAD_ERROR";

export interface SchedulerErrorInfo {
    type: SchedulerError;
    message: string;
    details?: any;
}

// Enhanced error tracking types
export interface ErrorState {
    processingErrors: string[];
    interactionErrors: string[];
    dataQualityIssues: string[];
}

export type ErrorAction =
    | { type: "ADD_PROCESSING_ERROR"; payload: string }
    | { type: "ADD_INTERACTION_ERROR"; payload: string }
    | { type: "ADD_DATA_QUALITY_ISSUE"; payload: string }
    | { type: "CLEAR_ERRORS"; errorType: keyof ErrorState }
    | { type: "CLEAR_ALL_ERRORS" };

export interface ErrorTrackingProps {
    showDebugInfo?: boolean;
    trackProcessingError: (error: string) => void;
    trackInteractionError: (error: string) => void;
    trackDataQualityIssue: (issue: string) => void;
    clearErrors: (errorType?: keyof ErrorState) => void;
}
