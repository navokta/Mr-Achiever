import express from 'express';
import Story from '../models/Story.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, story } = req.body;
  const saved = await Story.create({ name, story });
  res.json(saved);
});

export default router;
