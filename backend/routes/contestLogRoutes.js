const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const {
  upsertContestLog,
  getContestLog,
  getUserLogs
} = require('../controllers/contestLogController');

router.use(authenticate);

router.post('/', upsertContestLog);
router.get('/user', getUserLogs);
router.get('/:contestId', getContestLog);

module.exports = router;
