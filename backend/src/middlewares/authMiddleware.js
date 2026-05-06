// backend/src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Security Guard 1: Must be logged in
exports.protect = async (req, res, next) => {
  let token;

  // Check if the token exists in the cookies
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database (but leave out the password) and attach them to the request
    req.user = await User.findById(decoded.id).select('-password');
    next(); // Pass them through to the next function
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Security Guard 2: Must be an Admin
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next(); // They are an admin, let them pass
  } else {
    res.status(403).json({ message: 'Not authorized as an Admin' });
  }
};