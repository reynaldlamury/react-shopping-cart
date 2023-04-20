const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
// =================================== all dependencies life up here

// items from datebase
const User = require('../../models/User');
const Item = require('../../models/Item');

// @route     POST /api/users
// @desc      Register new user
// @access    PUblic
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  // simle validation
  if (!name || !email || !password)
    return res.status(400).json({ msg: 'Please enter all fields' });

  // Checking for existing user
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'user already exist' });
    // encrypt password --> using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    try {
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser.id }, config.get('jwtSecret'), {
        expiresIn: Math.pow(60, 3),
      });

      if (!token) return res.status(400).json({ msg: 'no token' });
      res.json({
        token,
        newUser: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (err) {
      throw Error('Error while Creating User');
    }
  } catch (error) {
    console.log('Error user checking');
  }
});

// @route     GET /api/users
// @desc      get all users data
// @access    Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ date: -1 });
    res.json(users);
  } catch (err) {
    console.log('cannot get users data');
  }
});

// @route     GET /api/users/CartItemCheck/:id
// @desc      get user's CartItems
// @access    Private - Public
router.get('/CartItemCheck/:id', async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    // const user = await User.find({ name: 'Nancy' });
    const { cart } = userData;

    let removedItems = new Map();
    let notExistItems = [];
    cart.forEach(async (cartItem) => {
      let item = await Item.findById(cartItem._id);
      if (!item) {
        removedItems.set(cartItem.name, cartItem);
        notExistItems.push(cartItem);
        console.log(cartItem);
      }
    });

    //  console.log(removedItems);
    const cartItems = cart;
    res.json(cartItems);
  } catch (err) {
    console.log('error while checking item');
  }
});

// @route     GET /api/users/:id
// @desc      get single user data
// @access    Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log('cannot get users data');
  }
});

// ====================== USER CART =========================== //

// @route     PUT /api/users/:id/cart
// @desc      update user cart (add item to cart)
// @access    Private
router.put('/:id/cart', auth, async (req, res) => {
  // -------------------- async awqit style ----------------------//
  const {
    product: { _id: itemID },
  } = req.body;
  try {
    // target user whose item's gonna be removed
    const currentUser = await User.findById(req.params.id);

    // check if item is exist or not
    let isExist = false;
    currentUser.cart.forEach((item) => {
      if (item._id === itemID) isExist = true;
    });
    if (!isExist) {
      // update user cart
      await currentUser.updateOne({ $push: { cart: req.body.product } });
      return res.status(200).json({ msg: 'Product has been added to cart' });
    }
    return res.status(403).json({ msg: 'You already add this item' });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// @route     PUT /api/users/:id/cart/remove
// @desc      remove item from cart
// @access    Private
router.put('/:id/cart/remove', auth, async (req, res) => {
  // -------------------- async awqit style ----------------------//
  try {
    // target user whose item's gonna be removed
    const currentUser = await User.findById(req.params.id);
    // update user cart
    await currentUser.updateOne({ $pull: { cart: req.body.product } });
    return res.status(200).json({ msg: 'Product has been removed from cart' });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
