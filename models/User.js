const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: Number,
    required: true
  },
  email: {
    	type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  address: {
    	type: mongoose.Schema.Types.Mixed,
    required: true,
  },
 password: {
    	type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);