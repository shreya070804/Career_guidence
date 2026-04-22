import express from "express";
import { User, CounselingSession, Resource } from "../models/index.js";

const router = express.Router();

// Get dashboard stats
router.get("/stats", async (req, res) => {
  try {
    const [totalStudents, totalSessions, totalResources] = await Promise.all([
      User.count({ where: { role: "student" } }),
      CounselingSession.count(),
      Resource.count(),
    ]);
    res.json({ totalStudents, totalSessions, totalResources });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all students
router.get("/students", async (req, res) => {
  try {
    const students = await User.findAll({
      where: { role: "student" },
      attributes: ["id", "full_name", "email", "createdAt"],
      order: [["createdAt", "DESC"]],
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
