# Org Chart Frontend (React + Vite + TypeScript)
## Overview
This is a simple React app (built with Vite + TypeScript) that displays an organizational chart. It fetches employee data from a backend endpoint (by default http://localhost:8080/employees) and renders the results in a hierarchical (nested) list.

## Prerequisites
Node.js (14.x or later recommended)
Yarn (or npm) installed globally
### Getting Started
Clone the repository (or download it).

```bash
git clone <your-repo>
cd <your-repo>
```
### Install dependencies:

```bash
# using yarn
yarn install

# or using npm
npm install
```

### Set up environment variables:

By default, the app tries to reach http://localhost:8080/employees.

### Run in development mode:

```bash
# using yarn
yarn dev

# or using npm
npm run dev
```

The app should be accessible at http://localhost:5173.

(Optional) Build for production:

```bash
yarn build
# or
npm run build
```
This creates an optimized, production-ready bundle in the dist folder. To preview it locally:

```bash
yarn preview
# or
npm run preview
```

## Project Structure
```bash
.
├── public/                # Static/public files
└── src/
    ├── assets/            # Images or other assets
    ├── components/
    │   ├── EmployeeCard.tsx  # Component to render a single employee’s info
    │   └── OrgChart.tsx       # Main org chart component (renders nested employees)
    ├── App.tsx                # Root-level component
    ├── index.css              # Global CSS
    ├── main.tsx               # React DOM entry point
    ├── types.ts               # TypeScript interfaces (e.g., `Employee`)
    └── vite-env.d.ts          # Vite-specific TypeScript declarations
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── yarn.lock (or package-lock.json)
```
### Usage
Start your backend (if you have one) on http://localhost:8080.
Run yarn dev (or npm run dev) to start the frontend.
Visit http://localhost:5173 to see the org chart.
