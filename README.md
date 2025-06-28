# Shift Scheduler Widget

A Mendix pluggable widget for 24/7 shift planning and schedule management, built specifically for ASML's System Performance department.

---

## ✅ Typical Usage Scenario

This widget is designed for **System Performance team members** who need to:

- **Plan holidays and time off** across multiple teams in a timeline view
- **Track special assignments** - OSI (internal projects), OSE (external support), BTL (backup team lead)
- **Schedule training and development** - Plan skill development without coverage gaps
- **Manage absences** - Handle sick leave (AO) and other absences while maintaining team coverage
- **Visualize availability** - See who's available vs assigned across teams

**System Performance department use case:**
- **Holiday planning** - Primary use case for coordinating time off across teams
- **Assignment scheduling** - Track people when they're OSI (internal projects), OSE (supporting other departments), BTL (backup team lead)
- **Special assignments** - Schedule WRQ (wafer reticle qualification), CSR OPS (customer requests), training (T)
- **Absence management** - Handle sick leave (AO) and other absences while maintaining team coverage
- **5-shift rotation** with Team 1-5 across XT and NXT departments
- **Department split** - XT (single teams) and NXT (A/B lane structure)

This widget replaces Excel spreadsheets and manual scheduling boards with an interactive, permission-aware timeline that integrates directly with your Mendix app's user management and workflow systems.

---

## ✅ Features and Limitations

### 🎯 Core Features
- **👥 Team-grouped display** - People organized by Team → Lane → Individual
- **📅 Infinite scroll timeline** - Starts with 30 days, loads more as you scroll
- **🌈 Color-coded events** - M(orning)/E(vening)/N(ight)/D(ay)/H(oliday)/T(raining)/OSI/OSE/BTL/WRQ/CSR
- **🖱️ Interactive controls** - Double-click to edit, right-click for context menus
- **🔘 Multi-select operations** - Ctrl+click, Shift+click for batch operations
- **⌨️ Keyboard navigation** - Arrow keys, Enter, Escape for power users
- **🔐 Permission-aware** - Actions shown/hidden based on user security roles
- **📱 Responsive design** - Works on desktop, tablet-friendly

### 🚀 Advanced Features
- **Three-state permission model** - Distinguishes between not-configured, no-permission, and allowed actions
- **Debug panel** - Built-in development tools for troubleshooting data issues
- **Inclusive terminology** - Uses "People" and "Events" for clarity
- **Optimized data model** - Simplified configuration with essential attributes only

### ⚠️ Limitations
- **No drag-and-drop** - By design to prevent accidental changes
- **Desktop-first** - Mobile experience is functional but not optimized  
- **Direct entity access only** - Requires Mendix entities, not REST/OData
- **External edit logic** - Editing happens via your microflows, not in the widget

---

## ✅ Dependencies

- **Mendix 10.18+** (compatible with MTS releases)
- **SPUser entity** (System Performance User) or equivalent user entity
- **Entity model** for calendar events/shifts (can be customized)

The widget has minimal external dependencies and loads quickly.

---

## ✅ Installation

1. **Download the widget** from the Mendix Marketplace (automatically adds to your project)
2. **Refresh Studio Pro** - Press F4 or restart to see the widget in the toolbox
3. **Add to a page** - Drag "Shift Scheduler" from the toolbox onto your page

---

## ✅ Configuration

### 🗂️ Step 1: Set up your entities

The widget expects this entity structure (adjust names as needed):

```
SPUser (or Person)
├── Name (String) - Display name
├── Team (String) - Primary grouping 
└── Lane (String) - Secondary grouping

CalendarEvent 
├── DayType (Enum: M/E/N/D/H/T) - Shift type
├── Status (Enum: Planned/Approved/Rejected) - Approval state
├── SPUser_CalendarEvent (Association) - Links to person
└── CalendarEvent_Shift (Association) - Links to shift details

CalendarEvent_Shift (or Shift)
└── Date (DateTime) - When the shift occurs
```

### ⚙️ Step 2: Widget Properties

#### **Data Sources**
- **People** *(required)* - Your SPUser list (apply XPath to filter by team if needed)
- **Calendar Events** *(optional)* - Your shift/event data source

#### **Person Attributes** 
- **Name Attribute** - SPUser.Name or similar display field
- **Header Grouping** - Primary grouping (e.g., Team.Name) 
- **Subheader Grouping** - Secondary grouping (e.g., Lane.Name)

#### **Event Attributes**
- **Day Type** - The shift type (M/E/N/D/H/T) 
- **Status** - Approval status for requests
- **Person Association** - Link from CalendarEvent to SPUser
- **Shift Association** - Link from CalendarEvent to shift details
- **Shift Date** - The actual date/time of the shift

#### **Actions** *(all optional)*
- **On Edit Event** - Microflow for editing existing events
- **On Create Event** - Microflow for creating new events
- **On Delete Event** - Microflow for removing events
- **Batch operations** - Microflows for multi-select actions

#### **Context Attributes** *(for passing data to microflows)*
- **Context Event ID** - Selected event identifier
- **Context Person ID** - Selected person identifier  
- **Context Date** - Selected date
- **Context Selected Cells** - JSON of multi-selected cells

### 🔧 Step 3: Create your microflows

Example microflow for creating a new shift:
```
Input: Context person ID, Context date, optional shift type
Logic: 
1. Create new CalendarEvent
2. Set associations to SPUser and shift details
3. Set default values (status = Planned)
4. Show edit form or auto-save
Output: Refresh the page or show confirmation
```

### 🎨 Step 4: Customize appearance (optional)

The widget includes default colors for shift types:
- **M (Morning)** - Blue
- **E (Evening)** - Green  
- **N (Night)** - Orange
- **D (Day)** - Red
- **H (Holiday)** - Gray
- **T (Training)** - Yellow
- **OSI/OSE/BTL/WRQ/CSR** - Custom colors (configurable)

Override these in your theme CSS if needed.

---

## ✅ Usage Examples

### 📋 Basic Schedule Viewing
- **Scroll horizontally** to navigate through time
- **Look for patterns** - gaps, double-bookings, team coverage
- **Click team headers** to expand/collapse sections

### ✏️ Creating Events
- **Double-click empty cell** → triggers your "Create Event" microflow
- **Right-click empty cell** → context menu with shift type options
- **Select multiple cells** → batch create for recurring patterns

### 📝 Editing Events  
- **Double-click existing event** → triggers your "Edit Event" microflow
- **Right-click existing event** → context menu with Edit/Delete options
- **Multi-select events** → batch edit for pattern changes

### 👥 Managing Permissions
- **Team Leaders** - Can edit their team members only (configure in microflow security)
- **Schedulers** - Can edit anyone (configure via user roles)
- **Team Members** - Can view all, edit own requests only
- **No permission** - Actions are grayed out with clear indicators

---

## ⚠️ Known Issues & Troubleshooting

### 🐛 Common Issues

**"No events showing"**
- ✅ Check your Calendar Events data source XPath constraints
- ✅ Verify the Person Association is correctly configured
- ✅ Ensure shift dates are in the visible timeline range

**"Context menu shows 'No permission'"**  
- ✅ Verify your microflow security settings
- ✅ Check that the current user has the right user roles
- ✅ Confirm the action properties are configured

**"Timeline loads slowly"**
- ✅ Add XPath constraints to limit data (e.g., date range, specific teams)
- ✅ Consider database indexes on frequently queried fields
- ✅ Use team-based filtering in your data sources

**"Debug panel shows attribute errors"**
- ✅ Enable "Show Debug Info" and check the configuration tab
- ✅ Verify all attribute mappings point to existing entity attributes
- ✅ Check that associations are correctly configured

### 🛠️ Performance Tips
- **Filter data sources** - Use XPath to load only needed people/events
- **Use existing filters** - Leverage the domain model filters for team/department filtering
- **Limit time range** - Start with 30-60 days, not entire year
- **Index database fields** - Add indexes to date, person ID, and team fields

---

## ❓ Frequently Asked Questions

**Q: Can I add more shift types beyond M/E/N/D/H/T?**  
A: Yes! Edit your CalendarEvent.DayType enum to add values like OSI, OSE, BTL, WRQ, CSR OPS. The widget will display them with default styling.

**Q: How do I set up approval workflows?**  
A: Use the Status attribute and create microflows that change status from Planned → Approved/Rejected. The widget displays status visually.

**Q: Can I integrate with external calendar systems?**  
A: Yes, via Mendix REST services. Import calendar data into your CalendarEvent entities and the widget will display it.

**Q: How do I handle multiple shifts per day?**  
A: Create multiple CalendarEvent records for the same person/date with different shift types or times.

**Q: Can I export the schedule to Excel/PDF?**  
A: Not directly from the widget. Create Mendix microflows that query the same data and export using standard Mendix modules.

**Q: How do I set up recurring patterns?**  
A: Create microflows that generate CalendarEvent records for recurring needs (e.g., "block out Team 1 holidays for Christmas week" or "schedule monthly WRQ training").

**Q: Can managers approve/reject requests directly in the timeline?**  
A: Yes! Configure your "Edit Event" microflow to show a form with approve/reject buttons that update the Status attribute.

---

## 🏢 Company-Specific Setup

### For ASML Teams
- **Standard entities** - Use the existing SPUser and CalendarEvent structure
- **Team structure** - Map to your team identifiers (Team 1 XT, Team 1 NXT A, Team 1 NXT B, etc.)
- **Integration** - Connects with existing holiday request workflows
- **Security** - Inherits from your existing role-based access control

### For New Projects
- **Quick start** - Import the sample domain model from the widget documentation
- **Customization** - Adapt entity names and attributes to match your terminology
- **Training** - Schedule a session with the widget development team

---

## 📞 Support & Feedback

- **🐛 Bug reports** - Contact the development team or create a ticket
- **💡 Feature requests** - Submit via internal feedback system  
- **📚 Training** - Available for teams adopting the widget
- **🔧 Customization** - Development team can help with specific company needs

---

*Developed for Mendix low-code applications - Optimized for ASML System Performance team scheduling workflows*