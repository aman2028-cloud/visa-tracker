# Visa Alert Tracker

A small internal tool to track visa slot alerts.
Built with **Node.js + Express** for the backend and **React (Vite)** for the frontend.


## Data Model

Each alert has:

| Field      | Type    | Description                   |
|------------|---------|-------------------------------|
| id         | string  | Unique identifier             |
| country    | string  | Country of the visa           |
| city       | string  | City of the visa              |
| visaType   | string  | Tourist / Business / Student  |
| status     | string  | Active / Booked / Expired     |
| createdAt  | string  | Creation date and time        |

---

## Setup & Run

### Backend

1. Go to the backened folder:

cd backend
npm install
npm run dev

### Frontened

1. Go to the frontened folder:
   
cd frontened
npm install
npm run dev


### Improvements for the Production
1.Use a real database (MongoDB/PostgreSQL) instead of JSON file
2.Add authentication
3.Deploy on cloud platforms (Vercel,Render)
4.Make UI responsive and mobile-friendly


### Where Ai helped
Generating boilerplate React code, backend routes, basic functions
Manual Work-
Folder structure, table & form design, update/delete logic, connecting frontend to backend
