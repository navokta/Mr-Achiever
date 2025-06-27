import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/rephrase", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing 'text' in request body." });
    }

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    const result = await model.generateContent(`Rephrase this story in a friendly tone:\n\n${text}`);
    const response = await result.response;
    const rephrased = response.text();

    // console.log("REPHRASED TEXT:", rephrased);

    res.json({ rephrased });

  } catch (error) {
    if (error.message.includes("Too Many Requests")) {
      return res.status(429).json({
        error: "You've hit the free quota limit. Please wait a few seconds and try again.",
        retryAfter: 10
      });
    }

    console.error("Gemini Error:", error);
    res.status(500).json({ error: error.message || "Rephrasing failed" });
  }
});

export default router;
