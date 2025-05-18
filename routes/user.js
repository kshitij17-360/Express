const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all items
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Get a single item
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Create a new item
router.post('/', async (req, res) => {
  try {
    const { name, mobile, email, address, password  } = req.body;
    const user = new User({
      name,
      mobile,
      email,
      address,
      password
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

// Update an item completely (PUT)
router.put('/:id', async (req, res) => {
  try {
    const { name, mobile, email, address, password } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, mobile, email, address, password },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
});

// Partially update an item (PATCH)
router.patch('/:id', async (req, res) => {
  try {
    const { name, mobile, email, address, password } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, mobile, email, address, password },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
});
// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;