import express from "express";

const router = express.Router();

// Temporary in-memory storage for testing multi-user scenarios
// In production, this would be a PostgreSQL database
const sessionsStore = [];

// Get sessions for a specific student
router.get("/student/:studentId", (req, res) => {
  const { studentId } = req.params;
  console.log(`🔍 Fetching sessions for student: ${studentId}`);
  
  const studentSessions = sessionsStore.filter(s => s.student_id === studentId);
  res.json(studentSessions);
});

// GET /api/counseling/ - Health check
router.get("/", (req, res) => {
  res.json({ 
    status: "Counseling router active",
    total_stored_sessions: sessionsStore.length 
  });
});

// Book a new session
router.post("/", (req, res) => {
  const { student_id, session_date, session_type } = req.body;
  
  console.log(`📅 Booking received for: ${student_id}`);
  
  const newSession = {
    id: "session-" + Math.random().toString(36).substr(2, 9),
    student_id,
    session_date,
    session_type,
    status: "scheduled",
    counselor_name: "To be assigned",
    duration_minutes: 60,
    createdAt: new Date().toISOString()
  };

  sessionsStore.push(newSession);
  res.status(201).json(newSession);
});

export default router;
