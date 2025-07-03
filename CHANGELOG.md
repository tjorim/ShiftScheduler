# Shift Scheduler Changelog

*Record of completed features and improvements by version*

> **Note**: This changelog documents **completed features and releases**. For upcoming features and plans, see [ROADMAP.md](./ROADMAP.md).

## Version 1.9.1 - Current Day Highlighting (User Experience)
**Release Date**: 2025-07-03  
**Theme**: Shift-aware current day highlighting with Dutch schedule support  
**📦 [Mendix Marketplace](https://marketplace.mendix.com/link/component/243069)**

### ✨ **New Features**
- **Shift-aware current day highlighting**: Visual highlighting that understands shift logic instead of calendar logic
- **Dutch shift schedule support**: Proper handling of 23:00-07:00 night shifts (24-hour format)
- **Smart day boundary**: Current day changes at 07:00, not midnight, so night shifts stay on their start day
- **Enhanced visual design**: Current day cells and headers with borders, gradients, and animated pulse indicators

### 🔧 **Improvements**
- **Intuitive shift logic**: Tuesday night shift (23:00 Tue - 07:00 Wed) correctly shows as "Tuesday" even at 06:00 Wednesday
- **Professional styling**: Gradient top bars, shadow effects, and animated pulse dots for current day indication
- **Regional accuracy**: Follows Dutch time conventions (24-hour format, no AM/PM)
- **Timeline navigation**: Current day remains highlighted during horizontal scrolling

### 🧹 **Technical**
- **New utility function**: `isCurrentShiftDay()` in `dateHelpers.ts` implementing shift boundary logic
- **Updated grid logic**: `ScheduleGrid.tsx` uses shift-aware detection instead of calendar day detection
- **Enhanced CSS**: `.day-cell-today` and `.date-header-today` with borders, gradients, and animations
- **Date logic**: Before 07:00 = previous calendar day is current shift day, 07:00+ = current calendar day

### 📋 **Shift Logic Details**
- **Night shift handling**: 23:00-07:00 shifts correctly attributed to start day throughout entire duration
- **Boundary time**: 07:00 serves as the shift day boundary (when current day advances)
- **Time format**: Uses 24-hour Dutch time format (no AM/PM references)
- **Visual consistency**: Current day highlighting works seamlessly with existing team capacity and timeline features

---

## Version 1.9.0 - Microflow Architecture Migration (Performance & Scalability)
**Release Date**: 2025-07-02  
**Theme**: Server-side microflow architecture for production performance  
**📦 [Mendix Marketplace](https://marketplace.mendix.com/link/component/243069)**

### ✨ **New Features**
- **Microflow data sources**: Complete migration from client-side filtering to server-side microflows
- **Date range pagination**: Intelligent date range management with 30-day chunks instead of 2+ years
- **Performance optimization**: Dramatic reduction in data transfer and memory usage (95%+ improvement)
- **Automatic date navigation**: Seamless infinite scrolling with microflow refresh triggers

### 🔧 **Architecture Improvements**
- **Server-side filtering**: All business logic moved to microflows for better performance and security
- **Data source simplification**: Widget becomes pure display component with minimal processing
- **Scalable pagination**: Loads only visible date ranges instead of entire dataset
- **Clean separation**: Business logic (microflows) separated from display logic (widget)

### 🧹 **Technical**
- **Widget XML migration**: Updated to use microflow data sources with date parameters
- **Client-side removal**: Eliminated complex filtering logic from `useShiftData.ts`
- **Interface cleanup**: Removed obsolete filter-related properties and associations
- **Debug panel updates**: Shows microflow architecture status instead of filter information
- **Documentation**: Comprehensive `MICROFLOW_ARCHITECTURE.md` with implementation requirements

### 📋 **Critical Requirements**
- **Data matching**: Microflows must ensure exact ID and team name matching between entities
- **Team names**: `Engineer.team` must exactly match `TeamCapacity.teamName` 
- **Microflow implementation**: Requires creation of `MF_GetFilteredEngineers`, `MF_GetShiftsByDateRange`, and `MF_GetCapacityByDateRange`

### 🚀 **Performance Impact**
- **Before**: 50,000+ shift records, 500MB+ memory, 30+ second load times
- **After**: ~1,000 shift records, ~10MB memory, 2-3 second load times
- **Resolves**: Production crashes caused by excessive data loading

---

## Version 1.8.0 - Team Capacity Indicators (Database Integration)
**Release Date**: 2025-07-01  
**Theme**: Real-time team capacity percentage display with database integration  
**📦 [Mendix Marketplace](https://marketplace.mendix.com/link/component/243069)**

### ✨ **New Features**
- **Team capacity percentages**: Real-time display in timeline headers showing workforce availability
- **Database-driven approach**: Pure database display using TeamCapacity and CapacityTarget entities
- **Association-based targets**: Clean data model with TeamCapacity → CapacityTarget associations
- **Conditional tooltips**: Target information shown only when targets are configured
- **Visual indicators**: Color-coded percentages (green = meets target, red = below target, gray = no target)

### 🔧 **Improvements**
- **Clean XML configuration**: Streamlined properties with grouped structure for capacity settings
- **CSS-based styling**: Separated static styles from dynamic values using CSS classes with BEM naming
- **Efficient data loading**: Database-only approach eliminates widget-side calculations
- **Team header integration**: Seamless display alongside existing team organization

### 🧹 **Technical**
- **Database integration**: Full integration with TeamCapacity and CapacityTarget entities
- **Association patterns**: Following Mendix best practices for entity relationships
- **Interface simplification**: Removed unused calculation fields for cleaner architecture
- **TypeScript enhancement**: Proper `EditableValue` types for association-based attributes
- **Code cleanup**: Removed unused XML properties and calculation logic

### 📋 **Known Issues**
- **Team header design**: Current string-based team headers may need refactoring to separate team/lane attributes for better data consistency

---

## Version 1.7.0 - Permission System & Inclusive Terminology
**Release Date**: 2025-06-28  
**Theme**: Enhanced permissions and inclusive language  
**📦 [Mendix Marketplace](https://marketplace.mendix.com/link/component/243069)**

### ✨ **New Features**
- **Three-state permission model**: Not-configured/no-permission/allowed for robust action handling
- **Enhanced context menu**: Improved action handling with proper permission checks
- **Terminology updates**: "Engineers" → "People", "Shifts" → "Events" for inclusive language
- **Debug panel extraction**: Separated debug functionality into dedicated `DebugPanel.tsx` component

### 🔧 **Improvements**
- **Simplified data model**: Removed unused start/end time attributes
- **Better code organization**: Extracted debug panel for cleaner architecture
- **Enhanced permission checks**: More robust validation for user actions
- **Improved accessibility**: Better terminology and interaction patterns

### 🧹 **Technical**
- **Component extraction**: Debug functionality moved to separate component
- **Type safety**: Enhanced interfaces for permission system
- **Code cleanup**: Removed obsolete attributes and simplified data flow
- **Version management**: Improved version tracking and display

---

## Version 1.6.3 - Architecture Refinement
**Release Date**: 2025-06-25  
**Theme**: Code organization and architectural improvements

### ✨ **New Features**
- **Component renaming**: `ScheduleGrid`, `ScheduleRow` for clearer purpose
- **Hook extraction**: `useScrollNavigation` with scroll sync + infinite loading
- **Permission system**: `useTeamAccess` hook for role-based filtering
- **Loading components**: `LoadingStates` with error boundaries and fallback UI

### 🔧 **Improvements**
- **Clear separation**: Better component boundaries and responsibilities
- **Hook organization**: Extracted reusable logic into dedicated hooks
- **Error handling**: Comprehensive error boundaries and user feedback
- **Code clarity**: Improved naming conventions throughout

### 🧹 **Technical**
- **File structure**: Reorganized components for better maintainability
- **Import cleanup**: Streamlined dependencies and component imports
- **TypeScript**: Enhanced type safety with better interfaces
- **Performance**: Optimized hook dependencies and rendering

---

## Version 1.5.0 - Advanced Interactions & Modern Integration
**Release Date**: 2025-06-20  
**Theme**: Complete Mendix integration and interaction system

### ✨ **New Features**
- **Context menu system**: Right-click actions with microflow delegation
- **Multi-select functionality**: Ctrl+click toggle, Shift+click range selection
- **Keyboard navigation**: Arrow keys, Enter/Space edit, Escape clear
- **Double-click handlers**: Edit existing events, create new events
- **Modern data integration**: Complete `useShiftData` hook with SPUser/CalendarEvents

### 🔧 **Improvements**
- **Team-based organization**: Team → Lane → Engineer hierarchy with filtering
- **Loading states**: Comprehensive error handling and validation
- **Real-time refresh**: Dynamic data updates and debugging capabilities
- **Professional UX**: Text selection prevention and smooth interactions

### 🧹 **Technical**
- **Modern React patterns**: Hooks-based architecture with TypeScript
- **Mendix integration**: Proper `ListValue` and `ListAttributeValue` handling
- **Action system**: Complete XML configuration for all actions
- **Type safety**: Comprehensive interfaces for all data models

---

## Version 1.4.0 - Date Management & Timeline
**Release Date**: 2025-06-15  
**Theme**: Advanced date handling and timeline functionality

### ✨ **New Features**
- **Day.js integration**: Modern date handling with timezone support
- **Infinite scroll**: 30-day block loading with intersection observer
- **Date utilities**: Complete `dateHelpers.ts` utility set
- **Timeline navigation**: Horizontal scrolling with synchronized headers

### 🔧 **Improvements**
- **Shift calculations**: Optimized for 24/7 scheduling use cases
- **Date range management**: Smart boundary calculation and expansion
- **Performance**: Efficient date operations and memory management
- **Timezone support**: Proper handling of different time zones

### 🧹 **Technical**
- **Dependency optimization**: Replaced `date-fns` with `dayjs` for smaller bundle
- **Date validation**: Comprehensive date range and format validation
- **Intersection observer**: Native infinite scroll without heavy dependencies
- **Bundle size**: Maintained < 40kB target with enhanced functionality

---

## Version 1.3.0 - Enhanced TypeScript & Data Model
**Release Date**: 2025-06-10  
**Theme**: Type safety and data model improvements

### ✨ **New Features**
- **Comprehensive interfaces**: `Engineer` and `ShiftAssignment` with Mendix objects
- **Widget props interface**: Auto-generated from XML configuration
- **Action handler types**: Typed context menu and editing operations
- **Preview components**: Enhanced Studio preview with proper typing

### 🔧 **Improvements**
- **Type safety**: Full TypeScript coverage throughout components and hooks
- **Mendix types**: Enhanced integration types for `ActionValue`, `ListValue`
- **Component props**: Strongly typed interfaces for all components
- **Error prevention**: Compile-time validation of data structures

### 🧹 **Technical**
- **Interface organization**: Clean separation of data and UI types
- **Generic types**: Reusable type patterns for Mendix integration
- **Type guards**: Runtime validation with TypeScript benefits
- **Documentation**: Comprehensive type documentation and examples

---

## Version 1.2.0 - Team Organization & Filtering
**Release Date**: 2025-06-05  
**Theme**: Team-based organization and data filtering

### ✨ **New Features**
- **Team grouping**: People organized under team headers
- **Lane subgrouping**: Secondary organization within teams
- **Data filtering**: Team-based access control and visibility
- **Role indicators**: Visual TL (solid) and BTL (dashed) borders

### 🔧 **Improvements**
- **Visual hierarchy**: Clear team/lane/person organization
- **Access control**: Role-based filtering and permission system
- **Data structure**: Hierarchical organization for scalability
- **User experience**: Intuitive grouping and navigation

### 🧹 **Technical**
- **Data transformation**: Efficient grouping algorithms
- **Filter logic**: Optimized team and lane filtering
- **Rendering optimization**: Virtualization for large team structures
- **State management**: Clean separation of team and individual data

---

## Version 1.1.0 - Core Scheduling Features
**Release Date**: 2025-06-01  
**Theme**: Essential shift scheduling functionality

### ✨ **New Features**
- **Day-grid layout**: Horizontal timeline with person rows
- **Shift visualization**: Color-coded M/E/N/D/H/T shift types
- **Basic interactions**: Click to select, hover states
- **Timeline scrolling**: Horizontal navigation through dates

### 🔧 **Improvements**
- **Visual design**: Professional color scheme and layout
- **Shift colors**: Distinct colors for each shift type
- **Responsive design**: Adapts to different screen sizes
- **User feedback**: Clear visual states for interactions

### 🧹 **Technical**
- **CSS Grid**: Efficient layout system for timeline
- **Component structure**: Modular architecture for maintainability
- **Event handling**: Proper event delegation and state management
- **Performance**: Optimized rendering for large datasets

---

## Version 1.0.0 - Initial Release
**Release Date**: 2025-05-25  
**Theme**: Foundation and core architecture

### ✨ **New Features**
- **Mendix widget**: Pluggable widget for Mendix platform
- **Basic timeline**: Simple date-based grid layout
- **Data integration**: Initial Mendix entity integration
- **Development setup**: Complete build and development environment

### 🔧 **Improvements**
- **Widget foundation**: Core Mendix widget architecture
- **Data binding**: Basic entity and attribute binding
- **Build system**: Webpack configuration for widget development
- **Documentation**: Initial setup and usage documentation

### 🧹 **Technical**
- **Project structure**: Standard Mendix widget file organization
- **TypeScript setup**: Full TypeScript development environment
- **Build pipeline**: Automated building and packaging
- **Version control**: Git repository with proper .gitignore

---

## Migration History

### **From Legacy Scheduler (Pre-1.0.0)**
**Migration Period**: 2025-05-20 to 2025-05-25

**Challenges Addressed:**
- **Architecture**: Moved from outdated patterns to modern React hooks
- **Performance**: Eliminated heavy timeline dependencies 
- **Maintainability**: Simplified codebase with clear component boundaries
- **User Experience**: Improved from complex time-range to simple day-grid layout

**Key Decisions:**
- **Clean slate approach**: Complete rewrite rather than incremental updates
- **Dependency optimization**: Minimal, essential dependencies only
- **Domain focus**: Built specifically for 24/7 shift scheduling patterns
- **Mendix native**: Leveraged platform capabilities rather than fighting them

**Lessons Learned:**
- **Simplicity wins**: Day-grid layout more intuitive than complex timelines
- **Performance matters**: Bundle size and rendering speed critical for adoption
- **User feedback**: Direct interaction patterns preferred over drag-and-drop
- **Team organization**: Hierarchical grouping essential for larger organizations

---

*This changelog follows [Semantic Versioning](https://semver.org/) and is updated with each release.*