# Growth Tech India — Minor Project
## MongoDB Database Structure & Configuration

### Database technology

- **Database:** MongoDB
- **ODM:** Mongoose
- **Connection module:** `backend/config/db.js`
- **Connection setting:** `process.env.MONGO_URI`

The backend calls `mongoose.connect(process.env.MONGO_URI)`. On a failed connection, it logs the error and exits with status code 1. `server.js` connects to the database before starting the HTTP server.

### Environment variables

Store these locally in `backend/.env` and **never include real values in the submission**.

```dotenv
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/<database-name>
JWT_SECRET=<at-least-32-character-random-secret>
PORT=5000
EMAIL_USER=<sender-gmail-address>
EMAIL_APP_PASSWORD=<gmail-app-password>
```

`MONGO_URI` is required for database connectivity; `JWT_SECRET` is checked by `server.js` and must have at least 32 characters. `PORT` defaults to `5000`. Email variables are used by the password-reset email controller.

### User model

**Source:** `backend/tempModels/User.js`  
**Mongoose model:** `User` (default collection name usually `users`)

| Field | Type | Constraints / purpose |
|---|---|---|
| `_id` | ObjectId | MongoDB record identifier |
| `name` | String | Required, trimmed, minimum length 2 |
| `email` | String | Required, unique, lowercase, trimmed |
| `password` | String | Required; excluded from ordinary queries (`select: false`); stores a bcrypt hash |
| `role` | String | `user` or `admin`; default `user` |
| `isActive` | Boolean | Default `true` |
| `createdAt` | Date | Automatically added by timestamps |
| `updatedAt` | Date | Automatically updated by timestamps |

### Password-reset OTP model

**Source:** `backend/tempModels/PasswordResetOtp.js`  
**Mongoose model:** `PasswordResetOtp` (default collection name usually `passwordresetotps`)

| Field | Type | Purpose |
|---|---|---|
| `_id` | ObjectId | MongoDB record identifier |
| `email` | String | User email; indexed, lowercase, trimmed |
| `otpHash` | String | SHA-256 hash of the emailed OTP |
| `expiresAt` | Date | Expiration timestamp; TTL index |
| `attempts` | Number | Failed OTP verification attempts; default `0` |
| `verified` | Boolean | Whether OTP verification succeeded; default `false` |
| `resetTokenHash` | String / null | Hash of temporary password-reset token |
| `createdAt` | Date | Automatically added by timestamps |
| `updatedAt` | Date | Automatically updated by timestamps |

The TTL index on `expiresAt` removes expired OTP documents asynchronously. Application code must still check expiration explicitly.

### Data and access rules

- Passwords should be stored as bcrypt hashes, not plaintext.
- Email uniqueness is enforced in the user model.
- User roles control access to admin-only APIs through backend middleware.
- The password-reset flow stores hashes rather than plaintext OTPs and reset tokens.
- The actual MongoDB database name is determined by the `MONGO_URI` value; no specific name is assumed here.

### Submission notes

1. Submit source files, not database credentials.
2. Provide a sanitized `backend/.env.example` with placeholders.
3. Do not include the real `backend/.env`, database dumps containing real users, or `node_modules`.
4. To verify model details, compare this document with the current `tempModels/User.js` and `tempModels/PasswordResetOtp.js` before submission.
