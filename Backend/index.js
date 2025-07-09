import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import storyRoutes from './routes/StoryRoutes.js';
import rephraseRoute from './routes/rephrase.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();

// CORS setup
app.use(cors({
  origin: 'https://www.navokta.com',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.options('*', cors());

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Register routes
app.use('/api', rephraseRoute);
app.use('/api/stories', storyRoutes);  // All story endpoints (GET, POST, LIKE, VIEW, COMMENT)
app.use('/api/admin', adminRoutes);   // Admin features

// Debug route list
app._router.stack.forEach(middleware => {
  if (middleware.route) {
    console.log("📦 Route:", middleware.route.path);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach(handler => {
      if (handler.route) {
        console.log("📦 Route:", handler.route.path);
      }
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
