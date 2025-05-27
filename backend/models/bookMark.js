const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contestId: { type: String, required: true },
  platform: { type: String, required: true },
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
