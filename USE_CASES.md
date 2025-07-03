✅ Pluggable Scheduler Widget – Use Case Summary

🧭 Purpose

Create a custom Mendix pluggable widget that visually represents shift planning in a 5-team, 24/7 rotation, allowing TLs (and optionally others) to view, assign, edit, and approve shifts, holidays, and roles per engineer.


---

🧱 Core Layout & Functionality

👥 Rows

1 row per engineer, grouped visually under their team.

Optional second row for outstanding holiday requests, to avoid cluttering the main schedule.


📅 Timeline

Horizontal scrollable day-based timeline, showing shift events per day (based on shift start date).

Displays at least 3 full blocks (30 days) initially.

Lazy load more blocks on scroll (forward and possibly backward).

Each cell = 1 day, even though shifts are 8-hour blocks.



---

🎨 Visuals & Display

Events are color-coded by shift type (M/E/N/D) and role (SPE, TL, BTL, OSI, etc.).

Event = supports multiple entries per day (v1.10.0+), showing active events and pending requests in stacked layout.

Tooltip on hover (or click) shows comments or extra metadata.

Visual indicator for request status: pending (awaiting approval), approved, rejected.

Request types: Holiday, Training, Meeting, Other, LTF (Long Term Flex).



---

✍️ Interaction

Double-click on a day to:

Trigger Mendix microflow popup for request submission (engineers) or edit/approve (TLs).


Right-click on a day to:

Open context menu: request options, edit, approve/reject, range operations.


No drag & drop. UI actions trigger Mendix microflows via popups.

Widget displays data and triggers workflows - business logic handled in Mendix.



---

🔐 Permissions & Roles

Engineers: View full department (5 teams × A/B lanes), request time off via popup microflows.

TLs & BTLs: Same view + approve requests + edit shift assignments for their team.

All engineers see all teams for visibility. Edit permissions enforced by Mendix role-based security.

5-shift work blocks are fixed - no shift change requests, only exception requests (holiday/training/etc).



---

📊 Data Model (Conceptual)

Entity-based structure, something like:

Person: name, team, default role

EventAssignment: person, date, event type (M/E/N/D/H/T), role (SPE, TL...), status (planned/requested/approved/rejected), comment

HolidayRequest: linked to EventAssignment, status field, optional notes


Widget reads and writes these entities directly (Mendix context).


---

🔄 Integration

Widget displays schedule data and triggers Mendix microflows for user actions.

Request submissions handled by popup microflows (not widget logic).

Widget shows visual status of requests but approval workflows are in Mendix.

Widget compatible for reuse - displays schedule data from Mendix entities.

LTF (Long Term Flex) requests may need dedicated overview/coordination UI.



---

📐 UI/UX Design Constraints

Desktop-first, mobile later with different scope.

Follows ASML-specific Mendix design language, not Atlas by default.

Minimalist design with informative tooltips, no fancy libraries unless needed.



---

🛠️ Component Tech Considerations

Likely not worth using heavy libraries like FullCalendar or Vis.js due to custom interactions and visual simplicity.

Custom React timeline component (or a super-slim horizontal grid system) better suited.

Mendix pluggable widget built using TypeScript + React, with clear props and type-safe interaction patterns.



---

🔚 Summary

You're building a custom horizontal shift scheduler widget for a Mendix app, showing day-level events per engineer, editable via double-click and context menus, with smart filtering, holiday handling, and team-based access rules. The data model is entity-based, and the widget should fit into a broader Mendix ecosystem while staying modular and maintainable.