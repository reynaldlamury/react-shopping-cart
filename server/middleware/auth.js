const config = require('config');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-token-auth');

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: 'no token, authorization denied' });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'no token is not valid' });
  }
};

module.exports = auth;
