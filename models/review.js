const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  userName: {
        type: String,
    required: true
  },
  productName: {
        type: String,
    required: true
  },
  rating: {
        type: Number,
        min:1,
        max:5,
    required: true
  },
  emoji: {
        type: String,
    required: true,
    enum: ['😡','😞','☹','🙂','😊']
},
  description: {
        type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);