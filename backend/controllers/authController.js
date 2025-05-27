console.log('AuthController loaded'); // Verify the file is being loaded
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'Username already exists' });

    const user = new User({ username, password });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login' });
  }
};

exports.logout = async (req, res) => {
  try {
    // Clear the token from the client side
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error during logout' });
  }
};
