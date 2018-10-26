const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "title is required"
  },
  summary: {
    type: String,
    trim: true,
    required: "summary is Required"
  },
  author: {
    type: String,
    trim: true,
    //required: "author is Required"
  }, 
  image: {
    type: String,
    trim: true,
    //required: "image is Required"
  },  
  link: {
    type: String,
    trim: true,
    //required: "link is Required"
  },
  rating: {
    type: Number
    //required: "rating is Required"
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

module.exports = mongoose.model('Article', articleSchema);