const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: false
  },
  role: {
    type: String,
    required: true,
    trim: true
  }
})

const users = mongoose.model("user", userSchema);
module.exports = users;