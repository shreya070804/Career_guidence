import { generateCareerCounsel } from "../utils/gemini.js";

export const getAICounsel = async (req, res) => {
  const { message, previousHistory } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const aiResponse = await generateCareerCounsel(message);
    res.json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
