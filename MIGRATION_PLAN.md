# Migration Plan: modern-schedule-board → shiftScheduler

*Extracting useful components from modern-schedule-board to build the ideal shiftScheduler*

## Overview

**Goal**: Build the ideal shift scheduler using the best patterns from modern-schedule-board, optimized for USE_CASES.md requirements.

**Approach**: Clean slate development - breaking changes are acceptable for better architecture.

## Components to Migrate

### 1. Date Helpers (HIGH PRIORITY)

**Source**: `/modern-schedule-board/src/utils/dateHelpers.ts`  
**Target**: `/shiftScheduler/src/utils/dateHelpers.ts` (new file)

**Current State in modern-schedule-board**:
- Uses dayjs with timezone, utc, comparison plugins
- Functions: formatDate, parseDate, addDays, addHours, isSameDay, isWithinRange, getDurationInMinutes, getWeekRange, getMonthRange, roundToNearestMinutes

**Current State in shiftScheduler**:
- Uses date-fns basic functions
- Missing advanced date utilities

**Migration Tasks**:
- [ ] **Keep dayjs** (proven in modern-schedule-board, smaller than date-fns with plugins)
- [ ] Port complete dateHelpers.ts utility set
- [ ] Add shift-specific date functions (shift boundaries, rotation patterns)
- [ ] Add infinite scroll date range calculations
- [ ] Optimize for 24/7 scheduling use case

**Dependencies Change**:
```json
{
  "dayjs": "^1.11.0",           // Replace date-fns
  "moment-timezone": "remove"   // Remove if present
}
```

### 2. Mendix Data Integration (HIGH PRIORITY)

**Source**: `/modern-schedule-board/src/hooks/useSchedulerData.ts`  
**Target**: Replace placeholder logic in `/shiftScheduler/src/ShiftScheduler.tsx`

**Current State in modern-schedule-board**:
- Proper ListValue and ListAttributeValue handling
- Loading states and error handling
- Data transformation patterns
- Mendix object attribute access

**Current State in shiftScheduler**:
- Placeholder mapping in main component
- Basic mx.data.get usage
- Missing proper loading states

**Migration Tasks**:
- [ ] **Complete rewrite** of data integration using modern patterns
- [ ] Implement proper Engineer/ShiftAssignment entity handling
- [ ] Add team-based access control and filtering
- [ ] Build holiday request integration
- [ ] Add real-time data refresh capabilities
- [ ] Implement optimistic updates for shift changes

### 3. Enhanced TypeScript Types (MEDIUM PRIORITY)

**Source**: `/modern-schedule-board/src/types/SchedulerTypes.ts`  
**Target**: Enhance `/shiftScheduler/src/types/index.ts`

**Useful Patterns from modern-schedule-board**:
- Comprehensive widget props interface
- Mendix integration types (ListAttributeValue, ActionValue)
- Preview component props
- React event handler types

**Current shiftScheduler Types**:
- Basic Engineer and ShiftAssignment interfaces
- Minimal Mendix type declarations

**Migration Tasks**:
- [ ] Add comprehensive widget props interface
- [ ] Enhance Mendix integration types
- [ ] Add action handler types for editing
- [ ] Add preview component props
- [ ] Improve type safety throughout

### 4. Error Handling Patterns (LOW PRIORITY)

**Source**: Error handling in modern-schedule-board components  
**Target**: Add to shiftScheduler components

**Migration Tasks**:
- [ ] Add data loading error states
- [ ] Add user action error handling
- [ ] Add validation error display
- [ ] Add fallback UI components

## Components NOT to Migrate

### ❌ Timeline Library Dependencies
- **Files**: TimelineContainer.tsx, react-calendar-timeline usage
- **Reason**: Wrong architecture for day-grid scheduler
- **Keep**: shiftScheduler's custom grid components

### ❌ Event Drag & Drop Logic  
- **Files**: Drag handlers in modern-schedule-board
- **Reason**: For event dragging, not timeline scrolling
- **Alternative**: Implement drag-to-scroll natively in shiftScheduler

### ❌ Complex State Management
- **Files**: Over-engineered state patterns
- **Reason**: shiftScheduler's simpler approach is better
- **Keep**: Current shiftScheduler component structure

### ❌ Unused Widget Properties
- **Files**: enableResize, enableMultiSelect, etc.
- **Reason**: Not needed for shift scheduling use case

## Migration Strategy

### Phase 1: Date Utilities (0.5 weeks)
1. Create `shiftScheduler/src/utils/dateHelpers.ts`
2. Port essential date functions from dayjs to date-fns
3. Add timezone support via date-fns-tz
4. Update existing date usage in shiftScheduler
5. Test date calculations

### Phase 2: Mendix Integration (1 week)
1. Extract data patterns from useSchedulerData
2. Replace placeholder Mendix logic in ShiftScheduler.tsx
3. Add proper loading states and error handling
4. Implement team-based data filtering
5. Test with real Mendix entities

### Phase 3: TypeScript Enhancement (0.5 weeks)
1. Enhance type definitions in types/index.ts
2. Add comprehensive widget props interface
3. Improve type safety in components
4. Add action handler types
5. Update component signatures

### Phase 4: Error Handling (0.5 weeks)
1. Add error boundaries and fallback UI
2. Improve user feedback for failed actions
3. Add data validation error display
4. Test error scenarios

## Ideal File Structure (Clean Slate)

```
shiftScheduler/
├── src/
│   ├── ShiftScheduler.tsx                    // Main widget with modern patterns
│   ├── components/
│   │   ├── DayCell.tsx                       // Enhanced for all interactions
│   │   ├── ScheduleRow.tsx                   // Renamed from EngineerRow
│   │   ├── ScheduleGrid.tsx                  // Renamed from ShiftSchedulerComponent
│   │   ├── TeamSection.tsx                   // Enhanced with role-based controls
│   │   └── LoadingStates.tsx                 // NEW - proper loading/error UI
│   ├── hooks/
│   │   ├── useShiftData.ts                   // NEW - modern data integration
│   │   ├── useScrollNavigation.ts            // NEW - drag-to-scroll + infinite scroll
│   │   └── useTeamAccess.ts                  // NEW - role-based filtering
│   ├── types/
│   │   └── scheduler.ts                      // Renamed, comprehensive types
│   ├── utils/
│   │   ├── dateHelpers.ts                    // Migrated + enhanced
│   │   └── shiftHelpers.ts                   // NEW - shift-specific utilities
│   └── ui/
│       └── ShiftScheduler.css               // Enhanced for better UX
```

## Dependencies Impact

### Optimal Dependencies (Clean Slate):
```json
{
  "dependencies": {
    "classnames": "^2.2.6",                    // Conditional CSS (essential)
    "dayjs": "^1.11.0",                        // Modern date handling (replace date-fns)
    "react-intersection-observer": "^9.16.0"   // Infinite scroll (essential)
  }
}
```

### Remove:
- `date-fns` → replaced by `dayjs` (better plugins, smaller for our use case)
- `moment.js/moment-timezone` → replaced by `dayjs` (if present anywhere)

## Testing Strategy

### Unit Tests
- [ ] Date helper functions
- [ ] Data transformation logic
- [ ] Component rendering with various props

### Integration Tests  
- [ ] Mendix data loading
- [ ] User interactions (double-click, context menu)
- [ ] Error scenarios

### Manual Testing
- [ ] Timeline scrolling and infinite loading
- [ ] Team-based data filtering
- [ ] Date range calculations
- [ ] Performance with large datasets

## Rollback Plan

### If Migration Issues Occur:
1. **Keep current shiftScheduler as backup** before starting
2. **Migrate incrementally** - test each phase before proceeding
3. **Feature flags** for new functionality during testing
4. **Git branches** for each migration phase

## Success Criteria

### Functional Requirements:
- ✅ **Perfect match** for USE_CASES.md requirements
- ✅ **Team-grouped day-grid** layout with drag-to-scroll
- ✅ **Double-click editing** + context menus
- ✅ **Holiday request integration** with approval states
- ✅ **Role-based access control** (TL team restrictions)

### Technical Requirements:
- ✅ **Bundle size < 40kB** (leaner than current)
- ✅ **Modern React patterns** (hooks, TypeScript)
- ✅ **Optimal dependencies** (dayjs, classnames, intersection-observer)
- ✅ **Maintainable architecture** with clear separation

### User Experience:
- ✅ **Intuitive timeline navigation** (drag-to-scroll + infinite load)
- ✅ **Clear visual hierarchy** (teams, shifts, roles, statuses)
- ✅ **Responsive interactions** (hover, double-click, context menu)
- ✅ **Proper loading states** and error feedback

---

*This clean slate approach builds the ideal shift scheduler using proven patterns, optimized for 24/7 team scheduling.*