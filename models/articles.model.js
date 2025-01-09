const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the title"], // Validation for title
    },
    author: {
      type: String,
      required: [true, "Please specify the author"], // Validation for author
    },
    content: {
      type: String,
      required: [true, "Please provide the content"], // Validation for content
    },
    category: {
      type: String,
      required: [true, "Please specify the category"], // Validation for category
    },
    publishedAt: {
      type: Date,
      required: [true, "Please provide the publish date"], // Validation for publish date
    },
    tags: {
      type: [String],
      required: [true, "Please provide at least one tag"], // Validation for tags
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
