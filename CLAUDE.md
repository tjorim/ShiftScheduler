# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a Mendix Schedule Board widget developed by ITVisors. It's a complex scheduler and resource planning widget that provides timeline-based scheduling capabilities with drag-and-drop functionality, multi-select, and extensive customization options.

## Project Structure

The repository contains two versions of the Schedule Board widget:

- `scheduler-280/` - Version 2.8.0 of the Schedule Board widget
- `scheduler-300/` - Version 3.0.0 of the Schedule Board widget
- `*.mpk` files - Mendix package files for distribution

Each version directory contains:
- `ScheduleBoard.xml` - Widget configuration and properties definition
- `package.xml` - Mendix package metadata
- `dependencies.json` - JavaScript dependencies
- `itvisors/scheduleboard/` - Main widget implementation
  - `ScheduleBoard.js` - Main JavaScript widget implementation (~51-52k tokens)
  - `ScheduleBoard.mjs` - ES module version
  - `ScheduleBoard.css` - Widget styling
  - `assets/` - Static assets

## Widget Architecture

This is a Mendix custom widget that:

- **Widget Type**: Plugin widget with entity context support, web platform only
- **Core Functionality**: Timeline-based scheduler with drag-and-drop item management
- **Data Binding**: Uses Mendix microflows for data operations and event handling
- **Dependencies**: Built on react-calendar-timeline with moment.js for date handling
- **Interactive Features**: Item movement, resizing, selection, hover effects, context menus

### Key JavaScript Dependencies (Version 3.0.0)
- `moment` 2.30.1 - Date/time manipulation
- `react-calendar-timeline` 0.28.0 - Core timeline component
- `interactjs` 1.10.27 - Drag and drop interactions
- `prop-types` 15.8.1 - React prop validation
- `lodash.isequal` 4.5.0 - Deep equality checking
- `moment-timezone` 0.5.46 - Timezone support

### Widget Configuration Categories

The widget has extensive configuration options organized into groups:
- **General**: Date ranges, context object handling
- **Move Items**: Drag-and-drop behavior, group restrictions
- **Select Items**: Multi-select functionality, selection tracking
- **Resize Items**: Item resizing capabilities
- **Load Data**: Data source configuration, lazy loading
- **Loading Indicators**: UI feedback for various operations
- **Layout**: Visual appearance, sidebar configuration
- **Update View**: Zoom and view management
- **Headers**: Timeline header customization
- **Events**: Microflow event handlers for user interactions
- **Hover**: Hover effects and popups
- **Context Menu**: Right-click functionality
- **Additional**: UTC settings, ID exposure, cleanup options

## Development Commands

This is a Mendix widget project that doesn't use traditional npm/yarn build scripts. Development workflow involves:

1. **Widget Development**: Modify JavaScript files in `itvisors/scheduleboard/`
2. **Packaging**: Use Mendix tooling to create `.mpk` files
3. **Testing**: Deploy to Mendix Studio Pro for testing
4. **Version Management**: Update `package.xml` version numbers

## Working with This Codebase

### Key Files to Understand
- `ScheduleBoard.xml` - Complete widget API and configuration options
- `ScheduleBoard.js` - Main implementation (large file, use search/grep tools)
- `dependencies.json` - External library versions and sources

### Common Tasks
- **Configuration Changes**: Modify `ScheduleBoard.xml` properties
- **Functionality Updates**: Edit `ScheduleBoard.js` (use targeted searches due to file size)
- **Styling**: Update `ScheduleBoard.css`
- **Dependencies**: Update `dependencies.json` for library changes

### Version Differences
The codebase maintains two versions (2.8.0 and 3.0.0) with:
- Updated dependency versions (moment.js, interactjs, classnames)
- Potential functionality differences in the main JavaScript implementation

When making changes, consider which version(s) need updates and maintain consistency between versions where appropriate.