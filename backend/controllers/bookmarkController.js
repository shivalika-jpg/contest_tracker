const Bookmark = require('../models/bookMark');

exports.addBookmark = async (req, res) => {
console.log('📌 addBookmark controller hit');
  const { contestId, platform, name, startTime, duration } = req.body;
  const userId = req.user._id;

  try {
    const existing = await Bookmark.findOne({ userId, contestId });
    if (existing) {
      return res.status(400).json({ message: 'Already bookmarked' });
    }

    const bookmark = new Bookmark({ userId, contestId, platform, name, startTime, duration });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(500).json({ message: 'Error bookmarking contest', error: err });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user._id });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get bookmarks' });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const deleted = await Bookmark.findOneAndDelete({
      userId: req.user._id,
      contestId: req.params.contestId
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    res.json({ message: 'Bookmark removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting bookmark' });
  }
};
