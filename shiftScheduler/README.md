## Shift Scheduler Widget
A Mendix pluggable widget designed for 24/7 shift scheduling with team-based organization.

## Features

### Core Functionality
- **Team-grouped layout** - Engineers organized by Team → Lane → Engineer hierarchy
- **Day-grid timeline** - Horizontal scrolling timeline with 30-day blocks
- **Shift type support** - M (Morning), E (Evening), N (Night), D (Day off), H (Holiday), T (Training)
- **Color-coded shifts** - Visual distinction between shift types
- **Infinite scrolling** - Automatic loading of additional time periods

### Interaction Features (v1.5.0)
- **Multi-select** - Ctrl+click for toggle, Shift+click for range selection
- **Context menus** - Right-click for type-specific actions:
  - Empty cells: Create shift with specific type
  - Existing shifts: Edit, Copy, Delete
  - Multi-selection: Batch operations
- **Double-click editing** - Quick access to edit existing shifts or create new ones
- **Keyboard navigation** - Arrow keys, Enter/Space for editing, Escape to clear selection

### Data Integration
- **SPUser integration** - Direct connection to Mendix SPUser entities
- **CalendarEvents mapping** - Support for CalendarEvents_Shift associations
- **Action delegation** - Configurable Mendix microflows for all CRUD operations
- **Real-time updates** - Responsive to data changes

## Usage

### Widget Configuration
1. Configure data sources for Engineers (SPUser) and Shifts (CalendarEvents)
2. Map entity attributes (name, email, team, lanes, shift types)
3. Set up associations (SPUser ↔ CalendarEvents, CalendarEvents ↔ Shift)
4. Configure action handlers for create, edit, delete, copy operations

### User Interactions
- **Navigate**: Scroll horizontally through timeline
- **Select**: Click individual cells, Ctrl+click to toggle, Shift+click for ranges
- **Create**: Double-click empty cell or right-click → choose shift type
- **Edit**: Double-click existing shift or right-click → Edit
- **Batch operations**: Select multiple cells → right-click for batch actions

## Demo project
[link to sandbox]

## Issues, suggestions and feature requests
[link to GitHub issues]

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

[specify contribution]
