const ContestLog = require('../models/contestLog');

// Add or update log
exports.upsertContestLog = async (req, res) => {
 const { contestId, problemsSolved, notes } = req.body;
  const userId = req.user.id;

  try {
   const updated = await ContestLog.findOneAndUpdate(
  { user: userId, contestId },
  { problemsSolved, notes },
  { new: true, upsert: true }
);

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save contest log' });
  }
};

exports.getContestLog = async (req, res) => {
  const { contestId } = req.params;
  const userId = req.user.id;

  try {
    const log = await ContestLog.findOne({ user: userId, contestId });
    if (!log) return res.status(404).json({ error: 'No log found' });

    // Send the rating value correctly
    res.status(200).json({
      problemsSolved: log.problemsSolved,
      notes: log.notes
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching log' });
  }
};


// Get all contest logs for a user
exports.getUserLogs = async (req, res) => {
  const userId = req.user.id;

  try {
    const logs = await ContestLog.find({ user: userId });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching logs' });
  }
};
