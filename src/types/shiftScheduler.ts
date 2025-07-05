import React from "react";
import { ObjectItem, ActionValue } from "mendix";

// Enhanced Person interface with generic grouping
export interface Person {
    id: string; // SPUser.id - MUST match EventAssignment.personId
    name: string; // Display name from microflow
    team: string; // Team name for grouping - MUST match TeamCapacity.teamName
    lane: string; // Lane name for grouping (e.g., "XT", "NXT A", "NXT B")
    mendixObject: ObjectItem;
}

// Enhanced EventAssignment interface matching CalendarEvents
// Supports both active events and pending requests
export interface EventAssignment {
    id: string;
    date: string; // ISO date string YYYY-MM-DD for display/lookup
    personId: string;
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
export type ShiftStatus = "active" | "inactive" | "pending" | "rejected" | "planned" | "approved" | "error";

// Role types for engineers
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
    activeEvent?: EventAssignment; // Status = 'active', isRequest = false
    pendingRequest?: EventAssignment; // Status = 'pending', isRequest = true
    inactiveEvents?: EventAssignment[]; // Status = 'inactive' (for filtering)
    rejectedRequests?: EventAssignment[]; // Status = 'rejected' (for filtering)
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
    cellData?: DayCellData;
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

export interface PersonRowProps {
    person: Person;
    dateColumns: Array<{
        date: Date;
        dateString: string;
        isToday: boolean;
        isWeekend: boolean;
    }>;
    getDayCellData: (personId: string, date: string) => DayCellData;
    getEvent: (personId: string, dateString: string) => EventAssignment | undefined;
    isCellSelected: (personId: string, date: string) => boolean;
    eventsLoading?: boolean;
    // Event handlers
    onEditEvent?: any; // ActionValue
    onCreateEvent?: any; // ActionValue
    onDeleteEvent?: any; // ActionValue
    // Context attributes for passing data to microflows
    contextEventId?: any;
    contextPersonId?: any;
    contextDate?: any;
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
}

export interface LaneSectionProps {
    lane: {
        name: string;
        people: Person[];
    };
    team: {
        teamName: string;
        teamId: string;
    };
    dateColumns: Array<{
        date: Date;
        dateString: string;
        isToday: boolean;
        isWeekend: boolean;
    }>;
    getDayCellData: (personId: string, date: string) => DayCellData;
    getEvent: (personId: string, dateString: string) => EventAssignment | undefined;
    getCapacityForTeamAndDate: (teamName: string, laneName: string, dateString: string) => TeamCapacity | undefined;
    isCellSelected: (personId: string, date: string) => boolean;
    eventsLoading?: boolean;
    // Event handlers
    onEditEvent?: any; // ActionValue
    onCreateEvent?: any; // ActionValue
    onDeleteEvent?: any; // ActionValue
    // Context attributes for passing data to microflows
    contextEventId?: any;
    contextPersonId?: any;
    contextDate?: any;
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
}

export interface TeamSectionProps {
    team: {
        teamName: string;
        teamId: string;
        lanes: Array<{
            name: string;
            people: Person[];
        }>;
    };
    dateColumns: Array<{
        date: Date;
        dateString: string;
        isToday: boolean;
        isWeekend: boolean;
    }>;
    getDayCellData: (personId: string, date: string) => DayCellData;
    getEvent: (personId: string, dateString: string) => EventAssignment | undefined;
    getCapacityForTeamAndDate: (teamName: string, laneName: string, dateString: string) => TeamCapacity | undefined;
    isCellSelected: (personId: string, date: string) => boolean;
    eventsLoading?: boolean;
    // Event handlers
    onEditEvent?: any; // ActionValue
    onCreateEvent?: any; // ActionValue
    onDeleteEvent?: any; // ActionValue
    // Context attributes for passing data to microflows
    contextEventId?: any;
    contextPersonId?: any;
    contextDate?: any;
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
    getDayCellData: (personId: string, date: string) => DayCellData;
    updateEvent: (eventId: string, updates: Partial<EventAssignment>) => void;
    getPersonById: (personId: string) => Person | undefined;
    getEventsByDateRange: (startDate: string, endDate: string) => EventAssignment[];
    refreshData: () => void;
    getAllTeamCapacities: (dates: string[]) => TeamCapacity[];
    trackInteractionError: (error: string) => void;
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
