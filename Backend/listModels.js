import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const result = await genAI.listModels();
    console.log("✅ Available Gemini Models:");
    result.models.forEach((model) => {
      console.log(`- ${model.name} (${model.displayName || "no display name"})`);
    });
  } catch (err) {
    console.error("❌ Failed to list models:", err.message);
  }
}

listModels();
