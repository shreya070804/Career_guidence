import express from "express";
import { getAICounsel } from "../controllers/aiController.js";

const router = express.Router();

router.post("/counsel", getAICounsel);

export default router;
