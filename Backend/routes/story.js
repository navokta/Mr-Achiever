import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// ✅ Schema definition
const StorySchema = new mongoose.Schema({
  name: String,
  story: String,
  createdAt: Date,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [
    {
      text: String,
      date: { type: Date, default: Date.now },
    }
  ]
});

// ✅ Reuse if already compiled
const Story = mongoose.models.Story || mongoose.model('Story', StorySchema);

// ✅ Get all stories
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    console.error('Error fetching stories:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Post a new story
router.post('/stories', async (req, res) => {
  try {
    const { name, story, createdAt } = req.body;
    const newStory = await Story.create({ name, story, createdAt });
    res.status(201).json({ message: 'Story saved', id: newStory._id });
  } catch (err) {
    console.error('Error saving story:', err);
    res.status(500).json({ error: 'Failed to save story' });
  }
});

// ✅ Like a story
router.patch('/stories/:id/like', async (req, res) => {
  try {
    const updated = await Story.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('Error liking story:', err);
    res.status(500).json({ error: 'Failed to like story' });
  }
});

// ✅ View a story
router.patch('/stories/:id/view', async (req, res) => {
  try {
    const updated = await Story.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('Error viewing story:', err);
    res.status(500).json({ error: 'Failed to increment view' });
  }
});

// ✅ Comment on a story
router.post('/stories/:id/comment', async (req, res) => {
  try {
    const { text } = req.body;
    const updated = await Story.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: { text, date: new Date() }
        }
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Failed to comment' });
  }
});

export default router;
