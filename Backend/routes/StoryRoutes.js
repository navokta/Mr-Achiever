import express from 'express';
import Story from '../models/Story.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, story } = req.body;

    // ✅ Basic validation
    if (!name?.trim() || !story?.trim()) {
      return res.status(400).json({ error: "Name and story are required." });
    }

    const saved = await Story.create({ name: name.trim(), story: story.trim() });

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving story:", err);
    res.status(500).json({ error: "Server error. Failed to save story." });
  }
});

export default router;
