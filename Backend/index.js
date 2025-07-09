import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import storyRoutes from './routes/StoryRoutes.js';
import rephraseRoute from './routes/rephrase.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();

// ✅ Allow requests only from navokta.com
const allowedOrigins = ['https://www.navokta.com'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like curl or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS: Not allowed by origin'));
    }
  },
  credentials: true,
}));

// ✅ Support pre-flight (OPTIONS) requests
app.options('*', cors());

app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/api', rephraseRoute);
app.use('/api/stories', storyRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Debug: print registered routes
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

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
