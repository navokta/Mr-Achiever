import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Load Gemini with free API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/rephrase", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Missing 'text' in request body." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(`Rephrase this story in a friendly tone:\n\n${text}`);
    const response = await result.response;
    const rephrased = response.text();

    res.json({ rephrased });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: error.message || "Rephrasing failed" });
  }
});

export default router;
