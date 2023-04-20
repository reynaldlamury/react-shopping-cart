const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
// =================================== all dependencies life up here

// items from datebase
const User = require('../../models/User');

// @route     POST /api/users
// @desc      Register new user
// @access    PUblic
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // simle validation
  if (!name || !email || !password) {
    res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Checking for existing user
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: 'user already exist' });
    }

    // encrypt password --> using bcrrypt
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        // Store hash in your password DB.
        if (!err) {
          const newUser = new User({
            name,
            email,
            password: hash,
          });

          // save to database
          newUser
            .save()
            //promise // also callbaack
            .then((user) => {
              // generate token from jwt
              jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: Math.pow(60, 3) },
                // callback
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
        }
      });
    });
  });
});

// @route     GET /api/users
// @desc      get all users
// @access    PUblic
router.get('/', (req, res) => {
  res.json(User);
});

module.exports = router;
