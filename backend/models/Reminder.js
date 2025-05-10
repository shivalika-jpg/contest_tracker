// backend/models/Reminder.js
const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contestId: { type: String, required: true },
  platform: String,
  name: String,
  startTime: Date,
  method: { type: String, enum: ['email', 'sms'], default: 'email' },
  timeBefore: { type: Number, default: 60 } // in minutes
});

module.exports = mongoose.model('Reminder', reminderSchema);
