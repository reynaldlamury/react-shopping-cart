const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
// =================================== all dependencies life up here
const router = express.Router();
const auth = require('../../middleware/auth');

// User items from datebase
const User = require('../../models/User');

// @route     POST /api/auth
// @desc      Authenticate user
// @access    Public
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if (!email && !password)
    return res.status(400).json({ msg: 'Please enter all fields' });

  try {
    // Checking for existing user // validate email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'user does not exist' });

    // validate entered password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(404).json({ msg: 'Invalid credentials' });

    // get token
    const token = jwt.sign({ id: user.id }, config.get('jwtSecret'), {
      expiresIn: Math.pow(60, 30),
    });
    if (!token) return res.status(400).json({ msg: 'no token' });
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        cart: user.cart,
      },
    });
  } catch (err) {
    console.log('Error user checking');
  }
});

// @route     GET /api/auth/users
// @desc      get user data
// @access    Private
router.get('/users', auth, async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id).select('-password');
    res.json(user);
  } catch (err) {
    console.log('error when getting user data');
  }
});

module.exports = router;
