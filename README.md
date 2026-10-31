# ExpoHub

**Smart Exhibition & Trade Fair Management System**

ExpoHub is a full-stack MERN web application that digitizes how exhibitions and trade fairs are run. Organizers create events and booths, exhibitors book booths, and visitors register for events, all through role-based dashboards.

**Live demo:** [expo-hub-snowy.vercel.app](https://expo-hub-snowy.vercel.app)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Frontend Routes](#frontend-routes)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Documentation](#documentation)
- [Author](#author)

---

## Features

- **Authentication:** register and log in with JWT stored in an HTTP-only cookie; passwords hashed with bcrypt.
- **Role-based access:** three roles (`Visitor`, `Exhibitor`, `Admin`), each with its own dashboard and permissions.
- **Event management (Admin):** create and edit events with a banner image (venue, dates, status: Upcoming / Ongoing / Ended).
- **Booth management (Admin):** create and delete booths per event, with size (Small / Medium / Large), description and poster image.
- **Booth booking (Exhibitor):** book or release a booth for an event.
- **Visitor registration:** register for events, view and cancel registrations. Duplicate registrations are prevented by a unique index.
- **Image handling:** uploads are processed with `sharp` and stored on ImageKit.
- **Input validation:** request validation with `express-validator`.
- **Theming:** light/dark theme support on the frontend.

## Tech Stack

| Layer          | Technology                                                          |
| -------------- | ------------------------------------------------------------------- |
| Frontend       | React 19, Vite, React Router, Axios, Tailwind CSS, CSS Modules, date-fns |
| Backend        | Node.js (ES Modules), Express 5                                     |
| Database       | MongoDB Atlas with Mongoose                                         |
| Auth           | JSON Web Tokens, bcrypt, cookie-parser                              |
| Uploads        | Multer, Sharp, ImageKit                                             |
| Testing        | Jest, Supertest                                                     |
| Hosting        | Vercel (frontend), Render (backend)                                 |

## Project Structure
Project Structure
```
ExpoHub/
├── backend/
│   ├── server.js                  # Entry point: connects DB, starts server
│   ├── src/
│   │   ├── app.js                 # Express app, middleware, route mounting
│   │   ├── controllers/           # Auth, user, event, booth, registration
│   │   ├── middleware/            # Auth, validation, Multer upload
│   │   ├── models/                # User, Event, Booth, Registration
│   │   ├── routes/                # API routes
│   │   ├── db/                    # MongoDB connection
│   │   └── utils/                 # ImageKit and image processing helpers
│   └── test/                      # API tests
│
├── frontend/
│   ├── src/
│   │   ├── pages/                 # Login, Register, Home, dashboards, events, bookings
│   │   ├── components/            # Navbar and role-specific event detail views
│   │   ├── context/               # User and theme context
│   │   ├── styles/                # Styling files
│   │   ├── utils/                 # Utility functions
│   │   └── assets/                # Static assets
│   └── vercel.json                # SPA rewrite for React Router
│
└── zDocumentation/                # Project report, route list, deployment notes, diagrams
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ and npm
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or any MongoDB instance)
- An [ImageKit](https://imagekit.io/) account for image uploads

### Installation

```bash
git clone https://github.com/KSAdhikari008/ExpoHub.git
cd ExpoHub

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Run locally

**Backend** (starts with nodemon, default port `5000`):

```bash
cd backend
npm start
```

**Frontend** (Vite dev server):

```bash
cd frontend
npm run dev
```

Other frontend scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Environment Variables

### Backend: `backend/.env`

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<db>
JWT_SECRETKEY=your_jwt_secret
CORS_ORIGIN=http://localhost:5173
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
NODE_ENV=development
```

### Frontend: `frontend/.env.development`

```env
VITE_API_URL=http://localhost:5000
```

`VITE_API_URL` must match the port your backend actually runs on. For production, set it to your deployed backend URL in Vercel.

## API Overview

All endpoints are prefixed with `/api`. Protected routes need the auth cookie.

| Resource      | Method & Path                       | Access                | Description                          |
| ------------- | ----------------------------------- | --------------------- | ------------------------------------ |
| Auth          | `POST /auth/register`               | Public                | Register a new user                  |
|               | `POST /auth/login`                  | Public                | Log in                               |
|               | `POST /auth/logout`                 | Any                   | Log out                              |
|               | `GET /auth/me`                      | Authenticated         | Current user's role                  |
| Users         | `GET /users`                        | Admin                 | List all users                       |
|               | `GET /users/me`                     | Authenticated         | Current user                         |
|               | `GET /users/:userId`                | Admin                 | Get a user                           |
| Events        | `GET /events`                       | Public                | List events                          |
|               | `GET /events/:eventId`              | Public                | Get one event                        |
|               | `POST /events`                      | Admin                 | Create event (banner upload)         |
| Booths        | `GET /booths/:eventId`              | Admin, Exhibitor      | Booths of an event                   |
|               | `POST /booths`                      | Admin                 | Create booth (poster upload)         |
|               | `DELETE /booths/:boothId`           | Admin                 | Delete booth                         |
|               | `PATCH /booths/booking/:boothId`    | Exhibitor, Admin      | Book a booth                         |
|               | `PATCH /booths/removeBooking/:boothId` | Exhibitor, Admin   | Release a booking                    |
| Registrations | `GET /registrations`                | Visitor               | Own registrations                    |
|               | `GET /registrations/:eventId`       | Visitor               | Own registration for an event        |
|               | `POST /registrations/:eventId`      | Visitor               | Register for an event                |
|               | `DELETE /registrations/:registrationId` | Visitor, Admin    | Cancel a registration                |

See [`zDocumentation/RouteNames.md`](zDocumentation/RouteNames.md) for the original route notes.

## Frontend Routes

| Path                        | Page                                   |
| --------------------------- | -------------------------------------- |
| `/`                         | Home (role-based dashboard)            |
| `/login`, `/register`       | Authentication                         |
| `/event/:eventId`           | Event details                          |
| `/event/:eventId/edit`      | Edit event (Admin)                     |
| `/registrations`            | Visitor registrations                  |
| `/registration/:registrationId` | Registration details               |
| `/booking/:boothId`         | Booth booking (Exhibitor)              |
| `/unauthorized`, `*`        | Access denied / Not found              |

## Testing

```bash
cd backend
npm test
```

Tests use Jest and Supertest.

## Deployment

- **Backend:** deploy as a Web Service on Render. Add the backend environment variables there; Render provides `PORT`. Set `CORS_ORIGIN` to your Vercel frontend URL.
- **Frontend:** deploy to Vercel and set `VITE_API_URL` to the Render backend URL. `frontend/vercel.json` rewrites all paths to `index.html` so React Router routes work on refresh.
- **Cookies:** in production the auth cookie uses `secure: true` and `sameSite: 'none'` (required for cross-site cookies between Vercel and Render); in development it uses `sameSite: 'strict'`.

More detail is in [`zDocumentation/deployment.md`](zDocumentation/deployment.md).

## Troubleshooting

### `querySrv ECONNREFUSED` when connecting to MongoDB Atlas

On some machines Node.js uses the local DNS server (`127.0.0.1`) instead of the system's DNS servers, so `mongodb+srv://` lookups fail even though `nslookup` works and the connection code is correct.

As a **development-only** workaround, `backend/src/db/db.js` forces public DNS servers:

```js
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
```

This only affects the current Node.js process and does not change OS DNS settings. When deploying or moving to another machine, test without it first and remove it from production code if it isn't needed.

## Documentation

The [`zDocumentation`](zDocumentation) folder contains:

- `Project_Report.pdf`: the full project report
- `RouteNames.md`: API route notes
- `deployment.md`: deployment configuration notes
- `diagrams/`: model, layout and website flow diagrams

## Author

**Karan Singh Adhikari**: [@KSAdhikari008](https://github.com/KSAdhikari008)
