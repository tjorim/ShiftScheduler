# Microflow API Specification

This document specifies the expected field names and data structures that microflows should return when used as data sources for the Shift Scheduler widget.

## Configuration Simplification Summary

✅ **Completed**: Removed redundant attribute mappings from XML configuration
✅ **Completed**: Updated widget to expect standardized field names from microflows  
✅ **Completed**: Simplified widget configuration to focus on microflow data sources
✅ **Completed**: Implement actual microflow data extraction with proper error handling

## People Microflow (`MF_GetFilteredPeople`)

**Purpose**: Returns filtered list of people with team and lane information.

**Return Type**: **List** (multiple Person objects)

**Expected Return Fields**:
```typescript
interface Person {
    id: string;         // Unique identifier for the person
    name: string;       // Display name (e.g., "John Doe")
    team: string;       // Team name (e.g., "Team 1", "Team 2", "Team 3")
    lane: string;       // Lane name (e.g., "XT", "NXT A", "NXT B")
}
```

**Parameters**: None (filtering logic handled within microflow)

## Events Microflow (`MF_GetEventsByDateRange`)

**Purpose**: Returns events within a specified date range.

**Return Type**: **List** (multiple EventAssignment objects)

**Expected Return Fields**:
```typescript
interface EventAssignment {
    id: string;         // Unique identifier for the event
    date: string;       // ISO date string (e.g., "2024-01-15")
    personId: string;   // Reference to Person.id
    shift: string;      // Event type: "M"|"E"|"N"|"D"|"H"|"T"
    status?: string;    // Optional status: "planned"|"approved"|"rejected"
    shiftDate: Date;    // JavaScript Date object (for compatibility)
}
```

**Parameters**:
- `StartDate`: Date - Beginning of date range
- `EndDate`: Date - End of date range

**Event Type Codes**:
- `M` = Morning shift (e.g., `M.SPE` = Morning System Performance Engineer)
- `E` = Evening shift  
- `N` = Night shift
- `D` = Day off
- `H` = Holiday
- `T` = Training
- `LTF` = Long-Term Flex (hour bank downturn management)

**⚠️ Event Type Validation Rules**:

1. **Required Values**: The `shift` field MUST contain one of the valid codes above
2. **Case Sensitivity**: Event type codes are case-sensitive (use uppercase)
3. **No Null/Empty**: The `shift` field cannot be null, undefined, or empty string
4. **Single Character**: Standard codes (`M`, `E`, `N`, `D`, `H`, `T`) must be exactly one character
5. **Multi-Character**: Only `LTF` is allowed as a multi-character code

**Validation Constraints**:
```typescript
// Valid event type enumeration
type ValidShiftType = "M" | "E" | "N" | "D" | "H" | "T" | "LTF";

// Validation function example
function validateShiftType(shift: string): boolean {
    const validTypes: ValidShiftType[] = ["M", "E", "N", "D", "H", "T", "LTF"];
    return validTypes.includes(shift as ValidShiftType);
}
```

**Business Logic Constraints**:
- **Work Shifts** (`M`, `E`, `N`): Can have role suffixes (e.g., `M.SPE`, `N.TL`)
- **Non-Work Events** (`D`, `H`, `T`, `LTF`): Should not have role suffixes
- **Mutual Exclusivity**: Only one event type per person per day (except requests)
- **Shift Succession**: Work shifts should follow logical 24/7 rotation patterns

**Data Quality Checks**:
- Reject invalid characters or unrecognized codes
- Warn on suspicious patterns (e.g., consecutive night shifts beyond policy)
- Validate that shift assignments align with team capacity requirements
- Ensure holiday/training events don't conflict with critical coverage needs

**Status Field Validation Rules**:

**Valid Status Values**:
- `active` = Currently active/confirmed event
- `inactive` = Inactive/cancelled event  
- `pending` = Awaiting approval (for requests)
- `rejected` = Request denied
- `planned` = Scheduled but not yet confirmed
- `approved` = Request approved and confirmed
- `error` = System error state

**Status Validation Constraints**:
```typescript
type ValidStatusType = "active" | "inactive" | "pending" | "rejected" | "planned" | "approved" | "error";

function validateStatus(status: string): boolean {
    const validStatuses: ValidStatusType[] = ["active", "inactive", "pending", "rejected", "planned", "approved", "error"];
    return validStatuses.includes(status as ValidStatusType);
}
```

**Status Business Rules**:
- **Default Status**: If not provided, defaults to `planned`
- **Status Transitions**: 
  - `pending` → `approved` or `rejected` (for requests)
  - `planned` → `active` (when confirmed)
  - `active` → `inactive` (when cancelled)
- **Status Combinations**:
  - Regular shifts: `planned`, `active`, `inactive`
  - Requests: `pending`, `approved`, `rejected`
  - System issues: `error`

**Additional Field Validation Rules**:

**Date Field Validation**:
```typescript
// Date format validation
function validateDateFormat(date: string): boolean {
    // Must be ISO date format YYYY-MM-DD
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDateRegex.test(date)) return false;
    
    // Must be a valid date
    const parsedDate = new Date(date + 'T00:00:00');
    return !isNaN(parsedDate.getTime());
}

// Date range validation
function validateDateRange(date: string): boolean {
    const eventDate = new Date(date);
    const now = new Date();
    const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());
    const twoYearsFromNow = new Date(now.getFullYear() + 2, now.getMonth(), now.getDate());
    
    return eventDate >= twoYearsAgo && eventDate <= twoYearsFromNow;
}
```

**Person ID Validation**:
```typescript
function validatePersonId(personId: string): boolean {
    // Must not be empty
    if (!personId || personId.trim() === '') return false;
    
    // Should reference an existing person in the system
    // Implementation depends on your person management system
    return true; // Placeholder - implement actual person lookup
}
```

**Complete Event Validation Example**:
```typescript
interface EventValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}

function validateEvent(event: any): EventValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Required fields
    if (!event.id) errors.push("Event ID is required");
    if (!event.date) errors.push("Date is required");
    if (!event.personId) errors.push("Person ID is required");
    if (!event.shift) errors.push("Shift type is required");
    
    // Field format validation
    if (event.date && !validateDateFormat(event.date)) {
        errors.push("Date must be in YYYY-MM-DD format");
    }
    
    if (event.date && !validateDateRange(event.date)) {
        warnings.push("Date is outside normal range (±2 years)");
    }
    
    if (event.shift && !validateShiftType(event.shift)) {
        errors.push(`Invalid shift type: ${event.shift}`);
    }
    
    if (event.status && !validateStatus(event.status)) {
        errors.push(`Invalid status: ${event.status}`);
    }
    
    if (event.personId && !validatePersonId(event.personId)) {
        errors.push("Invalid person ID reference");
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}
```

## Team Capacities Microflow (`MF_GetCapacityByDateRange`)

**Purpose**: Returns team capacity calculations for date range.

**Return Type**: **List** (multiple TeamCapacity objects)

**Expected Return Fields**:
```typescript
interface TeamCapacity {
    teamName: string;   // Team name - must match Person.team
    isNXT: boolean;     // Department type: true = NXT, false = XT
    date: string;       // ISO date string
    weekNumber: number; // Week number for target lookup
    percentage: number; // Calculated capacity percentage
}
```

**Parameters**:
- `StartDate`: Date - Beginning of date range
- `EndDate`: Date - End of date range

**⚠️ Team Capacity Validation Rules**:

**Required Field Validation**:
```typescript
function validateTeamCapacity(capacity: any): EventValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Required fields
    if (!capacity.teamName) errors.push("Team name is required");
    if (capacity.isNXT === undefined || capacity.isNXT === null) {
        errors.push("isNXT flag is required");
    }
    if (!capacity.date) errors.push("Date is required");
    if (capacity.weekNumber === undefined || capacity.weekNumber === null) {
        errors.push("Week number is required");
    }
    if (capacity.percentage === undefined || capacity.percentage === null) {
        errors.push("Percentage is required");
    }
    
    return { isValid: errors.length === 0, errors, warnings };
}
```

**Data Range Validation**:
```typescript
// Week number validation
function validateWeekNumber(weekNumber: number): boolean {
    return Number.isInteger(weekNumber) && weekNumber >= 1 && weekNumber <= 53;
}

// Percentage validation
function validatePercentage(percentage: number): boolean {
    return typeof percentage === 'number' && percentage >= 0 && percentage <= 100;
}

// Team name validation
function validateTeamName(teamName: string): boolean {
    if (!teamName || teamName.trim() === '') return false;
    // Should match existing team names in the system
    const validTeamPattern = /^Team\s+\d+$|^[A-Z]{2,4}(\s+[A-Z])?$/;
    return validTeamPattern.test(teamName);
}
```

**Business Logic Validation**:
- **Team Consistency**: `teamName` must match existing Person.team values
- **Department Logic**: `isNXT` flag must be consistent within team
- **Date Continuity**: Capacity data should exist for all dates in range
- **Percentage Bounds**: Values between 0-100% are expected
- **Week Numbers**: Must be valid ISO week numbers (1-53)

**Data Quality Checks**:
- Warn on capacity percentages > 90% (potential overallocation)
- Warn on capacity percentages < 50% (potential underutilization)  
- Validate that capacity calculations align with actual shift assignments
- Check for missing capacity data on critical dates

## Microflow Return Type Requirements

### Use Lists for All Microflows

All three microflows **must return Lists** (not Objects) because:

1. **Multiple Data Items**: Each microflow returns multiple records
   - People: Multiple person records
   - Events: Multiple event assignments  
   - Capacities: Multiple team/date combinations

2. **Widget Expects Lists**: The widget implementation uses `items.map()` for data processing
   ```typescript
   peopleSource.items.map(item => extractPersonData(item))
   eventsSource.items.map(item => extractEventData(item))
   teamCapacitiesSource.items.map(item => extractCapacityData(item))
   ```

3. **Scalability**: Lists handle any number of records (1 to thousands)

4. **Consistency**: All data sources use the same access pattern

### Mendix Configuration
- **People**: Configure as List data source → `MF_GetFilteredPeople`
- **Events**: Configure as List data source → `MF_GetEventsByDateRange`
- **Team Capacities**: Configure as List data source → `MF_GetCapacityByDateRange`

### Data Access Pattern
Each list item provides access to attributes via the standardized field names documented above.

## Widget Configuration Simplification

With microflows handling data transformation, the widget configuration is simplified to:

### Required Configuration
1. **Data Sources**: Specify the microflows' names
2. **Date Parameters**: Attributes to pass date range to microflows
3. **Context Attributes**: For action communication
4. **Actions**: Event handlers for user interactions

### Removed Configuration
- ~~Person attribute mappings~~ (handled by microflow)
- ~~Event attribute mappings~~ (handled by microflow)  
- ~~Team capacity attribute mappings~~ (handled by microflow)

## Benefits of Microflow-Based Approach

1. **Simplified Widget Configuration**: No need to map individual attributes
2. **Standardized Data Format**: Consistent field names across all installations
3. **Server-Side Logic**: Complex filtering and transformation on the server
4. **Maintainability**: Changes to data structure handled in microflows, not widget
5. **Performance**: Optimized queries and minimal data transfer

## Migration Notes

Existing installations will need to:
1. Create or update microflows to return data in the expected format
2. Remove individual attribute mappings from widget configuration
3. Update widget configuration to use microflow data sources only

The widget will validate that microflows return data with the expected field names and provide helpful error messages if fields are missing or incorrectly formatted.

## Event State Management Logic

### DayCellData Structure Rules
```typescript
interface DayCellData {
    activeEvent?: EventAssignment;        // Current effective event (max 1)
    pendingRequest?: EventAssignment;     // Awaiting approval (max 1 active request) 
    inactiveEvents?: EventAssignment[];   // Previously active events that got replaced/superseded
    rejectedRequests?: EventAssignment[]; // Requests denied by TL/management
}
```

### Business Logic Examples

**Scenario**: Person working M.SPE → requests H → gets approved → requests LTF → gets approved

**State Transitions**:
1. **Initial**: `activeEvent: {M.SPE, active}`
2. **Holiday Request**: `activeEvent: {M.SPE, active}` + `pendingRequest: {H, pending}`
3. **Holiday Approved**: `activeEvent: {H, active}` + `inactiveEvents: [{M.SPE, inactive}]`
4. **LTF Request**: `activeEvent: {H, active}` + `pendingRequest: {LTF, pending}` + `inactiveEvents: [{M.SPE, inactive}]`
5. **LTF Approved**: `activeEvent: {LTF, active}` + `inactiveEvents: [{M.SPE, inactive}, {H, inactive}]`

### Event Types
- **M.SPE**: Morning System Performance Engineer shift
- **H**: Holiday request
- **LTF**: Long-Term Flex (hour bank downturn management)

### Approval Workflow
- **TL Approval**: Required for holiday requests
- **Management**: Announces downturn periods, enables LTF
- **Replacements**: New approvals can replace/supersede existing active events

### Microflow Processing Guidelines
1. **Filtering**: Microflows should handle all business logic filtering (LTF eligibility, approval status, etc.)
2. **Categorization**: Widget processes flat EventAssignment[] into DayCellData structure by person+date
3. **State Management**: Use `status` and `isRequest` fields to determine event categorization
4. **Multiple Events**: Support multiple inactive/rejected events per person-date as business requires