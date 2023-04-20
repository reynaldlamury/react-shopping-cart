const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// items from datebase
const Item = require('../../models/Item');

// @route     GET /api/items
// @desc      GET all items
// @access    Public
router.get('/', async (req, res) => {
  // -------------------- async awqit style ---------------------------
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.log(err);
  }
});

// @route     GET /api/items/:id
// @desc      GET single item info
// @access    Public
router.get('/:id', async (req, res) => {
  // -------------------- async awqit style ---------------------------
  try {
    const item = await Item.findById(req.params.id);
    res.json(item).statusMessage('Item has been added');
  } catch (err) {
    console.log(err);
  }
});

// @route     POST /api/items
// @desc      POST item
// @access    Private (auth -middleware)
router.post('/', auth, async (req, res) => {
  const { name, price } = req.body;
  const newItem = new Item({
    name,
    price,
  });

  try {
    // save it in mongoDB
    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.log('error while posting item');
  }
});

// @route     DELETE /api/items
// @desc      DELETE item
// @access    Private (auth -middleware)
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    await item.remove();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

module.exports = router;
