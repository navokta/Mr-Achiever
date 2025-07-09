import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import storyRoutes from './routes/StoryRoutes.js';
import rephraseRoute from './routes/rephrase.js';
import Story from './models/Story.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();

// ✅ Clean CORS setup
app.use(cors({
  origin: 'https://www.navokta.com',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.options('*', cors());

app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ ROUTE REGISTRATION LOGS
console.log("🔧 Registering rephraseRoute on /api");
app.use('/api', rephraseRoute);

console.log("🔧 Registering storyRoutes on /api/stories");
app.use('/api/stories', storyRoutes);

console.log("🔧 Registering adminRoutes on /api/admin");
app.use('/api/admin', adminRoutes);

// ✅ PATCH: Like a story
app.patch("/api/stories/:id/like", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    story.likes += 1;
    await story.save();
    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to like story" });
  }
});

// ✅ PATCH: View a story
app.patch("/api/stories/:id/view", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    story.views += 1;
    await story.save();
    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to increase views" });
  }
});

// ✅ POST: Comment on a story
app.post("/api/stories/:id/comment", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    story.comments.push({ text: req.body.text, date: new Date() });
    await story.save();
    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to comment" });
  }
});

// ✅ GET: Single story by ID
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

// ✅ GET: Stats
app.get('/api/stats', async (req, res) => {
  try {
    const stories = await Story.find();
    const totalViews = stories.reduce((acc, story) => acc + (story.views || 0), 0);
    const totalStories = stories.length;

    res.json({ totalUsers: totalViews, totalStories });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// ✅ Confirm server start
console.log("✅ All routes registered. Starting server...");

// ✅ List all registered routes for debugging
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log("📦 Route:", middleware.route.path);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log("📦 Route:", handler.route.path);
      }
    });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
