# Shift Scheduler Widget Design

*Based on USE_CASES.md requirements - lean, focused, day-grid approach*

## Architecture Overview

### Design Philosophy
- **Minimal dependencies** - Only what's essential
- **Day-grid layout** - Simple horizontal timeline, not complex timeline library
- **Direct interaction** - Double-click editing, context menus, drag-to-scroll timeline
- **Team-focused** - People grouped by teams with clear visual separation
- **Entity-driven** - Direct Mendix entity read/write

## Technology Stack

### Core Dependencies
```json
{
  "date-fns": "^4.1.0",           // Modern date handling
  "classnames": "^2.2.6",        // Conditional CSS
  "react-intersection-observer": "^9.16.0"  // Infinite scroll
}
```

### Build Tools
- **Mendix Pluggable Widgets Tools** (standard)
- **TypeScript** for type safety
- **React 18** functional components + hooks

## Component Architecture

```
ShiftScheduler/
├── ShiftScheduler.tsx                 // Main widget with action handlers
├── components/
│   ├── ShiftSchedulerComponent.tsx    // Core logic & layout with multi-select
│   ├── ContextMenu.tsx                // Right-click context menus
│   ├── TeamSection.tsx                // Team grouping
│   ├── PersonRow.tsx                  // Individual person timeline
│   └── DayCell.tsx                    // Single day cell with double-click
├── types/
│   └── index.ts                       // Person, EventAssignment interfaces
├── hooks/
│   └── useShiftData.ts                // Data management with associations
└── ui/
    └── ShiftScheduler.css             // Grid layout, shift colors & context menu
```

## Data Model

### Core Entities
```typescript
interface Person {
  id: string;
  name: string;
  team: string;           // Team name (e.g., "Team 1", "Team 2")
  lane: string;           // Lane name (e.g., "XT", "NXT A", "NXT B")
}

interface EventAssignment {
  id: string;
  date: string;           // ISO date
  personId: string;
  eventType: string;      // M/E/N/D/H/T
  status?: string;        // active/inactive/pending/rejected/planned/approved/error/tbd
  isRequest?: boolean;    // True for requests, false for assignments
  replacesEventId?: string; // ID of event this request would replace
  shiftDate: Date;        // Original date object
}

// Multiple Events Per Day Support (v1.10.0+)
interface DayCellData {
  activeEvent?: EventAssignment;     // Status = 'Active', isRequest = false
  pendingRequest?: EventAssignment;  // Status = 'Pending', isRequest = true
  inactiveEvents?: EventAssignment[]; // Status = 'Inactive' (for filtering)
  rejectedRequests?: EventAssignment[]; // Status = 'Rejected' (for filtering)
  plannedEvents?: EventAssignment[]; // Status = 'planned' (scheduled but not yet active)
  approvedEvents?: EventAssignment[]; // Status = 'approved' (approved events)
  errorEvents?: EventAssignment[]; // Status = 'error' (events with processing errors)
}
```

## Layout Strategy

### Grid Structure
- **Rows**: People grouped by team
- **Columns**: Days (30-day blocks, lazy loaded)
- **Cells**: One per person-day showing event assignment
- **Headers**: Date navigation, team separators

### Visual Design
- **Team sections** with headers and visual grouping
- **Color coding** by shift type (M=blue, E=green, N=orange, etc.)
- **Role indicators** via borders (TL=solid, BTL=dashed)
- **Status indicators** for approval states

### Multiple Events Per Day (v1.10.0+)
- **Stacked Layout**: Active events display on top, pending requests below
- **Request Notation**: Pending requests shown as `[H?]` with dashed borders and italic styling
- **Visual Priority**: Active events get primary background color, requests are overlaid
- **Cell Height**: Dynamic sizing (40px base, 50px with requests) for optimal content display
- **Empty State**: Enhanced with `+` symbol for better action affordance

**Example Visual Layout:**
```text
John Doe  │  M   │  E   │  H   │  N   │
          │ [H?] │      │      │      │  ← Pending request below active event

Jane Doe  │  M   │      │ [H?] │  N   │  ← Only request (no active event)
          
Bob Doe   │  H   │  E   │  N   │  M   │  ← Only active event (no requests)
```

## Interaction Patterns

### Primary Actions
- **Double-click day cell** → Edit existing shift or create new shift (default type 'M')
- **Right-click day cell** → Context menu with type-specific options:
  - Empty cells: Create shift with specific type (M/E/N/D/H/T)
  - Existing shifts: Edit, Copy, Delete actions
  - Multi-selection: Batch Edit, Copy, Delete actions
- **Hover** → Tooltip with shift details & comments
- **Ctrl+Click** → Toggle individual cell selection
- **Shift+Click** → Range selection from last selected cell
- **Arrow keys** → Navigate between selected cells
- **Enter/Space** → Edit selected cell(s)
- **Escape** → Clear selection

### Navigation
- **Drag-to-scroll** timeline horizontally (like panning a map)
- **Mouse wheel** for horizontal scrolling
- **Infinite scroll** loads more 15-day blocks when reaching edges
- **Date range picker** for jumping to specific periods

## Performance Strategy

### Data Loading
> **⚠️ IMPORTANT**: Due to production performance issues with large datasets (2+ years of events), the widget architecture has been redesigned to use **microflow-based data sources**. See `MICROFLOW_ARCHITECTURE.md` for the new server-side filtering approach.

- **Microflow data sources** - Server-side filtering and pagination
- **Date range filtering** - Only load 30-day chunks via microflow parameters
- **Team-based access control** - Applied in microflows, not client-side

### Rendering Optimization
- **Intersection Observer** for infinite scroll
- **React.memo** for expensive components
- **Virtualization** only if needed (30-day blocks are manageable)

## Integration Points

### Mendix Integration
> **📋 NEW ARCHITECTURE**: See `MICROFLOW_ARCHITECTURE.md` for the microflow-based data approach that replaces direct entity access.

- **Microflow data sources** - `MF_GetFilteredEngineers`, `MF_GetShiftsByDateRange`, `MF_GetCapacityByDateRange`
- **Server-side filtering** - All business logic and access control in microflows
- **Date range parameters** - Dynamic data loading based on current view
- **Action integration** - Edit dialogs/workflows unchanged

### Request Handling
- **Request types**: Holiday, Training, Meeting, Other, LTF (Long Term Flex)
- **Status indicators**: pending, approved, rejected (visual only)
- **Microflow integration**: Double-click/context menu triggers Mendix popups
- **No widget logic**: Widget displays status, Mendix handles approval workflows

## Key Differences from Timeline Libraries

### Why Not FullCalendar/react-calendar-timeline?
- **Overkill** - You need day cells, not complex time ranges
- **Wrong interactions** - They focus on event drag & drop, not timeline scrolling
- **Bundle size** - Heavy libraries for simple grid needs
- **Customization overhead** - Fighting library assumptions

### Custom Grid Benefits
- **Exact fit** for shift scheduling use case
- **Minimal bundle** - Only essential dependencies
- **Simple maintenance** - No complex library to work around
- **Team-centric design** - Built for your specific workflow

## Development Phases

### Phase 1: Core Grid (1 week) - ✅ Complete v1.7.0
- ✅ Team-grouped person rows
- ✅ Day-based timeline grid
- ✅ Basic event display with colors
- ✅ Horizontal scrolling

### Phase 2: Interactions (1 week) - ✅ Complete v1.7.0
- ✅ Double-click editing (existing: edit, empty: create)
- ✅ Context menu framework with three-state permission model
- ✅ Multi-select with Ctrl/Shift support
- ✅ Keyboard navigation (arrows, enter, escape)
- ✅ Hover tooltips
- ✅ Drag-to-scroll timeline navigation
- ✅ Infinite scroll loading

### Phase 3: Data Integration (1 week) - ✅ Complete v1.7.0
- ✅ Entity read/write via Mendix (SPUser/CalendarEvents)
- ✅ Team-based filtering
- ✅ Role-based access control via ActionValue.canExecute
- ✅ Holiday request integration

### Phase 4: Microflow Migration (1 week) - 🚧 In Progress
- ✅ Architecture design documented (`MICROFLOW_ARCHITECTURE.md`)
- ❌ Create server-side microflows for data filtering
- ❌ Replace widget data sources with microflow sources  
- ❌ Implement date range pagination
- ❌ Remove client-side filtering logic

### Phase 5: Polish (0.5 weeks)
- Performance optimization
- Accessibility improvements
- Error handling
- Documentation updates

## Comparison to shiftScheduler

### Already Implemented in shiftScheduler
- ✅ Team-grouped layout
- ✅ Day-based grid
- ✅ Color-coded shift types
- ✅ Role indicators (TL/BTL borders)
- ✅ Infinite scroll with intersection observer
- ✅ TypeScript + React hooks
- ✅ Minimal dependencies

### Missing Features
- ✅ Microflow integration (double-click triggers) - *Added in v1.5.0*
- ✅ Context menus with action delegation - *Added in v1.5.0*
- ✅ Multi-select functionality - *Added in v1.5.0*
- ✅ Mendix entity integration (SPUser/CalendarEvents) - *Added in v1.5.0*
- ✅ Context menu permission handling - *Added in v1.7.0*
- ✅ Inclusive terminology updates - *Added in v1.7.0*
- ❌ Request status visualization  
- ❌ Role-based UI differences (person vs TL)

**Conclusion**: shiftScheduler is 98% complete for your use case as of v1.7.0!

## Migration from Legacy Widgets

### From ScheduleBoard Widget
- **Incompatible architectures** - fresh start recommended
- **Different use cases** - timeline vs. shift grid
- **Export/import** shift data for migration

### From Existing Systems
- **Direct entity mapping** from current shift databases
- **Gradual rollout** by team or date range
- **Parallel operation** during transition

## Success Metrics

### Performance Targets
- **Bundle size**: < 50kB (currently ~30kB in shiftScheduler)
- **Initial load**: < 3 seconds for 30-day view (down from 30+ seconds)
- **Memory usage**: < 10MB (down from 500MB+ with all data)
- **Data transfer**: < 2MB per month (down from 50MB+ for 2 years)
- **Smooth scrolling**: Native browser performance

### Feature Completeness
- ✅ **Team-grouped day grid** layout
- ✅ **Double-click editing** integration
- ✅ **Context menu** actions
- ✅ **Holiday request** workflow
- ✅ **Three-state permission model** for context menus
- ✅ **Inclusive terminology** (People/Events vs Engineers/Shifts)
- ✅ **Role-based access** control

### Maintainability
- ✅ **TypeScript** throughout
- ✅ **Minimal dependencies** 
- ✅ **Clear component separation**
- ✅ **Focused scope** (no feature creep)

---

*This design builds on the proven shiftScheduler foundation to deliver exactly what's needed - no more, no less.*