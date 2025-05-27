// backend/controllers/contestController.js
const axios = require('axios');

exports.getCodeforcesContests = async (req, res) => {
  try {
    const response = await axios.get('https://codeforces.com/api/contest.list');
    const contests = response.data.result;

    const now = Math.floor(Date.now() / 1000);
    const sevenDaysAgo = now - 7 * 24 * 60 * 60;

    const filteredContests = contests.filter(contest =>
      contest.phase === 'BEFORE' || // upcoming
      (contest.phase === 'FINISHED' && contest.startTimeSeconds >= sevenDaysAgo) // past 7 days
    );

    const mappedContests = filteredContests.map(contest => ({
  id: contest.id,
  name: contest.name,
  platform: 'Codeforces',
  startTime: new Date(contest.startTimeSeconds * 1000),
  duration: contest.durationSeconds,
  url: `https://codeforces.com/contest/${contest.id}` // ✅ fixed
}));


    res.json(mappedContests);
  } catch (error) {
    console.error('Error fetching Codeforces contests:', error);
    res.status(500).json({ message: 'Failed to fetch contests' });
  }
};
