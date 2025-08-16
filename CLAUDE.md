# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a **Shift Scheduler widget** development project for Mendix. The goal is to build a custom pluggable widget for 24/7 shift planning in a 5-team rotation, allowing team leaders to view, assign, edit, and approve events, holidays, and roles per person.

## Project Structure

### Active Development
- **Root directory** - **Primary development widget** - Modern React/TypeScript shift scheduler with day-grid layout
- `src/` - Main widget source code (TypeScript/React)

### Reference Materials  
- `reference/itvisors-scheduleboard/` - Original ITVisors ScheduleBoard widget (v3.0.0) with analysis document
- `reference/modern-schedule-board/` - Experimental timeline-based widget (abandoned approach) with design document

### Documentation
- `docs/USE_CASES.md` - Complete requirements and use case specification
- `docs/SHIFT_SCHEDULER_DESIGN.md` - Current architecture and design decisions
- `docs/ROADMAP.md` - Development roadmap and future feature planning
- `CHANGELOG.md` - Version history and release notes
- `docs/MENDIX_10_18_COMPATIBILITY.md` - Action variables implementation and legacy migration guide

## Primary Widget: Shift Scheduler

### Architecture
- **Widget Type**: Mendix pluggable widget with entity context support, web platform
- **Core Functionality**: Day-grid scheduler with team-based organization
- **Data Model**: People and Event entities with direct Mendix integration  
- **UI Pattern**: Horizontal scrollable timeline with team-grouped person rows
- **Interactions**: Double-click editing, context menus, drag-to-scroll navigation
- **Hook Architecture**: Modular, composable hooks (v1.12.0+) for better maintainability

### Technology Stack
```json
{
  "framework": "React 18 with TypeScript",
  "dependencies": {
    "dayjs": "^1.11.13",                       // Date handling
    "react-intersection-observer": "^9.16.0"   // Infinite scroll
  },
  "build": "@mendix/pluggable-widgets-tools ^10.21.2"
}
```

### Platform Features  
- **Action Variables**: ✅ Implemented for Mendix 10.24+ with typed parameter passing
- **Security**: Uses `ActionValue.canExecute` for permissions-based execution

### Key Components
- `src/ShiftScheduler.tsx` - Main widget entry point
- `src/components/ScheduleGrid.tsx` - Core grid layout and logic
- `src/components/TeamSection.tsx` - Team grouping component with capacity indicators
- `src/components/LaneSection.tsx` - Lane grouping component within teams
- `src/components/PersonRow.tsx` - Individual person row component
- `src/components/DayCell.tsx` - Single day cell with event display
- `src/components/ContextMenu.tsx` - Right-click context menu functionality
- `src/components/TeamCapacityIndicator.tsx` - Team capacity display component
- `src/components/LoadingStates.tsx` - Loading, error, and empty state components
- `src/components/DebugPanel.tsx` - Development debug information panel

### Custom Hooks (Modular Architecture v1.12.0+)
**Core Data Management:**
- `src/hooks/useEventData.ts` - Main orchestrator hook (516 lines)
- `src/hooks/useErrorTracking.ts` - Centralized error management (113 lines) 
- `src/hooks/usePeopleTransform.ts` - People data transformation (127 lines)
- `src/hooks/useEventsTransform.ts` - Events data transformation (158 lines)
- `src/hooks/useTeamCapacities.ts` - Team capacity management (133 lines)
- `src/hooks/useDayCellData.ts` - Day cell data with validation (184 lines)

**UI Interaction:**
- `src/hooks/useScrollNavigation.ts` - Horizontal scroll and infinite loading
- `src/hooks/useMultiSelect.ts` - Multi-selection with keyboard modifiers
- `src/hooks/useKeyboardNavigation.ts` - Arrow keys and keyboard shortcuts
- `src/hooks/useContextMenu.ts` - Context menu state and option generation
- `src/hooks/useTeamGrouping.ts` - Team/lane structure processing

**Utilities:**
- `src/utils/dataQueries.ts` - Pure data query functions (115 lines)
- `src/utils/mendixDataExtraction.ts` - Centralized data extraction with falsy value handling (39 lines)
- `src/utils/eventCategorization.ts` - Event categorization logic with error handling (69 lines)
- `src/utils/eventProcessing.ts` - Event transformation utilities for better maintainability (142 lines)

### Type Definitions
- `src/types/shiftScheduler.ts` - TypeScript interfaces for People and Event assignments

### Data Model
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
  replacesEventId?: string; // ID of event this request replaces
  shiftDate: Date;        // Original date object
}
```

### Visual Design
- **Color coding**: M=blue, E=green, N=orange, D=red, H=gray, T=yellow
- **Status patterns**: 
  - **Solid colors**: Active/approved events (highest confidence)
  - **Diagonal stripes**: Pending/requested events (awaiting decision)
  - **Vertical stripes**: TBD events (deferred for later resolution)
- **Role indicators**: TL=solid border, BTL=dashed border
- **Team organization**: People grouped under team headers
- **Multiple events**: Stacked layout with active events on top, requests below
- **Timeline navigation**: Horizontal scroll with 30-day blocks, infinite loading

## Development Commands

### Shift Scheduler (Primary Widget)
```bash
npm run dev          # Development server  
npm run build        # Production build
npm run lint         # Code quality checks
npm run lint:fix     # Auto-fix linting issues
```


## Working with This Codebase

### Primary Development Focus
- **Main widget**: Work in root directory (`src/` folder)
- **Requirements**: Follow specifications in `docs/USE_CASES.md`
- **Architecture**: Follow patterns in `docs/SHIFT_SCHEDULER_DESIGN.md`
- **Development plan**: Follow roadmap in `docs/ROADMAP.md`

### Key Files to Understand
- `src/ShiftScheduler.tsx` - Widget entry point and Mendix integration
- `src/components/ScheduleGrid.tsx` - Core scheduling logic and UI
- `src/components/DebugPanel.tsx` - Development debug panel
- `src/types/shiftScheduler.ts` - Data model definitions
- `docs/USE_CASES.md` - Complete feature requirements

### Common Development Tasks
- **Add new features**: Follow the component structure in `src/components/`
- **Data integration**: Enhance Mendix entity handling in main widget file
- **Styling**: Update `src/ui/ShiftScheduler.css`
- **Type safety**: Enhance interfaces in `src/types/shiftScheduler.ts`

### Migration Strategy
The project completed a comprehensive quality transformation through systematic refactoring:

1. **Context menu permissions** - Three-state permission model (not-configured/no-permission/allowed) ✅ v1.7.0
2. **Code organization** - Extracted debug functionality into separate components ✅ v1.7.0  
3. **Inclusive terminology** - Updated "Engineers" to "People" and "Shifts" to "Events" ✅ v1.7.0
4. **Architecture refactoring** - Decomposed monolithic hook into modular components ✅ v1.12.0
5. **TypeScript enhancement** - Added comprehensive type guards and validation ✅ v1.12.0
6. **Error handling** - Implemented robust error tracking across all modules ✅ v1.12.0
7. **Performance optimization** - Set-based lookups and efficient algorithms ✅ v1.12.0
8. **Data integrity** - Fixed silent failures and deterministic behavior ✅ v1.12.0

### Design Principles
- **Lean dependencies** - Only essential libraries (no heavy timeline frameworks)
- **Domain-focused** - Built specifically for 24/7 shift scheduling
- **Team-centric** - People organized by teams with role-based access
- **Day-grid layout** - Simple horizontal timeline, not complex time ranges  
- **Direct interaction** - Double-click editing and context menus (no drag-and-drop for events)
- **Infinite scrolling** - 30-day blocks with lazy loading

### Reference Widget Context
- **reference/itvisors-scheduleboard/**: Complex timeline widget with extensive features - used for learning Mendix patterns, not architecture
- **reference/modern-schedule-board/**: Timeline library experiment - useful for date utilities and TypeScript patterns, but wrong architectural direction

When working on this codebase, focus on the root Shift Scheduler widget as the primary development target, using the reference widgets only for extracting useful patterns and utilities.