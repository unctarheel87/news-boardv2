const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  comment: {
    type: String,
    trim: true,
    required: "comment is required"
  }
});

module.exports = mongoose.model('Comment', commentSchema);