# Microflow-Based Data Architecture & API Specification

## Table of Contents

- [Problem Statement](#problem-statement)
- [Solution: Server-Side Microflow Architecture](#solution-server-side-microflow-architecture)
- [Data Architecture](#data-architecture)
- [API Specification](#api-specification)
- [Validation Rules](#validation-rules)
- [Data Relationship Requirements](#data-relationship-requirements)
- [Event State Management Logic](#event-state-management-logic)
- [Implementation Details](#implementation-details)
- [Benefits](#benefits)
- [Widget Configuration](#widget-configuration)
- [Date Range Management](#date-range-management)
- [Migration Path](#migration-path)
- [Performance Expectations](#performance-expectations)
- [Future Enhancements](#future-enhancements)
- [Microflow Testing and Validation](#microflow-testing-and-validation)

## Problem Statement

The original widget architecture was loading all events from the database (2+ years of data) which caused crashes in production. Mendix widgets cannot apply their own XPath constraints on database sources, requiring a new approach for data filtering and pagination.

## Solution: Server-Side Microflow Architecture

### Core Principle
Move all data filtering and business logic to server-side microflows. The widget becomes a "dumb" display component that simply renders the pre-filtered data it receives.

## Data Architecture

### 1. People Data Source
**Microflow**: `MF_GetFilteredPeople`
- **Purpose**: Return only people that should be visible based on team/lane filters
- **Filtering**: Apply team/lane visibility filters directly in XPath
- **Returns**: Person entities with embedded team/lane reference data
- **Refresh**: Static data, load once on widget initialization

### 2. Events Data Source  
**Microflow**: `MF_GetEventsByDateRange`
- **Purpose**: Return event assignments for specific date range and visible people only
- **Parameters**: 
  - `StartDate` (DateTime) - Beginning of date range
  - `EndDate` (DateTime) - End of date range
- **Filtering**: 
  - Date range: `[EventDate >= $StartDate and EventDate <= $EndDate]`
  - Person visibility: `[contains($VisiblePersonIds, SPUser/id)]`
- **Returns**: Event assignment entities for date range
- **Refresh**: When date range changes (pagination)

### 3. Capacity Data Source
**Microflow**: `MF_GetCapacityByDateRange` 
- **Purpose**: Return team capacity data for specific date range and visible teams only
- **Parameters**:
  - `StartDate` (DateTime) - Beginning of date range  
  - `EndDate` (DateTime) - End of date range
- **Filtering**:
  - Date range: `[CapacityDate >= $StartDate and CapacityDate <= $EndDate]`
  - Team visibility: `[contains($VisibleTeamIds, Team/id)]`
- **Returns**: Capacity entities with embedded target data
- **Refresh**: When date range changes (pagination)

## API Specification

### People Microflow (`MF_GetFilteredPeople`)

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

**Example Response**:
```json
[
  {
    "id": "12345678-1234-1234-1234-123456789abc",
    "name": "John Doe",
    "team": "Team 1",
    "lane": "NXT A"
  },
  {
    "id": "87654321-4321-4321-4321-cba987654321",
    "name": "Jane Smith",
    "team": "Team 2",
    "lane": "XT"
  }
]
```

### Events Microflow (`MF_GetEventsByDateRange`)

**Purpose**: Returns events within a specified date range.

**Return Type**: **List** (multiple EventAssignment objects)

**Expected Return Fields**:
```typescript
interface EventAssignment {
    id: string;         // Unique identifier for the event
    date: string;       // ISO date string (e.g., "2024-01-15")
    personId: string;   // Reference to Person.id
    eventType: string;  // Event type: "M"|"E"|"N"|"D"|"H"|"T"|"LTF"
    status?: string;    // Optional status: "active"|"inactive"|"pending"|"rejected"|"planned"|"approved"|"error"|"tbd"
    isRequest?: boolean;    // True for requests, false for assignments
    replacesEventId?: string; // ID of event this request replaces
    comment?: string;   // Optional comment for the event
    reasonApprover?: string; // Optional reason from approver
}
```

**Parameters**:
- `StartDate`: Date - Beginning of date range
- `EndDate`: Date - End of date range

**Example Response**:
```json
[
  {
    "id": "event-123",
    "date": "2025-01-08",
    "personId": "12345678-1234-1234-1234-123456789abc",
    "eventType": "M",
    "status": "active",
    "isRequest": false
  },
  {
    "id": "event-456",
    "date": "2025-01-08",
    "personId": "87654321-4321-4321-4321-cba987654321",
    "eventType": "H",
    "status": "pending",
    "isRequest": true,
    "replacesEventId": "event-789"
  }
]
```

**Event Type Codes**:
- `M` = Morning shift (e.g., `M.SPE` = Morning System Performance Engineer)
- `E` = Evening shift  
- `N` = Night shift
- `D` = Day off
- `H` = Holiday
- `T` = Training
- `LTF` = Long-Term Flex (hour bank downturn management)

### Team Capacities Microflow (`MF_GetCapacityByDateRange`)

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
    target: number;     // Target capacity percentage (0 if no target)
    meetsTarget: boolean; // Calculated: percentage >= target (false if target is 0 or null)
}
```

**Parameters**:
- `StartDate`: Date - Beginning of date range
- `EndDate`: Date - End of date range

**Example Response**:
```json
[
  {
    "teamName": "Team 1",
    "isNXT": true,
    "date": "2025-01-08",
    "weekNumber": 2,
    "percentage": 85,
    "target": 80,
    "meetsTarget": true
  },
  {
    "teamName": "Team 2",
    "isNXT": false,
    "date": "2025-01-08",
    "weekNumber": 2,
    "percentage": 75,
    "target": 80,
    "meetsTarget": false
  }
]
```

## Validation Rules

### Event Type Validation

The widget relies on specific event type codes to determine visual styling, business logic, and user interactions. Invalid event types will cause rendering errors and break the scheduling functionality.

**⚠️ Event Type Validation Rules**:

1. **Required Values**: The `eventType` field MUST contain one of the valid codes above
2. **Case Sensitivity**: Event type codes are case-sensitive (use uppercase)
3. **No Null/Empty**: The `eventType` field cannot be null, undefined, or empty string
4. **Single Character**: Standard codes (`M`, `E`, `N`, `D`, `H`, `T`) must be exactly one character
5. **Multi-Character**: Only `LTF` is allowed as a multi-character code

```typescript
// Valid event type enumeration
type ValidShiftType = "M" | "E" | "N" | "D" | "H" | "T" | "LTF";

// Validation function example
function validateEventType(eventType: string): boolean {
    const validTypes: ValidShiftType[] = ["M", "E", "N", "D", "H", "T", "LTF"];
    return validTypes.includes(eventType as ValidShiftType);
}
```

### Status Field Validation

Status values control the visual appearance and behavior of events in the scheduler. Different statuses use different styling patterns (solid colors, stripes, etc.) and determine what actions are available to users.

**Valid Status Values**:
- `active` = Currently active/confirmed event
- `inactive` = Inactive/cancelled event  
- `pending` = Awaiting approval (for requests)
- `rejected` = Request denied
- `planned` = Scheduled but not yet confirmed
- `approved` = Request approved and confirmed
- `error` = System error state
- `tbd` = To be determined (deferred for later resolution)

```typescript
type ValidStatusType = "active" | "inactive" | "pending" | "rejected" | "planned" | "approved" | "error" | "tbd";

function validateStatus(status: string): boolean {
    const validStatuses: ValidStatusType[] = ["active", "inactive", "pending", "rejected", "planned", "approved", "error", "tbd"];
    return validStatuses.includes(status as ValidStatusType);
}
```

### Date Format Validation

Consistent date formatting is critical for the widget's timeline functionality. The widget expects ISO date strings for proper sorting, filtering, and display in the day-grid layout.

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
```

### Team Capacity Validation

Team capacity data drives the visual indicators and business logic for resource planning. Incomplete or invalid capacity data will prevent the widget from displaying team capacity indicators correctly.

**⚠️ Team Capacity Validation Rules**:

```typescript
interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

function validateTeamCapacity(capacity: any): ValidationResult {
    const errors: string[] = [];
    
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
    if (capacity.target === undefined || capacity.target === null) {
        errors.push("Target is required");
    }
    if (capacity.meetsTarget === undefined || capacity.meetsTarget === null) {
        errors.push("MeetsTarget flag is required");
    }
    
    return { isValid: errors.length === 0, errors };
}
```

## Data Relationship Requirements

### Critical Data Matching

The widget uses these data relationships to connect events to people, match team capacity data, and display the scheduling grid correctly. Breaking these relationships will cause events to disappear, capacity indicators to malfunction, or the entire widget to crash.

**⚠️ IMPORTANT**: The microflows MUST preserve these data relationships for the widget to function correctly:

#### 1. Person ↔ Event Matching
```typescript
// People microflow MUST return:
Person.id = SPUser.id (GUID)

// Events microflow MUST return:  
EventAssignment.personId = CalendarEvents.SPUser (same GUID)

// Widget code depends on:
const personEvents = events.filter(event => event.personId === person.id);
```

#### 2. Person ↔ Team Capacity Matching
```typescript
// People microflow MUST return:
Person.team = "Team 1" (consistent string)

// Capacity microflow MUST return:
TeamCapacity.teamName = "Team 1" (EXACT same string)

// Widget code depends on:
const capacity = teamCapacities.find(cap => cap.teamName === person.team);
```

#### 3. Data Consistency Validation
The microflows should ensure:
- **Team names are identical** between Person and TeamCapacity entities
- **Person IDs are valid** references that exist in CalendarEvents
- **Date formats are consistent** (ISO date strings: "YYYY-MM-DD")

## Event State Management Logic

### DayCellData Structure Rules
```typescript
interface DayCellData {
    activeEvent?: EventAssignment;        // Current effective event (max 1)
    pendingRequest?: EventAssignment;     // Awaiting approval (max 1 active request) 
    inactiveEvents?: EventAssignment[];   // Previously active events that got replaced/superseded
    rejectedRequests?: EventAssignment[]; // Requests denied by TL/management
    plannedEvents?: EventAssignment[];    // Status = 'planned' (scheduled but not yet active)
    approvedEvents?: EventAssignment[];   // Status = 'approved' (approved events)
    errorEvents?: EventAssignment[];      // Status = 'error' (events with processing errors)
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

## Implementation Details

### Current Client-Side Logic Analysis

#### 1. People Data Processing (useEventData.ts:153-242)

**Current Logic**:
```typescript
// Extract name, team, lane from attributes
const name = nameAttribute?.get(item).value || "Unknown";
const team = teamAttribute?.get(item).value || "General"; 
const lane = laneAttribute?.get(item).value || "General";

// Extract entity IDs from associations (for filtering)
const teamEntityId = personTeamAssociation?.get(item).value?.id;
const laneEntityId = personLaneAssociation?.get(item).value?.id;

// Filter by team/lane entity IDs if filters are configured
const teamFiltered = filteredValues.teams.size === 0 || 
    (person.teamEntityId && filteredValues.teams.has(person.teamEntityId));
const laneFiltered = filteredValues.lanes.size === 0 || 
    (person.laneEntityId && filteredValues.lanes.has(person.laneEntityId));
```

**Microflow Implementation: `MF_GetFilteredPeople`**
- **Input**: Filter parameters (team IDs, lane IDs, or current user context for filtering)
- **Processing**:
  1. Retrieve SPUser entities
  2. Apply team/lane filtering via XPath: `[contains($TeamIds, Team/id) and contains($LaneIds, Lane/id)]`
  3. Populate display fields: Name, Team name, Lane name
- **Output**: List of SPUser objects with team/lane names populated

#### 2. Events Data Processing (useEventData.ts:244-300)

**Current Logic**:
```typescript
// Filter by date range (currently loads ALL events - performance issue!)
const events = eventsSource.items.map(item => {
    const dayType = dayTypeAttribute?.get(item).value || "";
    const status = statusAttribute?.get(item).value;
    const eventDate = eventDateAttribute?.get(item).value;
    const personId = spUserAssociation?.get(item).value?.id;
    
    return {
        id: item.id,
        date: eventDate.toISOString().split("T")[0],
        personId,
        eventType: dayType as EventType,
        status,
        eventDate
    };
}).filter(event => event.eventDate !== null);
```

**Microflow Implementation: `MF_GetEventsByDateRange`**
- **Input**: 
  - `StartDate` (DateTime) - Beginning of visible date range
  - `EndDate` (DateTime) - End of visible date range
  - Filter context (team/lane filters, user permissions)
- **Processing**:
  1. Apply date filter: `[EventDate >= $StartDate and EventDate <= $EndDate]`
  2. Apply visibility filters: `[contains($VisibleTeamIds, SPUser/Team/id)]`
  3. Only return events for visible people
- **Output**: List of CalendarEvents for date range

#### 3. Team Capacity Processing (useEventData.ts:435-525)

**Current Logic**:
```typescript
// Get capacity data for requested dates
teamCapacitiesSource.items.forEach(item => {
    const dateValue = capacityDateAttribute?.get(item).value;
    const percentage = capacityPercentageAttribute?.get(item).value;
    const isNXT = isNXTAttribute?.get(item).value;
    const teamName = capacityTeamAssociation?.get(item).value?.id; // Using ID!
    
    // Get target from association
    const target = capacityTargetAssociation?.get(item).value
        ? targetPercentageAttribute?.get(targetRef.value).value : 0;
        
    // Only include if date is in requested range
    if (dates.includes(formatDateForShift(dateValue))) {
        capacities.push({ teamName, isNXT, date, percentage, target });
    }
});
```

**Microflow Implementation: `MF_GetCapacityByDateRange`**
- **Input**:
  - `StartDate` (DateTime) - Beginning of visible date range  
  - `EndDate` (DateTime) - End of visible date range
  - Filter context (visible teams only)
- **Processing**:
  1. Apply date filter: `[CapacityDate >= $StartDate and CapacityDate <= $EndDate]`
  2. Apply team visibility filter: `[contains($VisibleTeamIds, Team/id)]`
  3. Join with target data: Include target percentages from CalendarTargetCapacity
  4. **CRITICAL**: Populate team names exactly as they appear in Person entities
  5. Calculate `meetsTarget` flag: `percentage >= target`
- **Output**: List of TeamCapacity objects with embedded target data

**⚠️ TEAM NAME MATCHING**: The microflow must ensure `TeamCapacity.teamName` exactly matches `Person.team` values. For example, if people have `team: "Team 1"`, the capacity data must have `teamName: "Team 1"` (not "Team1", "team_1", or team IDs).

**Performance Impact**: Mismatched team names force the widget to perform additional processing to reconcile differences, which can significantly slow down rendering and increase memory usage, especially with large datasets. Exact string matching enables efficient O(1) lookups instead of expensive string comparison operations.

## Benefits

### Performance
- **Reduced data transfer**: Only ~30 days of events loaded at a time vs 2+ years
- **Database optimization**: Filtering happens at database level with proper indexing
- **Memory efficiency**: Widget memory footprint reduced by 95%+

### Security & Access Control
- **Data isolation**: Users only receive data they should see
- **Centralized filtering**: All business rules applied consistently in microflows
- **Audit trail**: Server-side filtering provides better audit capabilities

### Maintainability  
- **Separation of concerns**: Business logic in microflows, display logic in widget
- **Reusable microflows**: Can be used by other widgets/pages
- **Simplified widget**: No complex filtering logic in frontend

## Widget Configuration

### New Widget Configuration
```xml
<property key="people" type="datasource" dataSourceType="microflow">
    <caption>People (Filtered)</caption>
    <description>MF_GetFilteredPeople - Returns visible people with team/lane data</description>
</property>

<property key="events" type="datasource" dataSourceType="microflow">
    <caption>Events by Date Range</caption>
    <description>MF_GetEventsByDateRange - Returns events for current date range</description>
</property>

<property key="capacity" type="datasource" dataSourceType="microflow">
    <caption>Capacity by Date Range</caption> 
    <description>MF_GetCapacityByDateRange - Returns capacity data for current date range</description>
</property>
```

### Removed Configuration
- ❌ Filter data sources (`filters`, `filterTeamAssociation`, `filterLaneAssociation`)
- ❌ Team/Lane datasources for filtering
- ❌ Client-side filtering logic in `useEventData.ts`
- ❌ Person team/lane association properties

## Date Range Management

### Pagination Strategy
- Widget maintains current date range state (e.g., current month)
- When user navigates dates (prev/next month), widget refreshes microflows with new date parameters
- Implement infinite scrolling with 30-day chunks for smooth UX

### Data Refresh Logic
```typescript
// Pseudo-code for date navigation
const navigateToMonth = (newMonth: Date) => {
    const startDate = startOfMonth(newMonth);
    const endDate = endOfMonth(newMonth);
    
    // Refresh only date-dependent data sources
    refreshEventsData(startDate, endDate);
    refreshCapacityData(startDate, endDate);
    // People remain cached
};
```

## Migration Path

### Phase 1: Create Microflows
1. Build `MF_GetFilteredPeople` 
2. Build `MF_GetEventsByDateRange` with date parameters
3. Build `MF_GetCapacityByDateRange` with date parameters
4. Test microflows independently

### Phase 2: Update Widget Configuration  
1. Replace data sources with microflow sources
2. Add date range parameters to event/capacity sources
3. Remove filter-related properties

### Phase 3: Simplify Widget Code
1. Remove client-side filtering logic
2. Implement date range navigation
3. Add pagination controls
4. Remove unnecessary interfaces and types

## Performance Expectations

### Before (Database Sources)
- Initial load: 50,000+ event records (2 years)
- Memory usage: ~500MB+ 
- Load time: 30+ seconds or crash
- Network transfer: 50+ MB

### After (Microflow Sources)
- Initial load: ~1,000 event records (30 days)
- Memory usage: ~10MB
- Load time: 2–3 seconds  
- Network transfer: 1–2 MB

## Future Enhancements

### Caching Strategy
- Implement microflow result caching for frequently accessed date ranges
- Cache person data globally (rarely changes)
- Smart cache invalidation on data updates

### Advanced Pagination
- Implement bidirectional infinite scroll
- Pre-load adjacent months for smoother navigation
- Add "jump to date" functionality

### Performance Monitoring
- Add performance logging to microflows
- Monitor data transfer sizes
- Track user navigation patterns for optimization

---

## Microflow Testing and Validation

### Testing Checklist

Before deploying microflows to production, ensure:

#### People Microflow (`MF_GetFilteredPeople`)
- [ ] Returns all required fields: `id`, `name`, `team`, `lane`
- [ ] Team names match exactly what capacity data will use
- [ ] Filtering logic works correctly (team/lane visibility)
- [ ] Returns consistent data structure for all users
- [ ] Performance is acceptable (< 2 seconds for typical dataset)

#### Events Microflow (`MF_GetEventsByDateRange`)
- [ ] Returns all required fields: `id`, `date`, `personId`, `eventType`
- [ ] Date filtering works correctly with `StartDate` and `EndDate` parameters
- [ ] Event types are valid: `M`, `E`, `N`, `D`, `H`, `T`, `LTF`
- [ ] Status values are valid when provided
- [ ] PersonId references match People microflow IDs
- [ ] Date format is ISO string (YYYY-MM-DD)
- [ ] Performance is acceptable for 30-day ranges

#### Capacity Microflow (`MF_GetCapacityByDateRange`)
- [ ] Returns all required fields: `teamName`, `isNXT`, `date`, `weekNumber`, `percentage`, `target`, `meetsTarget`
- [ ] Team names match exactly what People microflow returns
- [ ] Date filtering works correctly with parameters
- [ ] Percentage values are between 0-100
- [ ] Target values are properly calculated from target entities
- [ ] MeetsTarget flag is correctly calculated: `percentage >= target`
- [ ] Week numbers are valid (1-53)

### Sample Test Data

```json
// Sample test scenario for validation
{
  "people": [
    { "id": "person-1", "name": "Alice Johnson", "team": "Team 1", "lane": "NXT A" },
    { "id": "person-2", "name": "Bob Smith", "team": "Team 1", "lane": "NXT B" }
  ],
  "events": [
    { "id": "event-1", "date": "2025-01-08", "personId": "person-1", "eventType": "M", "status": "active" },
    { "id": "event-2", "date": "2025-01-08", "personId": "person-2", "eventType": "H", "status": "pending", "isRequest": true }
  ],
  "capacity": [
    { "teamName": "Team 1", "isNXT": true, "date": "2025-01-08", "weekNumber": 2, "percentage": 85, "target": 80, "meetsTarget": true }
  ]
}
```

### Common Issues and Solutions

#### Data Relationship Issues
- **Problem**: Events reference personId that doesn't exist in People data
- **Solution**: Ensure People microflow returns all people referenced in Events

#### Team Name Mismatches
- **Problem**: Capacity data has different team names than People data
- **Solution**: Use identical team name strings in both microflows

#### Date Format Issues
- **Problem**: Widget expects ISO date strings but microflow returns Date objects
- **Solution**: Format dates as "YYYY-MM-DD" strings in microflow

#### Performance Issues
- **Problem**: Microflow takes too long to execute
- **Solution**: Add database indexes on date and person/team fields

---

**Document Version**: 2.1  
**Date**: 2025-01-08  
**Status**: Updated with missing fields and example outputs  
**Next Review**: After Phase 1 implementation