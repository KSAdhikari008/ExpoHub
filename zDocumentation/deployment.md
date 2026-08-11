# ExpoHub Deployment Configuration

## 1. Backend — Render

Deploy the Express backend as a **Web Service** on Render.

### Environment Variables

Add production variables in Render:

```env
MONGO_URI=...
JWT_SECRETKEY=...
CLOUDINARY_...
```

Render provides the `PORT` automatically.
Remove port from env.


## 2. Frontend — Vercel

Deploy the React/Vite frontend to Vercel.

### Development Environment

Create:

```text
.env.development
```

```env
VITE_API_URL=http://localhost:5000
```

### Axios Configuration - in `main.jsx`:

```js
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
```

### Production Environment
manually add:

```env
VITE_API_URL=https://your-backend.onrender.com
```

The same frontend code then works as:

```text
Development:
React → localhost:5000

Production:
Vercel → Render backend
```

---

## 3. CORS — Backend

Because the frontend and backend are on different origins:

```js
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
```

Set the production frontend URL in Render:

```env
FRONTEND_URL=https://your-frontend.vercel.app
```

## 5. Render Projects & Repositories

A **Render Project** is mainly for organizing services. You do not need a new project for every deployment.

Example:

```text
Render Workspace
├── ExpoHub Project
│   └── Backend
├── Portfolio Project
│   └── Portfolio Website
└── Chat App Project
    └── Backend
```

## 6 Cookie `SameSite` — Development vs Production

`SameSite` controls whether a browser sends a cookie with cross-site requests.

### Production 

with sameSite: 'none', secure must be true, then only then borwser stores the cookie, or it rejects it.

Use:

```js
res.cookie("token_ExpoHub", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 1000 * 60 * 60 * 24 * 7
});
```

### Development — Local HTTP

Localhost uses HTTP , so keep sameSite: 'strict'

Example:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

Use:

```js
res.cookie("token_ExpoHub", token, {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 1000 * 60 * 60 * 24 * 7
});