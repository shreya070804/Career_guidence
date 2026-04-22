import express from "express";
import { Resource } from "../models/index.js";

const router = express.Router();

// Get all published resources
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.findAll({
      where: { is_published: true },
      order: [["createdAt", "DESC"]],
    });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Create a resource
router.post("/", async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
