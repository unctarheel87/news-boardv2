const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: {
    type: String,
    trim: true,
    required: "comment is required"
  }
});

module.exports = mongoose.model('Comment', commentSchema);