const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
// const auth = require('../../middleware/auth');
// =================================== all dependencies life up her
const router = express.Router();

// User items from datebase
const User = require('../../models/User');

// @route     POST /api/forgot-password
// @desc      send reset password request to email
// @access    Public
router.post('/', async (req, res) => {
  const { email } = req.body;

  if (email === '')
    return res.status(400).json({ msg: 'Email must not be empty' });
  try {
    // check if user email exist or not
    const user = await User.findOne({ email });
    if (!user)
      return res.status(403).json({ msg: 'email/user is not registered' });

    // creaate one time link
    const secret = `${config.get('jwtSecret')}${user.password}`;
    const payload = {
      email: user.email,
      id: user._id,
    };
    try {
      const token = await jwt.sign(payload, secret, { expiresIn: '4m' });
      const link = `http://localhost:3000/reset-password/${user._id}/${token}`;
      //--------------- success response -------------------- //
      return res.json({ link, email: user.email });
      //--------------- success response -------------------- //
    } catch (err) {
      return res.status(400).json({ msg: 'error while creating link' });
    }
  } catch (err) {
    console.log(err);
    //--------------- error response -------------------- //
    return res
      .status(400)
      .json({ msg: 'error while searching for user email' });
    //--------------- error response -------------------- //
  }
});

// @route     GET /api/forgot-password/:id/:token
// @desc      handle link
// @access    Private
router.get('/:id/:token', async (req, res) => {
  const { id, token } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(403).json({ msg: 'Invalid user id' });

    const secret = `${config.get('jwtSecret')}${user.password}`;
    try {
      // verify token
      const decoded = await jwt.verify(token, secret);
      if (!decoded) return res.status(400).json({ msg: 'Invalid token' });
      return res.json({ email: user.email });
    } catch (err) {
      console.log(err);
      return res.status(403).json({ msg: 'error while verifying token' });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: 'something went wrong' });
  }
});

// @route     PUT /api/forgot-password/:id/:token
// @desc      reset password
// @access    Private
router.put('/:id/:token', async (req, res) => {
  const { id, token } = req.params;

  const { pass1, pass2 } = req.body;
  if (!pass1 || !pass2) {
    return res.status(400).json({ msg: 'Please do not leave them blank' });
  }

  if (pass1 !== pass2)
    return res.status(400).json({ msg: 'password does not match' });

  try {
    // don't forget you don't wanna store plain password in the DB
    const hashedPassword = await bcrypt.hashSync(pass2, 10);

    // update password
    const filter = { _id: id };
    const update = { password: hashedPassword };
    const user = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    return res.json({
      token,
      user: {
        id,
        name: user.name,
        email: user.email,
        cart: user.cart,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: 'Error while resetting user password' });
  }
});

module.exports = router;
