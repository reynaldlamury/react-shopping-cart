const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// items from datebase
const Item = require('../../models/Item');

// @route     GET /api/items
// @desc      GET all items
// @access    Public
router.get('/', async (req, res) => {
  // -------------------- promise style ---------------------------
  // Item.find()
  //   .sort({ date: -1 })
  //   .then((items) => res.json(items));
  //
  // -------------------- async awqit style ---------------------------
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.log(err);
  }
});

// @route     POST /api/items
// @desc      POST item
// @access    Private (auth -middleware)
router.post('/', auth, (req, res) => {
  const { name, price } = req.body;
  const newItem = new Item({
    name,
    price,
  });
  // save it in database
  // promise
  newItem.save().then((item) => res.json(item));
});

// @route     DELETE /api/items
// @desc      DELETE item
// @access    Private (auth -middleware)
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove())
    .then(() => res.json({ success: true }))
    .catch(() => res.status(400).json({ success: false }));
});

module.exports = router;
