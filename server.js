const settingsRoutes = require("./routes/settingsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json({ limit: "20kb" }));

// Authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/settings", settingsRoutes);

// Home API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Growth Tech India Backend Running"
  });
});

// Health API
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    message: "Backend server is working"
  });
});

// Test API
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API working successfully"
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
    requestedPath: req.originalUrl
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  if (
    !process.env.JWT_SECRET ||
    process.env.JWT_SECRET.length < 32
  ) {
    console.error("Set a strong JWT_SECRET in .env");
    process.exit(1);
  }

  await connectDB();

  app.listen(PORT, () => {
    console.log("=================================");
    console.log("Growth Tech India Minor Project");
    console.log("MongoDB Connected Successfully");
    console.log(`Backend: http://localhost:${PORT}`);
    console.log(`Health: http://localhost:${PORT}/api/health`);
    console.log("Authentication Routes Ready");
    console.log("=================================");
  });
};

startServer();
