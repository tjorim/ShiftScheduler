# Microflow API Specification

This document specifies the expected field names and data structures that microflows should return when used as data sources for the Shift Scheduler widget.

## Configuration Simplification Summary

✅ **Completed**: Removed redundant attribute mappings from XML configuration
✅ **Completed**: Updated widget to expect standardized field names from microflows  
✅ **Completed**: Simplified widget configuration to focus on microflow data sources
🔄 **TODO**: Implement actual microflow data extraction (currently stubbed with placeholder data)

## People Microflow (`MF_GetFilteredPeople`)

**Purpose**: Returns filtered list of people with team and lane information.

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
- `LTF` = Long Term Flex (hour bank downturn management)

## Team Capacities Microflow (`MF_GetCapacityByDateRange`)

**Purpose**: Returns team capacity calculations for date range.

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

## Widget Configuration Simplification

With microflows handling data transformation, the widget configuration is simplified to:

### Required Configuration
1. **Data Sources**: Specify the microflow names
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
- **LTF**: Long Term Flex (hour bank downturn management)

### Approval Workflow
- **TL Approval**: Required for holiday requests
- **Management**: Announces downturn periods, enables LTF
- **Replacements**: New approvals can replace/supersede existing active events

### Microflow Processing Guidelines
1. **Filtering**: Microflows should handle all business logic filtering (LTF eligibility, approval status, etc.)
2. **Categorization**: Widget processes flat EventAssignment[] into DayCellData structure by person+date
3. **State Management**: Use `status` and `isRequest` fields to determine event categorization
4. **Multiple Events**: Support multiple inactive/rejected events per person-date as business requires