import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Schema definition
const StorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  story: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [
    {
      text: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

// Reuse model if already compiled
const Story = mongoose.models.Story || mongoose.model('Story', StorySchema);

// ✅ Create story
router.post('/', async (req, res) => {
  try {
    const { name, story } = req.body;
    if (!name?.trim() || !story?.trim()) {
      return res.status(400).json({ error: "Name and story are required." });
    }
    const newStory = await Story.create({ name: name.trim(), story: story.trim() });
    res.status(201).json(newStory);
  } catch (err) {
    console.error("Error saving story:", err);
    res.status(500).json({ error: "Failed to save story." });
  }
});



router.get('/stories', async (req, res) => {
  const stories = await Story.find().sort({ createdAt: -1 });
  res.json(stories);
});

router.get('/stories/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const story = await Story.findById(id);
  if (!story) return res.status(404).json({ error: 'Story not found' });
  res.json(story);
});


// ✅ Get all stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    console.error("Error fetching stories:", err);
    res.status(500).json({ error: "Server error." });
  }
});

// ✅ Get a single story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found." });
    res.json(story);
  } catch (err) {
    console.error("Error fetching story:", err);
    res.status(500).json({ error: "Server error." });
  }
});

// ✅ Like a story
router.patch('/:id/like', async (req, res) => {
  try {
    const updated = await Story.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Error liking story:", err);
    res.status(500).json({ error: "Failed to like story." });
  }
});

// ✅ View a story
router.patch('/:id/view', async (req, res) => {
  try {
    const updated = await Story.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Error incrementing view:", err);
    res.status(500).json({ error: "Failed to increment view." });
  }
});

// ✅ Comment on a story
router.post('/:id/comment', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) {
      return res.status(400).json({ error: "Comment cannot be empty." });
    }
    const updated = await Story.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { text: text.trim(), date: new Date() } } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ error: "Failed to add comment." });
  }
});

export default router;
