// models/Story.js
import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  name: String,
  story: String,
  createdAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [{ text: String, date: Date }]
});

// ✅ Prevent re-declaration during hot reload
const Story = mongoose.models.Story || mongoose.model("Story", storySchema);

export default Story;
