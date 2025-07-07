# Microflow-Based Data Architecture

## Problem Statement

The original widget architecture was loading all shifts from the database (2+ years of data) which caused crashes in production. Mendix widgets cannot apply their own XPath constraints on database sources, requiring a new approach for data filtering and pagination.

## Solution: Server-Side Microflow Architecture

### Core Principle
Move all data filtering and business logic to server-side microflows. The widget becomes a "dumb" display component that simply renders the pre-filtered data it receives.

## Data Architecture

### 1. Engineers Data Source
**Microflow**: `MF_GetFilteredEngineers`
- **Purpose**: Return only engineers that should be visible based on team/lane filters
- **Filtering**: Apply team/lane visibility filters directly in XPath
- **Returns**: Engineer entities with embedded team/lane reference data
- **Refresh**: Static data, load once on widget initialization

### 2. Shifts Data Source  
**Microflow**: `MF_GetShiftsByDateRange`
- **Purpose**: Return shift assignments for specific date range and visible engineers only
- **Parameters**: 
  - `StartDate` (DateTime) - Beginning of date range
  - `EndDate` (DateTime) - End of date range
- **Filtering**: 
  - Date range: `[EventDate >= $StartDate and EventDate <= $EndDate]`
  - Engineer visibility: `[SPUser/id = $VisibleEngineerIds]`
- **Returns**: Shift assignment entities for date range
- **Refresh**: When date range changes (pagination)

### 3. Capacity Data Source
**Microflow**: `MF_GetCapacityByDateRange` 
- **Purpose**: Return team capacity data for specific date range and visible teams only
- **Parameters**:
  - `StartDate` (DateTime) - Beginning of date range  
  - `EndDate` (DateTime) - End of date range
- **Filtering**:
  - Date range: `[CapacityDate >= $StartDate and CapacityDate <= $EndDate]`
  - Team visibility: `[Team/id = $VisibleTeamIds]`
- **Returns**: Capacity entities with embedded target data
- **Refresh**: When date range changes (pagination)

## Detailed Microflow Requirements

### Current Client-Side Logic Analysis

#### 1. Engineers Data Processing (useShiftData.ts:153-242)

**Current Logic**:
```typescript
// Extract name, team, lane from attributes
const name = nameAttribute?.get(item).value || "Unknown";
const team = teamAttribute?.get(item).value || "General"; 
const lane = laneAttribute?.get(item).value || "General";

// Extract entity IDs from associations (for filtering)
const teamEntityId = engineerTeamAssociation?.get(item).value?.id;
const laneEntityId = engineerLaneAssociation?.get(item).value?.id;

// Filter by team/lane entity IDs if filters are configured
const teamFiltered = filteredValues.teams.size === 0 || 
    (engineer.teamEntityId && filteredValues.teams.has(engineer.teamEntityId));
const laneFiltered = filteredValues.lanes.size === 0 || 
    (engineer.laneEntityId && filteredValues.lanes.has(engineer.laneEntityId));
```

**Microflow Implementation: `MF_GetFilteredEngineers`**
- **Input**: Filter parameters (team IDs, lane IDs, or current user context for filtering)
- **Processing**:
  1. Retrieve SPUser entities
  2. Apply team/lane filtering via XPath: `[Team/id = $TeamIds and Lane/id = $LaneIds]`
  3. Populate display fields: Name, Team name, Lane name
- **Output**: List of SPUser objects with team/lane names populated
- **Return Structure**:
  ```
  SPUser {
    id: GUID
    Name: String (for display)
    TeamName: String (team display name)
    LaneName: String (lane display name)
  }
  ```

#### 2. Shifts Data Processing (useShiftData.ts:244-300)

**Current Logic**:
```typescript
// Filter by date range (currently loads ALL shifts - performance issue!)
const shifts = shiftsSource.items.map(item => {
    const dayType = dayTypeAttribute?.get(item).value || "";
    const status = statusAttribute?.get(item).value;
    const shiftDate = eventDateAttribute?.get(item).value;
    const engineerId = spUserAssociation?.get(item).value?.id;
    
    return {
        id: item.id,
        date: shiftDate.toISOString().split("T")[0],
        engineerId,
        shift: dayType as ShiftType,
        status,
        shiftDate
    };
}).filter(shift => shift.shiftDate !== null);
```

**Microflow Implementation: `MF_GetShiftsByDateRange`**
- **Input**: 
  - `StartDate` (DateTime) - Beginning of visible date range
  - `EndDate` (DateTime) - End of visible date range
  - Filter context (team/lane filters, user permissions)
- **Processing**:
  1. Apply date filter: `[EventDate >= $StartDate and EventDate <= $EndDate]`
  2. Apply visibility filters: `[SPUser/Team/id = $VisibleTeamIds]`
  3. Only return events for visible engineers
- **Output**: List of CalendarEvents for date range
- **Return Structure**:
  ```
  CalendarEvents {
    id: GUID
    EventDate: DateTime
    DayType: Enumeration (M/E/N/D/H/T)
    Status: Enumeration (planned/approved/rejected)
    SPUser: Reference to SPUser
  }
  ```

#### 3. Team Capacity Processing (useShiftData.ts:435-525)

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
  2. Apply team visibility filter: `[Team/id = $VisibleTeamIds]`
  3. Join with target data: Include target percentages from CalendarTargetCapacity
  4. **CRITICAL**: Populate team names exactly as they appear in Engineer entities
  5. Calculate `meetsTarget` flag: `percentage >= target`
- **Output**: List of TeamCapacity objects with embedded target data
- **Return Structure**:
  ```
  TeamCapacity {
    id: GUID
    CapacityDate: DateTime
    Percentage: Integer
    IsNXT: Boolean
    TeamName: String (MUST match Engineer.team exactly - e.g., "Team 1", "Team 2")
    TargetPercentage: Integer (from associated target, 0 if no target)
    MeetsTarget: Boolean (calculated: percentage >= target)
  }
  ```

**⚠️ TEAM NAME MATCHING**: The microflow must ensure `TeamCapacity.TeamName` exactly matches `Engineer.team` values. For example, if engineers have `team: "Team 1"`, the capacity data must have `teamName: "Team 1"` (not "Team1", "team_1", or team IDs).

### Filtering Logic Replacement

**Current Filter Processing (useShiftData.ts:87-134)**:
```typescript
// Extract team/lane entity IDs from Filter associations
filtersSource.items.forEach(filterItem => {
    const teamRefs = filterTeamAssociation.get(filterItem).value;
    const laneRefs = filterLaneAssociation.get(filterItem).value;
    // Collect team/lane entity IDs for filtering
});
```

**Replacement Strategy**: 
- **Option A**: Pass filter parameters directly to microflows
- **Option B**: Use current user context to determine visibility (recommended)
- **Option C**: Create helper microflow `MF_GetUserVisibilityContext` that returns team/lane IDs for current user

### Date Range Management Implementation

**Current Issue**: Widget loads ALL data (2+ years of shifts)

**Required Solution**:
```typescript
// Widget state
const [currentMonth, setCurrentMonth] = useState(new Date());

// Navigation handler  
const navigateToMonth = (newMonth: Date) => {
    const startDate = startOfMonth(newMonth);
    const endDate = endOfMonth(newMonth);
    
    // Update context attributes (triggers microflow refresh)
    startDateAttribute?.setValue(startDate);
    endDateAttribute?.setValue(endDate);
    
    setCurrentMonth(newMonth);
};
```

## Critical Data Matching Requirements

### Data Relationship Preservation

**⚠️ IMPORTANT**: The microflows MUST preserve these data relationships for the widget to function correctly:

#### 1. Engineer ↔ Shift Matching
```typescript
// Engineers microflow MUST return:
Engineer.id = SPUser.id (GUID)

// Shifts microflow MUST return:  
ShiftAssignment.engineerId = CalendarEvents.SPUser (same GUID)

// Widget code depends on:
const engineerShifts = shifts.filter(shift => shift.engineerId === engineer.id);
```

#### 2. Engineer ↔ Team Capacity Matching
```typescript
// Engineers microflow MUST return:
Engineer.team = "Team 1" (consistent string)

// Capacity microflow MUST return:
TeamCapacity.teamName = "Team 1" (EXACT same string)

// Widget code depends on:
const capacity = teamCapacities.find(cap => cap.teamName === engineer.team);
```

#### 3. Data Consistency Validation
The microflows should ensure:
- **Team names are identical** between Engineer and TeamCapacity entities
- **Engineer IDs are valid** references that exist in CalendarEvents
- **Date formats are consistent** (ISO date strings: "YYYY-MM-DD")

### Microflow Return Value Requirements

#### Engineers Microflow Response
```typescript
{
  id: "12345678-1234-1234-1234-123456789abc",        // SPUser GUID
  name: "John Doe",                                   // Display name
  team: "Team 1",                                     // EXACT team name
  lane: "NXT A",                                      // Lane display name
  mendixObject: ObjectItem                            // Mendix object reference
}
```

#### Shifts Microflow Response  
```typescript
{
  id: "87654321-4321-4321-4321-cba987654321",        // CalendarEvents GUID
  engineerId: "12345678-1234-1234-1234-123456789abc", // MUST match Engineer.id
  date: "2025-01-15",                                 // ISO date string
  shift: "M",                                         // M/E/N/D/H/T
  status: "approved",                                 // Optional status
  shiftDate: Date object,                             // Original date
  mendixObject: ObjectItem                            // Mendix object reference
}
```

#### Capacity Microflow Response
```typescript
{
  teamName: "Team 1",                                 // CRITICAL: MUST match Engineer.team exactly
  isNXT: true,                                        // Department flag
  date: "2025-01-15",                                 // ISO date string
  percentage: 95,                                     // Capacity percentage
  target: 90,                                         // Target percentage (0 if no target)
  meetsTarget: true,                                  // percentage >= target
  weekNumber: 3                                       // Week number
}
```

**⚠️ CRITICAL**: The `teamName` field is essential for data matching. The microflow **MUST** populate this field with the exact same string that appears in `Engineer.team`. The current widget implementation has a temporary fallback (`"Team NXT"` or `"Team XT"`) but this will not work correctly for real team data.

## Benefits

### Performance
- **Reduced data transfer**: Only ~30 days of shifts loaded at a time vs 2+ years
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

## Implementation Changes

### Removed from Widget
- ❌ Filter data sources (`filters`, `filterTeamAssociation`, `filterLaneAssociation`)
- ❌ Team/Lane datasources for filtering
- ❌ Client-side filtering logic in `useShiftData.ts`
- ❌ Engineer team/lane association properties (just added, now unnecessary)

### New Widget Configuration
```xml
<property key="engineers" type="datasource" dataSourceType="microflow">
    <caption>Engineers (Filtered)</caption>
    <description>MF_GetFilteredEngineers - Returns visible engineers with team/lane data</description>
</property>

<property key="shifts" type="datasource" dataSourceType="microflow">
    <caption>Shifts by Date Range</caption>
    <description>MF_GetShiftsByDateRange - Returns shifts for current date range</description>
</property>

<property key="capacity" type="datasource" dataSourceType="microflow">
    <caption>Capacity by Date Range</caption> 
    <description>MF_GetCapacityByDateRange - Returns capacity data for current date range</description>
</property>
```

## Pagination Strategy

### Date Range Management
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
    refreshShiftsData(startDate, endDate);
    refreshCapacityData(startDate, endDate);
    // Engineers remain cached
};
```

## Migration Path

### Phase 1: Create Microflows
1. Build `MF_GetFilteredEngineers` 
2. Build `MF_GetShiftsByDateRange` with date parameters
3. Build `MF_GetCapacityByDateRange` with date parameters
4. Test microflows independently

### Phase 2: Update Widget Configuration  
1. Replace data sources with microflow sources
2. Add date range parameters to shift/capacity sources
3. Remove filter-related properties

### Phase 3: Simplify Widget Code
1. Remove client-side filtering logic
2. Implement date range navigation
3. Add pagination controls
4. Remove unnecessary interfaces and types

## Performance Expectations

### Before (Database Sources)
- Initial load: 50,000+ shift records (2 years)
- Memory usage: ~500MB+ 
- Load time: 30+ seconds or crash
- Network transfer: 50+ MB

### After (Microflow Sources)
- Initial load: ~1,000 shift records (30 days)
- Memory usage: ~10MB
- Load time: 2-3 seconds  
- Network transfer: 1-2 MB

## Future Enhancements

### Caching Strategy
- Implement microflow result caching for frequently accessed date ranges
- Cache engineer data globally (rarely changes)
- Smart cache invalidation on data updates

### Advanced Pagination
- Implement bi-directional infinite scroll
- Pre-load adjacent months for smoother navigation
- Add "jump to date" functionality

### Performance Monitoring
- Add performance logging to microflows
- Monitor data transfer sizes
- Track user navigation patterns for optimization

---

**Document Version**: 1.0  
**Date**: 2025-01-02  
**Status**: Proposed Architecture  
**Next Review**: After Phase 1 implementation