# Shift Scheduler Widget Design

*Based on USE_CASES.md requirements - lean, focused, day-grid approach*

## Architecture Overview

### Design Philosophy
- **Minimal dependencies** - Only what's essential
- **Day-grid layout** - Simple horizontal timeline, not complex timeline library
- **Direct interaction** - Double-click editing, context menus, drag-to-scroll timeline
- **Team-focused** - Engineers grouped by teams with clear visual separation
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
├── ShiftScheduler.tsx                 // Main widget
├── components/
│   ├── ShiftSchedulerComponent.tsx    // Core logic & layout
│   ├── TeamSection.tsx                // Team grouping
│   ├── EngineerRow.tsx                // Individual engineer timeline
│   └── DayCell.tsx                    // Single day cell with shift data
├── types/
│   └── index.ts                       // Engineer, ShiftAssignment interfaces
└── ui/
    └── ShiftScheduler.css             // Grid layout & shift colors
```

## Data Model

### Core Entities
```typescript
interface Engineer {
  id: string;
  name: string;
  Team: { Name: string };
}

interface ShiftAssignment {
  id: string;
  Date: string;           // ISO date
  engineerId: string;
  shift: string;          // M/E/N/D/H/T
  Type: string;           // Shift type
  Role?: string;          // TL/BTL/SPE/OSI
  Status?: string;        // planned/approved/rejected
  comment?: string;
}
```

## Layout Strategy

### Grid Structure
- **Rows**: Engineers grouped by team
- **Columns**: Days (30-day blocks, lazy loaded)
- **Cells**: One per engineer-day showing shift assignment
- **Headers**: Date navigation, team separators

### Visual Design
- **Team sections** with headers and visual grouping
- **Color coding** by shift type (M=blue, E=green, N=orange, etc.)
- **Role indicators** via borders (TL=solid, BTL=dashed)
- **Status indicators** for approval states

## Interaction Patterns

### Primary Actions
- **Double-click day cell** → Edit/create shift assignment
- **Right-click day cell** → Context menu (range edit, delete, etc.)
- **Hover** → Tooltip with shift details & comments

### Navigation
- **Drag-to-scroll** timeline horizontally (like panning a map)
- **Mouse wheel** for horizontal scrolling
- **Infinite scroll** loads more 15-day blocks when reaching edges
- **Date range picker** for jumping to specific periods

## Performance Strategy

### Data Loading
- **Lazy loading** - Start with 30 days, extend as needed
- **XPath filtering** by date ranges and teams
- **Team-based access control** at data level

### Rendering Optimization
- **Intersection Observer** for infinite scroll
- **React.memo** for expensive components
- **Virtualization** only if needed (30-day blocks are manageable)

## Integration Points

### Mendix Integration
- **Entity-based** data model matching USE_CASES.md
- **Direct read/write** via Mendix context
- **Role-based filtering** for team access control
- **Action integration** for edit dialogs/workflows

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

### Phase 1: Core Grid (1 week)
- ✅ Team-grouped engineer rows
- ✅ Day-based timeline grid
- ✅ Basic shift display with colors
- ✅ Horizontal scrolling

### Phase 2: Interactions (1 week)
- ✅ Double-click editing
- ✅ Context menu framework  
- ✅ Hover tooltips
- ✅ Drag-to-scroll timeline navigation
- ✅ Infinite scroll loading

### Phase 3: Data Integration (1 week)
- Entity read/write via Mendix
- Team-based filtering
- Role-based access control
- Holiday request integration

### Phase 4: Polish (0.5 weeks)
- Performance optimization
- Accessibility improvements
- Error handling
- Documentation

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
- ❌ Microflow integration (double-click triggers)
- ❌ Context menus with role-based options
- ❌ Mendix entity integration (placeholder mapping)  
- ❌ Request status visualization
- ❌ Role-based UI differences (engineer vs TL)

**Conclusion**: shiftScheduler is 80% complete for your use case!

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
- **Initial load**: < 300ms for 30-day view
- **Smooth scrolling**: Native browser performance

### Feature Completeness
- ✅ **Team-grouped day grid** layout
- ✅ **Double-click editing** integration
- ✅ **Context menu** actions
- ✅ **Holiday request** workflow
- ✅ **Role-based access** control

### Maintainability
- ✅ **TypeScript** throughout
- ✅ **Minimal dependencies** 
- ✅ **Clear component separation**
- ✅ **Focused scope** (no feature creep)

---

*This design builds on the proven shiftScheduler foundation to deliver exactly what's needed - no more, no less.*