const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const {
  addBookmark,
  getBookmarks,
  deleteBookmark
} = require('../controllers/bookmarkController');

router.use(authenticate);

router.post('/', addBookmark);
router.get('/', getBookmarks);
router.delete('/:contestId', deleteBookmark);
console.log('✅ bookmarkRoutes loaded');
module.exports = router;
