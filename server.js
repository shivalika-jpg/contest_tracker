const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // 👈 must be at the top!



const app = express();

// Importing routes
const authRoutes = require('./backend/routes/authRoutes');
console.log(typeof authRoutes);
const contestRoutes = require('./backend/routes/contestRoutes');
const contestLogRoutes = require('./backend/routes/contestLogRoutes');

app.use(cors());
app.use(express.json());

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Routing
app.use('/api/auth', authRoutes);      // ✅ Make sure this is a Router, not {}
app.use('/api/contests', require('./backend/routes/contestRoutes'));
app.use('/api/contest-log', contestLogRoutes);
app.use('/api/bookmarks', require('./backend/routes/bookmarkRoutes'));
console.log('✅ /api/bookmarks route registered');
const reminderRoutes = require('./backend/routes/reminderRoutes');
console.log('🧪 /api/reminders is of type:', typeof reminderRoutes);
app.use('/api/reminders', reminderRoutes);

// Handle root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Handle any other routes to serve frontend files
app.get('*', (req, res) => {
  // If the request doesn't start with /api, serve the frontend file
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'frontend', req.path));
  } else {
    res.status(404).json({ message: 'API endpoint not found' });
  }
});

// Connect to MongoDB
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err);
  });
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// Export for Vercel
module.exports = app;


