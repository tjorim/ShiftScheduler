# Mendix 10.24+ Action Variables Implementation

## Overview

This document tracks the completed migration from Mendix 10.18 context attribute pattern to Mendix 10.24+ action variables pattern.

## Background

**Mendix 10.18 (MTS) Limitation:**
- `ActionValue.execute()` takes no parameters
- Cannot pass context data directly to microflows
- Required context attribute workaround pattern

**Mendix 10.21+ Action Variables:**
- `ActionValue.execute({ param: value })` supports direct parameter passing
- Action variables defined in widget XML
- Much simpler widget code

**✅ Current Implementation (10.24+)**

### Widget Properties (XML)
```xml
<property key="onEditEvent" type="action" required="false">
    <caption>On Edit Event</caption>
    <description>Action to execute when editing an existing event</description>
    <actionVariables>
        <actionVariable key="eventId" type="String" caption="Event ID" />
    </actionVariables>
</property>

<property key="onCreateEvent" type="action" required="false">
    <caption>On Create Event</caption>
    <description>Action to execute when creating a new event</description>
    <actionVariables>
        <actionVariable key="personId" type="String" caption="Person ID" />
        <actionVariable key="date" type="String" caption="Date" />
    </actionVariables>
</property>

<property key="onBatchCreate" type="action" required="false">
    <caption>On Batch Create</caption>
    <description>Action to execute when batch creating events</description>
    <actionVariables>
        <actionVariable key="selectedCellsJson" type="String" caption="Selected Cells JSON" />
    </actionVariables>
</property>
```

### Widget Code Pattern
```typescript
// ScheduleGrid receives typed ActionValues
interface ScheduleGridProps {
    onEditEvent?: ActionValue<{ eventId: Option<string> }>;
    onCreateEvent?: ActionValue<{ personId: Option<string>; date: Option<string> }>;
    onBatchCreate?: ActionValue<{ selectedCellsJson: Option<string> }>;
    // ...
}

// Direct action execution with parameters
if (onEditEvent?.canExecute && !onEditEvent.isExecuting) {
    onEditEvent.execute({ eventId: event.id });
}

if (onCreateEvent?.canExecute && !onCreateEvent.isExecuting) {
    onCreateEvent.execute({ personId: person.id, date: dateString });
}
```

### Microflow Usage
Microflows receive action variables directly:
- `$eventId` - Selected event ID
- `$personId` - Selected person ID  
- `$date` - Selected date
- `$selectedCellsJson` - JSON array for batch operations

## ✅ Migration Completed

### Action Variables Usage

| Action | Parameters Passed | Microflow Receives |
|--------|------------------|-------------------|
| **Edit Event** | `{ eventId: event.id }` | `$eventId` |
| **Delete Event** | `{ eventId: event.id }` | `$eventId` |
| **Create Event** | `{ personId: person.id, date: dateString }` | `$personId`, `$date` |
| **Batch Edit** | `{ selectedCellsJson: "id1,id2,id3" }` | `$selectedCellsJson` |
| **Batch Delete** | `{ selectedCellsJson: "id1,id2,id3" }` | `$selectedCellsJson` |
| **Batch Create** | `{ selectedCellsJson: '[{"personId":"123","date":"2025-01-15"}]' }` | `$selectedCellsJson` |

## Benefits Achieved

✅ **Simpler Code**: No context attribute management needed  
✅ **Better Type Safety**: Action variables are properly typed in Mendix  
✅ **Cleaner XML**: Fewer widget properties to maintain  
✅ **Standard Pattern**: Follows Mendix 10.21+ best practices  
✅ **Performance**: Direct parameter passing without intermediate steps

## Legacy Migration Guide (10.18 → 10.24+)

### Step 1: Update XML Properties

**Remove** context attributes:
```xml
<!-- DELETE THESE -->
<property key="contextShiftId" type="attribute" required="false">...</property>
<property key="contextEngineerId" type="attribute" required="false">...</property>
<property key="contextDate" type="attribute" required="false">...</property>
<property key="contextSelectedCells" type="attribute" required="false">...</property>
```

**Add** action variables:
```xml
<property key="onEditShift" type="action" required="false">
    <caption>On Edit Shift</caption>
    <actionVariables>
        <actionVariable key="shiftId" type="String" caption="Shift ID" />
    </actionVariables>
</property>

<property key="onCreateShift" type="action" required="false">
    <caption>On Create Shift</caption>
    <actionVariables>
        <actionVariable key="engineerId" type="String" caption="Engineer ID" />
        <actionVariable key="shiftDate" type="String" caption="Shift Date" />
    </actionVariables>
</property>

<property key="onBatchCreate" type="action" required="false">
    <caption>On Batch Create</caption>
    <actionVariables>
        <actionVariable key="selectedCellsJson" type="String" caption="Selected Cells JSON" />
    </actionVariables>
</property>
```

### Step 2: Update TypeScript Interfaces

**Remove** context attribute props:
```typescript
interface ScheduleGridProps {
    onEditShift?: ActionValue;
    // DELETE THESE:
    // contextShiftId?: any;
    // contextEngineerId?: any;
    // contextDate?: any;
    // contextSelectedCells?: any;
}
```

### Step 3: Update Widget Code

**Find & Replace** in ScheduleGrid component:

#### Edit/Delete Actions
```typescript
// FROM (10.18):
if (onEditShift?.canExecute && !onEditShift.isExecuting) {
    if (contextShiftId?.setValue) {
        contextShiftId.setValue(shift.id);
    }
    onEditShift.execute();
}

// TO (10.21+):
if (onEditShift?.canExecute && !onEditShift.isExecuting) {
    onEditShift.execute({ shiftId: shift.id });
}
```

#### Create Actions
```typescript
// FROM (10.18):
if (onCreateShift?.canExecute && !onCreateShift.isExecuting) {
    if (contextEngineerId?.setValue) {
        contextEngineerId.setValue(engineerId);
    }
    if (contextDate?.setValue) {
        contextDate.setValue(date);
    }
    onCreateShift.execute();
}

// TO (10.21+):
if (onCreateShift?.canExecute && !onCreateShift.isExecuting) {
    onCreateShift.execute({ 
        engineerId: engineerId, 
        shiftDate: date 
    });
}
```

#### Batch Actions
```typescript
// FROM (10.18):
if (onBatchCreate?.canExecute && !onBatchCreate.isExecuting) {
    if (contextSelectedCells?.setValue) {
        contextSelectedCells.setValue(JSON.stringify(emptyCells));
    }
    onBatchCreate.execute();
}

// TO (10.21+):
if (onBatchCreate?.canExecute && !onBatchCreate.isExecuting) {
    onBatchCreate.execute({ 
        selectedCellsJson: JSON.stringify(emptyCells) 
    });
}
```

### Step 4: Update ShiftScheduler Component

**Remove** context attribute passing:
```typescript
// DELETE THESE PROPS:
// contextShiftId={contextShiftId}
// contextEngineerId={contextEngineerId}
// contextDate={contextDate}
// contextSelectedCells={contextSelectedCells}
```

### Step 5: Remove Context Attributes from Constructor

**Remove** context attribute destructuring:
```typescript
export function ShiftScheduler({
    // DELETE THESE:
    // contextShiftId,
    // contextEngineerId, 
    // contextDate,
    // contextSelectedCells,
    onEditShift,
    // ...
}: ShiftSchedulerContainerProps) {
```

### Step 6: Update Microflows

Microflows will receive action variables instead of page parameters:
- `$shiftId` instead of `$contextShiftId`
- `$engineerId` instead of `$contextEngineerId`
- `$shiftDate` instead of `$contextDate`
- `$selectedCellsJson` instead of `$contextSelectedCells`

## Testing Migration

1. **Build Test**: Ensure widget builds without TypeScript errors
2. **Functionality Test**: Verify all actions work with new parameter passing
3. **Security Test**: Confirm `canExecute` still works correctly
4. **Performance Test**: Check for any performance improvements

## Benefits After Migration

1. **Simpler Code**: No context attribute management
2. **Better Type Safety**: Action variables are typed
3. **Cleaner XML**: Fewer widget properties
4. **Standard Pattern**: Follows Mendix best practices
5. **Performance**: No intermediate attribute setting

## Rollback Plan

If issues arise, rollback is simple:
1. Revert XML to include context attributes
2. Revert TypeScript code to context setting pattern
3. Update microflows back to page parameters

Keep this documentation and the 10.18-compatible code in version control for easy rollback.