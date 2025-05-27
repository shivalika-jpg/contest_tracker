const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contestId: String,
  name: String,
  platform: String,
  startTime: Date,
  method: String, // 'sms' or 'email'
  timeBefore: Number, // in minutes
  sent: { type: Boolean, default: false } // <-- add this
});

module.exports = mongoose.model('Reminder', reminderSchema);
