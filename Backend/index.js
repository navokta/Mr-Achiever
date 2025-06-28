import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import rephraseRoute from './routes/rephrase.js'; // existing route
import Story from './models/Story.js'; // or wherever your model is

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));



// ✅ Rephrase route
app.use("/api", rephraseRoute);



app.get("/api/stories", async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    console.error("Failed to fetch stories:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST story route
app.post("/api/stories", async (req, res) => {
  try {
    const { name, story, createdAt } = req.body;
    const saved = await Story.create({ name, story, createdAt });
    res.status(201).json({ message: "Story saved", id: saved._id });
  } catch (err) {
    console.error("Story save error:", err);
    res.status(500).json({ error: "Failed to save story" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
