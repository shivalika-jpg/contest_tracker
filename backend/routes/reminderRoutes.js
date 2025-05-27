// backend/routes/reminderRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { setReminder } = require('../controllers/reminderController');

router.use(authenticate);
router.post('/', setReminder);

module.exports = router;
