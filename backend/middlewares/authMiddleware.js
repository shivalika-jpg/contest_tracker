const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async (req, res, next) => {
  try {
    // 1. Check Authorization header
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);  // Log the Authorization header
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Authorization token required' 
      });
    }

    // 2. Extract token
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Malformed authorization header'
      });
    }
    console.log('Token extracted:', token);  // Log the extracted token

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);  // Log the decoded JWT

    // 4. Find user and attach to request
    req.user = await User.findById(decoded.id).select('-password');
    console.log('User found from token:', req.user);  // Log the user object
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // 5. Proceed if all checks pass
    next();
  } catch (err) {
    let message = 'Authentication failed';
    if (err.name === 'TokenExpiredError') {
      message = 'Token expired';
    } else if (err.name === 'JsonWebTokenError') {
      message = 'Invalid token';
    }

    console.error('Authentication Error:', err);  // Log the error object for debugging
    
    return res.status(403).json({
      success: false,
      message
    });
  }
};
