import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const router = express.Router();

// Helper to log errors to file
const logToFile = (msg) => {
  const logMsg = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(path.resolve("error.log"), logMsg);
};

router.post("/counsel", async (req, res) => {
  try {
    const { message, userProfile, type, previousHistory, resumeContent } = req.body;
    
    const apiKey = process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.trim() : null;

    logToFile(`Incoming Request: type=${type}`);

    if (!apiKey) {
      logToFile("❌ API KEY MISSING");
      return res.status(500).json({ reply: "API Key Not Configured" });
    }

    let systemPrompt = "You are an expert career counselor.";
    let userPrompt = message || "Hello";

    // Handle specialized types
    if (type === "resume_analysis") {
      systemPrompt = "You are an expert AI Resume Analyzer.";
      userPrompt = `Profile: ${JSON.stringify(userProfile)}\nResume: ${resumeContent}`;
    } else if (type === "recommendation") {
      if (!userProfile) return res.status(400).json({ reply: "Profile required" });

      systemPrompt = "You are a career recommendation engine. Return ONLY a JSON array of 3 objects.";
      userPrompt = `
Based on this profile:
- Stream: ${userProfile.stream}
- Interests: ${userProfile.interests}
- Skills: ${userProfile.skills}
- Goal: ${userProfile.goal}

Return a JSON array of 3 career matches. Format:
[
  { 
    "career": "Career Title", 
    "match": "Why it matches", 
    "growth": "Market growth trend",
    "salary": {
      "india": "₹... LPA – ₹... LPA",
      "abroad": "$...k – $...k"
    }
  }
]`;
    } else if (userProfile) {
      userPrompt = `User Profile: ${JSON.stringify(userProfile)}\n\nQuestion: ${message}`;
    }

    const apiMessages = [
      { role: "system", content: systemPrompt },
    ];
    
    // Re-enable history as connectivity is confirmed
    if (previousHistory && Array.isArray(previousHistory)) {
      previousHistory.forEach(msg => {
        if (msg.role && msg.content) apiMessages.push({ role: msg.role, content: msg.content });
      });
    }

    apiMessages.push({ role: "user", content: userPrompt });

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/auto", // Dynamically picks the best available model
        messages: apiMessages,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:8080",
          "X-Title": "Career Guidance AI",
        },
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content || "AI Response Error";

    if (type === "recommendation") {
      const jsonMatch = reply.match(/\[.*\]/s);
      if (jsonMatch) {
         return res.json({ recommendations: JSON.parse(jsonMatch[0]) });
      }
    }

    res.json({ reply, response: reply });
  } catch (error) {
    const detail = error.response?.data || error.message;
    logToFile(`🔥 ERROR: ${JSON.stringify(detail)}`);
    res.status(500).json({ reply: "Service error. Please check backend logs.", error: detail });
  }
});

export default router;