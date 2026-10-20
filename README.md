# FitForge Member Hub

A lightweight gym membership management web app built with plain **HTML, CSS and JavaScript**. Register members, assign a membership plan, and manage the member directory. Data persists in the browser via `localStorage`. No backend, build step or dependencies required.

> Mini project for the Internet Programming (IP) course.

## Features

- **Member registration:** form with name, email and plan (Basic / Standard / Premium), with built-in HTML5 validation
- **Member directory:** table of all registered members with auto-assigned IDs and a live member count
- **Remove members:** delete with a confirmation prompt
- **Persistent storage:** members are saved to `localStorage` and survive page reloads
- **Sample data:** two demo members are loaded on first visit
- **Responsive design:** layout adapts to screens under 600px wide

## Tech Stack

| Layer     | Technology |
|-----------|------------|
| Structure | HTML5 (semantic sections, forms, tables) |
| Styling   | CSS3 (custom properties, flexbox, grid, media queries) |
| Logic     | Vanilla JavaScript (ES6 classes, DOM APIs, `FormData`, event delegation) |
| Storage   | Browser `localStorage` |

## Project Structure

```
ip_mini_project-main/
├── index.html   # Page layout: header, nav, intro, member table, registration form
├── style.css    # Theme (navy / lime / cream), components, responsive rules
└── script.js    # Member & GymManager classes, rendering and event handling
```

## Getting Started

1. Clone or download this repository.
2. Open `index.html` in any modern browser.

That's it. Optionally, serve it locally:

```bash
# Python
python -m http.server 8000
# then visit http://localhost:8000
```

or use the **Live Server** extension in VS Code.

## How It Works

`script.js` is organised around two classes:

- **`Member`:** a simple data model (`id`, `name`, `email`, `plan`).
- **`GymManager`:** owns the member list and handles persistence:
  - `loadMembers()`: reads from `localStorage` key `gym-members`, or falls back to sample data
  - `addMember(name, email, plan)`: assigns the next ID (highest existing ID + 1, starting at 101) and saves
  - `removeMember(id)`: filters the member out and saves
  - `save()`: writes the list back to `localStorage`

`renderMembers()` rebuilds the table, updates the member count and toggles the empty-state message. The form's `submit` handler adds a member. A single delegated `click` listener on the table body handles the **Remove** buttons.

## Resetting Data

To clear all saved members and restore the sample data, run this in the browser console:

```js
localStorage.removeItem("gym-members");
location.reload();
```

## Possible Improvements

- Edit existing member details
- Search and filter by name or plan
- Escape user input before inserting it into the table (it is currently rendered via `innerHTML`)
- Prevent duplicate email registrations
- Add join dates and membership expiry tracking
- Export the member list to CSV

## License

© 2026 FitForge Gym Management System. Built for educational purposes.
