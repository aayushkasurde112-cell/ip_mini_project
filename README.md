FitForge Member Hub

FitForge Member Hub is a lightweight web app for managing gym memberships. You can register members, assign each one a plan, and maintain the member directory. Everything runs in the browser: data is stored in localStorage, and the app needs no backend, build step, or external dependencies. It was built as a mini project for the Internet Programming (IP) course.

Highlights
Member sign-up: A form collects name, email, and plan (Basic, Standard, or Premium), with HTML5 validation built in.
Directory view: A table lists every member with an auto-generated ID and a live count.
Removal: Deleting a member asks for confirmation first.
Persistence: Members are kept in localStorage, so they remain after a page reload.
Demo data: Two sample members appear on the first visit.
Responsive layout: The design adjusts for screens narrower than 600px.
Tech Stack
Layer	Technology
Structure	HTML5 (semantic sections, forms, tables)
Styling	CSS3 (custom properties, flexbox, grid, media queries)
Logic	Vanilla JavaScript (ES6 classes, DOM APIs, FormData, event delegation)
Storage	Browser localStorage
Project Structure
ip_mini_project-main/
├── index.html   # Layout: header, navigation, intro, member table, sign-up form
├── style.css    # Theme (navy, lime, cream), components, responsive rules
└── script.js    # Member and GymManager classes, rendering, event handling
Getting Started
Clone or download the repository.
Open index.html in any modern browser.

You can also serve the folder locally:

bash
# Python
python -m http.server 8000
# then visit http://localhost:8000

The Live Server extension in VS Code works too.

How It Works

script.js is built around two classes:

Member is a plain data model with id, name, email, and plan.
GymManager owns the member list and handles persistence:
loadMembers() reads the gym-members key from localStorage, falling back to sample data if nothing is saved.
addMember(name, email, plan) assigns the next ID (highest existing ID plus one, starting at 101) and saves.
removeMember(id) filters the member out and saves.
save() writes the current list back to localStorage.

renderMembers() rebuilds the table, updates the member count, and toggles the empty-state message. The form’s submit handler adds members, and one delegated click listener on the table body handles all the Remove buttons.

Resetting Data

To clear saved members and restore the sample data, run this in the browser console:

javascript
localStorage.removeItem("gym-members");
location.reload();
Possible Improvements
Edit existing member details
Search and filter by name or plan
Escape user input before inserting it into the table, since rows are currently rendered with innerHTML
Prevent duplicate email registrations
Add join dates and membership expiry tracking
Export the member list to CSV
License

© 2026 FitForge Gym Management System. Built for educational purposes.
