import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize, connectDB } from "./config/db.js";
import aiRoutes from "./routes/aiRoutes.js";
import counselingRoutes from "./routes/counselingRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import "./models/index.js"; // Initialize associations

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api/sessions", counselingRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/admin", adminRoutes);

// Basic Route
app.get("/", (req, res) => {
  res.send("Career Guidance AI API is running...");
});

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true });
    console.log("✅ Models synced successfully.");
    app.listen(PORT, () => {
      console.log(`🚀 Server up and running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();
