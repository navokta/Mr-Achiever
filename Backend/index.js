import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import storyRoutes from './routes/StoryRoutes.js';
import rephraseRoute from './routes/rephrase.js';
// import storyRoutes from './routes/Story.js'; // 👈 Correct case-sensitive import
import Story from './models/Story.js'; // Ensure this path is correct

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api', rephraseRoute);
app.use('/api', storyRoutes); // 👈 Your story routes


app.patch("/api/stories/:id/like", async (req, res) => {
  const story = await Story.findById(req.params.id);
  story.likes += 1;
  await story.save();
  res.json(story);
});

app.patch("/api/stories/:id/view", async (req, res) => {
  const story = await Story.findById(req.params.id);
  story.views += 1;
  await story.save();
  res.json(story);
});

app.post("/api/stories/:id/comment", async (req, res) => {
  const story = await Story.findById(req.params.id);
  story.comments.push({ text: req.body.text, date: new Date() });
  await story.save();
  res.json(story);
});


// Get single story by ID
app.get("/story/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });
    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
