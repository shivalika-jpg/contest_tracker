const mongoose = require('mongoose');

const contestLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contestId: { type: String, required: true },        
  problemsSolved: { type: Number },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ContestLog', contestLogSchema);