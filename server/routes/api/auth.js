const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
// =================================== all dependencies life up here
const router = express.Router();
const auth = require('../../middleware/auth');

// items from datebase
const User = require('../../models/User');

// @route     POST /api/auth
// @desc      Authenticate user
// @access    PUblic
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if (!email && !password) {
    res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Checking for existing user // validate email
  User.findOne({ email })
    // callback 1 (user)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ msg: 'user does not exist' });
      }

      // validate password that user enter --> using bycript compare
      bcrypt
        .compare(password, user.password)
        //promise // callback 2 -- (isMatch)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(404).json({ msg: 'Invalid credentials' });
          }

          // get token
          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: Math.pow(60, 30) },
            // callback 3 (err, token)
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            },
          );
        });
    });
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
