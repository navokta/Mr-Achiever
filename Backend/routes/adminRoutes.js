import express from 'express';
import dotenv from 'dotenv';
import Story from '../models/Story.js';

dotenv.config();
const router = express.Router();

// ✅ Admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// ✅ Get all stories
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// ✅ Edit story
router.put('/stories/:id', async (req, res) => {
  const { name, story } = req.body;
  try {
    const updated = await Story.findByIdAndUpdate(
      req.params.id,
      { name, story },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update story' });
  }
});

// ✅ Delete story
router.delete('/stories/:id', async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: 'Story deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete story' });
  }
});

// ✅ Edit comment
router.put('/stories/:storyId/comments/:commentIndex', async (req, res) => {
  const { storyId, commentIndex } = req.params;
  const { text } = req.body;

  try {
    const story = await Story.findById(storyId);
    if (!story || !story.comments[commentIndex]) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    story.comments[commentIndex].text = text;
    await story.save();

    res.json({ message: 'Comment updated', story });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// ✅ Delete comment
router.delete('/stories/:storyId/comments/:commentIndex', async (req, res) => {
  const { storyId, commentIndex } = req.params;

  try {
    const story = await Story.findById(storyId);
    if (!story || !story.comments[commentIndex]) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    story.comments.splice(commentIndex, 1);
    await story.save();

    res.json({ message: 'Comment deleted', story });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// ✅ Manually update view count
router.patch('/stories/:id/view', async (req, res) => {
  const { views } = req.body;
  try {
    const updated = await Story.findByIdAndUpdate(
      req.params.id,
      { views },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update views' });
  }
});

export default router;
