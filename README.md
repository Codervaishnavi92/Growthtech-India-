# Growth Tech India — Minor Project

## Project Overview

A full-stack user management web application developed for the Growth Tech India minor project assignment. It includes user authentication, an admin portal, role-based access, user management, dashboard summaries, and responsive interfaces.

## Technology Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite 8, CSS, Lucide React |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose 9 |
| Authentication | JSON Web Tokens (JWT), bcryptjs |
| Password recovery | Nodemailer, email OTP |

## Features

- User registration, login, logout, and form validation
- Password recovery using email OTP
- JWT-based authentication and protected routes
- Admin dashboard and user management
- Create, read, update, and delete user records
- User roles and active/inactive account management
- Dashboard statistics and analytics
- Responsive frontend design
- REST API integration and backend error handling

## Project Structure

```text
GrowthTech-Minor-Project/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── scripts/
│   ├── tempModels/
│   ├── server.js
│   ├── package.json
│   └── .env                 # local only; do not submit
└── README.md
```

## Prerequisites

- Node.js and npm compatible with the installed Vite version (check the Node.js version required by Vite 8)
- MongoDB Atlas cluster or local MongoDB instance
- Gmail account with an App Password if testing email OTP

## Installation and Setup

### 1. Get the source code

Download or clone the project, then open its root folder in VS Code.

### 2. Configure the backend

Open a terminal in the project root:

```bash
cd backend
npm install
```

Create `backend/.env` with the environment variables required by your backend. **Do not commit real secrets.** The following is an example; verify the MongoDB connection variable name against `backend/config/db.js`:

```dotenv
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_random_secret_at_least_32_characters_long
EMAIL_USER=your_sender_email@gmail.com
EMAIL_APP_PASSWORD=your_google_app_password
```

`JWT_SECRET` must be at least 32 characters long because `server.js` validates its length before starting.

Start the backend:

```bash
node server.js
```

Expected local backend URL: `http://localhost:5000`.

### 3. Configure the frontend

Open another terminal in the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

**Important:** The current backend CORS configuration allows `http://localhost:5173`. The frontend API URL and CORS settings must be configured appropriately before deploying publicly.

## Confirmed Backend API Mount Points

The following routes are explicitly registered in `backend/server.js`:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/` | Backend status message |
| GET | `/api/health` | Health check |
| GET | `/api/test` | Basic API test |
| Various | `/api/auth/*` | Authentication routes |
| Various | `/api/admin/*` | Admin routes |
| Various | `/api/settings/*` | Settings routes |

Known authentication endpoints from the project's authentication routes:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/me` | Get authenticated user (JWT required) |
| POST | `/api/auth/forgot-password` | Request email OTP |
| POST | `/api/auth/verify-otp` | Verify OTP and obtain reset token |
| POST | `/api/auth/reset-password` | Reset password with reset token |

For exact admin and settings endpoints, inspect `backend/routes/adminRoutes.js` and `backend/routes/settingsRoutes.js` before writing full API documentation.

## Testing Checklist

- [✅] Registration and login
- [✅] Invalid-password handling
- [✅] Logout and protected-page access
- [✅] Email OTP password reset
- [✅] Admin login and dashboard
- [✅] Admin route protection
- [✅] User CRUD and role changes
- [✅] Dashboard statistics
- [✅] Mobile responsive layout

The checklist reflects manual tests reported during project development, not an automated test suite.

## Security and Submission Notes

- Never share or commit `.env`, database credentials, Gmail App Passwords, or JWT secrets.
- Exclude `node_modules/` from the submitted ZIP.
- Include an `.env.example` containing placeholders, not real credentials.
- Do not include real users' personal data or database exports with sensitive information.
- For a public deployment, review CORS, rate limiting, JWT invalidation after password resets, input validation, and access controls.

## Submission Contents

- Frontend and backend source code
- README and setup instructions
- Database schema/configuration details (without credentials)
- API documentation
- Screenshots or short demonstration video

## Assignment

**Organization:** Growth Tech India  
**Project Type:** Minor Project  
**Technology Stack:** React.js, Node.js, MongoDB
