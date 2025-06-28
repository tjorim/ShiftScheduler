# Mendix 10.18 Compatibility - Dynamic Attributes Pattern

## Overview

This document explains the dynamic attributes pattern used for Mendix 10.18 compatibility and provides a migration guide for upgrading to Mendix 10.21+ action variables.

## Background

**Mendix 10.18 Limitation:**
- `ActionValue.execute()` takes no parameters
- Cannot pass context data directly to microflows
- Widget developers must use workarounds

**Mendix 10.21+ Improvement:**
- `ActionValue.execute({ param: value })` supports direct parameter passing
- Action variables defined in widget XML
- Much simpler widget code

## Current Implementation (10.18)

### Widget Properties (XML)
```xml
<propertyGroup caption="Context Attributes">
    <property key="contextShiftId" type="attribute" required="false">
        <caption>Context Shift ID</caption>
        <attributeTypes><attributeType name="String" /></attributeTypes>
    </property>
    <property key="contextEngineerId" type="attribute" required="false">
        <caption>Context Engineer ID</caption>
        <attributeTypes><attributeType name="String" /></attributeTypes>
    </property>
    <property key="contextDate" type="attribute" required="false">
        <caption>Context Date</caption>
        <attributeTypes><attributeType name="String" /></attributeTypes>
    </property>
    <property key="contextSelectedCells" type="attribute" required="false">
        <caption>Context Selected Cells</caption>
        <attributeTypes><attributeType name="String" /></attributeTypes>
    </property>
</propertyGroup>
```

### Widget Code Pattern
```typescript
// ScheduleGrid receives ActionValues + context attributes
interface ScheduleGridProps {
    onEditShift?: any; // ActionValue
    contextShiftId?: any; // EditableValue<string>
    // ...
}

// Action execution with context setting
if (onEditShift?.canExecute && !onEditShift.isExecuting) {
    // Set context before calling microflow
    if (contextShiftId?.setValue) {
        contextShiftId.setValue(shift.id);
    }
    // Call microflow
    onEditShift.execute();
}
```

### Microflow Usage
Microflows access context via page parameters:
- `$contextShiftId` - Selected shift ID
- `$contextEngineerId` - Selected engineer ID
- `$contextDate` - Selected date
- `$contextSelectedCells` - JSON array for batch operations

## Context Attributes Usage

| Action | Context Set | Microflow Receives |
|--------|------------|-------------------|
| **Edit Shift** | `contextShiftId = shift.id` | `$contextShiftId` |
| **Delete Shift** | `contextShiftId = shift.id` | `$contextShiftId` |
| **Create Shift** | `contextEngineerId = engineer.id`<br>`contextDate = date` | `$contextEngineerId`<br>`$contextDate` |
| **Batch Edit** | `contextSelectedCells = "id1,id2,id3"` | `$contextSelectedCells` |
| **Batch Delete** | `contextSelectedCells = "id1,id2,id3"` | `$contextSelectedCells` |
| **Batch Create** | `contextSelectedCells = '[{"engineerId":"123","date":"2025-01-15"}]'` | `$contextSelectedCells` |

## Migration Guide to Mendix 10.21+

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