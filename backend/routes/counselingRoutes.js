import express from "express";
import { CounselingSession } from "../models/index.js";

const router = express.Router();

// Get sessions for a specific student
router.get("/student/:studentId", async (req, res) => {
  try {
    const sessions = await CounselingSession.findAll({
      where: { student_id: req.params.studentId },
      order: [["session_date", "ASC"]],
    });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Book a new session
router.post("/", async (req, res) => {
  try {
    const session = await CounselingSession.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
