import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import counselingRoutes from "./routes/counselingRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
// We mount counseling first to ensure it's handled properly
app.use("/api/counseling", counselingRoutes);

// Alias /api/book-session to the same router for compatibility with the emergency fix
app.use("/api/book-session", counselingRoutes);

app.use("/api/ai", aiRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/resources", resourceRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Career Guidance AI API is running...");
});

// Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});