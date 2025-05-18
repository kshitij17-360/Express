const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// Get all items
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ratings & reviews' });
  }
});

// Get a single item
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review & Rtaing not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Review & Rating' });
  }
});

// Create a new item
router.post('/', async (req, res) => {
  try {
    const { userId, productId, useName, productName, rating, emoji, description  } = req.body;
    const review = new Review({
      userId,
      productId,
      userName,
      productName,
      rating,
      emoji,
      description
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error creating Rating & review', error: error.message });
  }
});

// Update an item completely (PUT)
router.put('/:id', async (req, res) => {
  try {
    const { userId, productId,userName,productName, rating, emoji, description } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { userId, productId, userName, productName, rating, emoji, description },
      { new: true, runValidators: true }
    );
    if (!review) {
      return res.status(404).json({ message: 'Review & Rating not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error updating review & rating', error: error.message });
  }
});

// Partially update an item (PATCH)
router.patch('/:id', async (req, res) => {
  try {
    const { userId, productId, userName, productName, rating, emoji, description } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!review) {
      return res.status(404).json({ message: 'Review & Rating not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error updating review & rating', error: error.message });
  }
});
// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review & Rating not found' });
    }
    res.json({ message: 'Review & Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review & rating' });
  }
});

module.exports = router;