# Shift Scheduler Roadmap

*Future enhancements and planned features for the Shift Scheduler widget*

> **Note**: This roadmap shows **upcoming features and plans**. For completed features and version history, see [CHANGELOG.md](./CHANGELOG.md).

## ✅ **Recently Completed**

### **Multiple Events Per Day: Complete Workflow with Visual Status Patterns**
**Priority**: High  
**Status**: ✅ **COMPLETED** - v1.13.0 (2025-07-07)  
**Planning Date**: 2025-06-28  
**Implementation**: All 4 phases complete with TBD support

Complete implementation of multiple events per day with a three-status visual system and full approval workflow.

**✅ All Features Completed:**
- ✅ **Phase 1**: Data model enhancement with `DayCellData` interface and multiple event support
- ✅ **Phase 2**: Stacked visual layout with request distinction and enhanced CSS styling
- ✅ **Phase 3**: Visual status patterns (solid/diagonal/vertical stripes) for event confidence levels
- ✅ **Phase 4**: Complete approval workflow with approve/reject/markAsTBD actions
- ✅ **TBD Support**: Full "To Be Determined" status handling with comment updates
- ✅ **Microflow Integration**: Ready for server-side filtering and business logic

**🎯 Business Value Delivered:**
- **Complete Visibility**: Active events, pending requests, and TBD items in unified view
- **Visual Hierarchy**: Clear confidence levels through status-based patterns
- **Flexible Workflow**: Immediate decisions or defer complex cases as TBD
- **Streamlined Approval**: Direct workflow actions from timeline interface

---

## 🚀 **High Priority**

### **ITVisors-Style Lazy Loading** 
**Priority**: High  
**Status**: Design Complete, Implementation Pending  
**Research Date**: 2025-06-28

Enable unlimited timeline scrolling by implementing context-driven lazy loading pattern discovered from ITVisors ScheduleBoard analysis.

**Implementation Plan:**

#### **Phase 1: Widget Configuration**
- Add `useLazyLoad` boolean property
- Add `lazyLoadMicroflow` string property for microflow name  
- Add `lazyLoadStartDate` and `lazyLoadEndDate` attribute properties
- Add `lazyLoadWindowDays` integer property (default: 30)

#### **Phase 2: Context Attribute Management**
- Enhance `useShiftData` hook to monitor context date attributes
- Add logic to update attributes when user scrolls near boundaries
- Implement debouncing to prevent excessive microflow calls

#### **Phase 3: Microflow Integration**
- Create example microflow that accepts date range parameters
- Return JSON data in expected format for widget consumption
- Handle date range expansion logic in microflow

#### **Phase 4: Performance Optimization**
- Add data caching to prevent duplicate requests
- Implement smart preloading (load next chunk before reaching boundary)
- Add loading indicators during lazy load operations

**Technical Pattern:**
```xml
<property key="useLazyLoad" type="boolean" defaultValue="false">
  <caption>Use lazy load</caption>
  <description>When end date is reached, new data will be retrieved</description>
</property>

<property key="lazyLoadMicroflow" type="string">
  <caption>Data source Lazy Load</caption>
  <description>Microflow that returns list of items as JSON</description>
</property>

<property key="lazyLoadStartDate" type="attribute">
  <caption>Lazy load start date</caption>
  <description>Lower threshold - updated automatically by widget</description>
</property>

<property key="lazyLoadEndDate" type="attribute">
  <caption>Lazy load end date</caption>
  <description>Upper threshold - updated automatically by widget</description>
</property>
```

**Benefits:**
- ✅ **Unlimited Timeline**: No more XPath date limitations
- ✅ **Performance**: Only loads data as needed
- ✅ **Memory Efficient**: Doesn't load entire year at once
- ✅ **Mendix Native**: Uses standard microflow patterns
- ✅ **User Experience**: Seamless infinite scrolling

---

## 🔧 **Medium Priority**

### **Team Capacity Enhancements**
**Priority**: Medium  
**Status**: Planning  

Building on the existing team capacity indicators (completed in v1.8.0), add advanced configuration and display options.

**Planned Enhancements:**
- **Configuration Options**: Add widget properties for color customization and display preferences  
- **Enhanced Tooltips**: Add working count details ("12/14 people working")
- **Advanced Targeting**: Multiple target types (daily/weekly/monthly)

---

### **Enhanced Fallback UI Components**
**Priority**: Medium  
**Status**: Basic implementation exists, needs enhancement

Improve error states and loading indicators with more polished UI components.

**Tasks:**
- [ ] Enhanced loading states with better animations
- [ ] Improved error boundary components  
- [ ] Better empty state messaging
- [ ] Skeleton loading for shift cells

### **Optimistic Updates**
**Priority**: Medium  
**Status**: Planning

Implement optimistic updates for shift changes to improve perceived performance.

**Tasks:**
- [ ] Add optimistic shift creation/editing
- [ ] Add rollback logic for failed updates
- [ ] Improve user feedback during saves
- [ ] Add conflict resolution for concurrent edits

---

## 🎨 **Low Priority**

### **Advanced Theming Support**
**Priority**: Low  
**Status**: Planning

Add comprehensive theming and customization options.

**Tasks:**
- [ ] CSS custom properties for color theming
- [ ] Configurable shift type colors
- [ ] Team-specific color schemes
- [ ] High contrast accessibility mode

### **Export Functionality**
**Priority**: Low  
**Status**: Planning

Add data export capabilities for reporting and external integration.

**Tasks:**
- [ ] Export visible timeline to CSV
- [ ] Export team schedules to PDF
- [ ] Export filtered data sets
- [ ] Integration with Mendix reporting modules

### **Advanced Keyboard Navigation**
**Priority**: Low  
**Status**: Basic implementation exists

Enhance keyboard accessibility and power-user shortcuts.

**Tasks:**
- [ ] Tab navigation through timeline
- [ ] Keyboard shortcuts for common actions
- [ ] Screen reader improvements
- [ ] Focus management enhancements

---

## 📋 **Testing & Quality**

### **Unit Testing Suite**
**Priority**: Medium  
**Status**: Planning

Add comprehensive testing for critical functionality.

**Tasks:**
- [ ] Date helper function tests
- [ ] Data transformation logic tests
- [ ] Component rendering tests
- [ ] User interaction tests

### **Performance Monitoring**
**Priority**: Low  
**Status**: Planning

Add performance monitoring and optimization tools.

**Tasks:**
- [ ] Bundle size monitoring
- [ ] Render performance metrics
- [ ] Memory usage tracking
- [ ] Large dataset performance testing

---

## 🔄 **Maintenance**

### **Dependency Updates**
**Priority**: Ongoing  
**Status**: Active

Keep dependencies current and secure.

**Tasks:**
- [ ] Regular security audit of dependencies
- [ ] Mendix platform compatibility updates
- [ ] React version compatibility
- [ ] TypeScript version updates

### **Documentation**
**Priority**: Ongoing  
**Status**: Active

Maintain comprehensive documentation for users and developers.

**Tasks:**
- [ ] User guide with screenshots
- [ ] Developer setup instructions
- [ ] API documentation
- [ ] Troubleshooting guide

---

*This roadmap is reviewed and updated regularly based on user feedback and changing requirements.*