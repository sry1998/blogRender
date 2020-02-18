const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  postid: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true
  }
})

const likes = mongoose.model("like", likeSchema);
module.exports = likes;