# Growth Tech India — Minor Project
## REST API Documentation

**Stack:** Node.js, Express.js, MongoDB (Mongoose), JWT  
**Local base URL:** `http://localhost:5000` (or the `PORT` environment variable)

## General conventions

- JSON requests use `Content-Type: application/json`.
- Protected routes require `Authorization: Bearer <JWT_TOKEN>`.
- Admin routes require authentication **and** the admin role.
- Do not put real tokens, passwords, OTPs, or secrets in submitted examples.
- Error responses commonly include `success: false` and a `message`. Exact validation and response shapes are controlled by the corresponding controller.

## Authentication (`/api/auth`)

| Method | Endpoint | Authentication | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a user |
| POST | `/api/auth/login` | Public | Log in and obtain a JWT |
| GET | `/api/auth/me` | JWT | Retrieve authenticated user details |
| POST | `/api/auth/forgot-password` | Public | Request password-reset OTP by email |
| POST | `/api/auth/verify-otp` | Public | Verify OTP and receive a temporary reset token |
| POST | `/api/auth/reset-password` | Public, valid reset token required | Set a new password |

### Known request examples

**Register**
```json
{"name":"Example User","email":"user@example.com","password":"ExamplePassword123"}
```

**Login**
```json
{"email":"user@example.com","password":"ExamplePassword123"}
```

**Forgot password**
```json
{"email":"user@example.com"}
```

**Verify OTP**
```json
{"email":"user@example.com","otp":"123456"}
```

**Reset password**
```json
{"email":"user@example.com","resetToken":"<TOKEN_FROM_VERIFY_OTP>","newPassword":"NewExamplePassword123"}
```

> OTP and reset-token values above are placeholders. The OTP is delivered by email. The reset token must come from a successful `/verify-otp` response.

## Admin (`/api/admin`)

All routes below apply `protect` and `adminOnly` middleware.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/admin/stats` | Dashboard user statistics |
| GET | `/api/admin/users` | List users |
| PUT | `/api/admin/users/:id` | Update a user |
| PATCH | `/api/admin/users/:id/status` | Toggle a user's active status |
| DELETE | `/api/admin/users/:id` | Delete a user |
| GET | `/api/admin/analytics` | Advanced analytics |

`/:id` represents the MongoDB user record ID. Exact accepted update fields and response structures should be confirmed against `controllers/adminController.js` and `controllers/analyticsController.js` before adding request examples.

## Settings (`/api/settings`)

Both routes require JWT authentication through `protect` middleware.

| Method | Endpoint | Purpose |
|---|---|---|
| PUT | `/api/settings/profile` | Update the authenticated user's profile |
| PUT | `/api/settings/change-password` | Change the authenticated user's password |

Exact request fields and response structures should be confirmed against `controllers/settingsController.js`.

## Utility endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Backend status message |
| GET | `/api/health` | Health check |
| GET | `/api/test` | Basic API connectivity test |

**Health response**
```json
{"success":true,"status":"OK","message":"Backend server is working"}
```

**Unknown route:** HTTP `404` with `success: false`, `message: "API Route Not Found"`, and `requestedPath`.  
**Unhandled server error:** HTTP `500` with `success: false`, `message: "Internal Server Error"`.

## Security notes

- Never share a real JWT, password, OTP, `.env`, Gmail app password, or MongoDB connection string.
- JWT authentication is separate from role-based admin authorization.
- API authorization must be enforced in backend middleware, not just by hiding frontend controls.
- This documentation lists routes confirmed from the provided source files. Controller-specific request schemas and additional validation should be verified against the current controllers.
