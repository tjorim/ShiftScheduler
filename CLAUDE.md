# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a **Shift Scheduler widget** development project for Mendix. The goal is to build a custom pluggable widget for 24/7 shift planning in a 5-team rotation, allowing team leaders to view, assign, edit, and approve shifts, holidays, and roles per engineer.

## Project Structure

### Active Development
- `shiftScheduler/` - **Primary development widget** - Modern React/TypeScript shift scheduler with day-grid layout

### Reference Materials
- `itvisors-scheduleboard/` - Original ITVisors ScheduleBoard widget (v3.0.0) with analysis document
- `modern-schedule-board/` - Experimental timeline-based widget (abandoned approach) with design document

### Documentation
- `USE_CASES.md` - Complete requirements and use case specification
- `SHIFT_SCHEDULER_DESIGN.md` - Current architecture and design decisions
- `MIGRATION_PLAN.md` - Development roadmap and migration strategy from reference widgets

## Primary Widget: shiftScheduler

### Architecture
- **Widget Type**: Mendix pluggable widget with entity context support, web platform
- **Core Functionality**: Day-grid scheduler with team-based organization
- **Data Model**: Engineer and ShiftAssignment entities with direct Mendix integration
- **UI Pattern**: Horizontal scrollable timeline with team-grouped engineer rows
- **Interactions**: Double-click editing, context menus, drag-to-scroll navigation

### Technology Stack
```json
{
  "framework": "React 18 with TypeScript",
  "dependencies": {
    "classnames": "^2.2.6",                    // Conditional CSS
    "date-fns": "^4.1.0",                      // Date handling (migrating to dayjs)
    "react-intersection-observer": "^9.16.0"   // Infinite scroll
  },
  "build": "@mendix/pluggable-widgets-tools ^10.18.2"
}
```

### Important Limitations
- **Action Variables**: Not supported in Mendix 10.18 (MTS) - feature requires 10.21+
- **Security**: Uses `ActionValue.canExecute` for permissions instead of custom logic

### Key Components
- `ShiftScheduler.tsx` - Main widget entry point
- `components/ShiftSchedulerComponent.tsx` - Core grid layout and logic
- `components/TeamSection.tsx` - Team grouping with visual separation
- `components/EngineerRow.tsx` - Individual engineer timeline
- `components/DayCell.tsx` - Single day cell with shift display
- `types/index.ts` - TypeScript interfaces for Engineers and ShiftAssignments

### Data Model
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
}
```

### Visual Design
- **Color coding**: M=blue, E=green, N=orange, D=red, H=gray, T=yellow
- **Role indicators**: TL=solid border, BTL=dashed border
- **Team organization**: Engineers grouped under team headers
- **Timeline navigation**: Horizontal scroll with 30-day blocks, infinite loading

## Development Commands

### shiftScheduler (Primary Widget)
```bash
cd shiftScheduler/
npm run dev          # Development server
npm run build        # Production build
npm run lint         # Code quality checks
npm run lint:fix     # Auto-fix linting issues
```

### modern-schedule-board (Reference)
```bash
cd modern-schedule-board/
npm run build        # Build (for reference/migration)
npm run lint         # Check code quality
```

## Working with This Codebase

### Primary Development Focus
- **Main widget**: Work in `shiftScheduler/` directory
- **Requirements**: Follow specifications in `USE_CASES.md`
- **Architecture**: Follow patterns in `SHIFT_SCHEDULER_DESIGN.md`
- **Development plan**: Follow roadmap in `MIGRATION_PLAN.md`

### Key Files to Understand
- `shiftScheduler/src/ShiftScheduler.tsx` - Widget entry point and Mendix integration
- `shiftScheduler/src/components/ShiftSchedulerComponent.tsx` - Core scheduling logic
- `shiftScheduler/src/types/index.ts` - Data model definitions
- `USE_CASES.md` - Complete feature requirements

### Common Development Tasks
- **Add new features**: Follow the component structure in `shiftScheduler/src/components/`
- **Data integration**: Enhance Mendix entity handling in main widget file
- **Styling**: Update `shiftScheduler/src/ui/ShiftScheduler.css`
- **Type safety**: Enhance interfaces in `shiftScheduler/src/types/index.ts`

### Migration Strategy
The project is following a migration plan to enhance shiftScheduler with proven patterns from the reference widgets:

1. **Date utilities** - Migrate from modern-schedule-board (dayjs → date-fns)
2. **Mendix integration** - Improve data handling patterns
3. **TypeScript enhancement** - Better type safety throughout
4. **Error handling** - Robust user feedback and validation

### Design Principles
- **Lean dependencies** - Only essential libraries (no heavy timeline frameworks)
- **Domain-focused** - Built specifically for 24/7 shift scheduling
- **Team-centric** - Engineers organized by teams with role-based access
- **Day-grid layout** - Simple horizontal timeline, not complex time ranges
- **Direct interaction** - Double-click editing and context menus (no drag-and-drop for events)
- **Infinite scrolling** - 30-day blocks with lazy loading

### Reference Widget Context
- **itvisors-scheduleboard/**: Complex timeline widget with extensive features - used for learning Mendix patterns, not architecture
- **modern-schedule-board/**: Timeline library experiment - useful for date utilities and TypeScript patterns, but wrong architectural direction

When working on this codebase, focus on the shiftScheduler as the primary development target, using the reference widgets only for extracting useful patterns and utilities.