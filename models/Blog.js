const mongoose = require('mongoose');
require('draft-js');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TweetSchema object
const BlogSchema = new Schema({
  title: {
    type: String,
    required: 'please enter a title'
  },
  content: {
    type: String,
    required: "Please enter a blog"
  },
  dateCreated: {
    type: String,
    required: false
  }
});

// This creates our model from the above schema, using Mongoose's model method
var Blog = mongoose.model('Blog', BlogSchema);

// Export the Tweet model
module.exports = Blog;