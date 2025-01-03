const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"] // Validation added
    },
    devType: {
      type: String,
      required: [true, "Please specify development type"] // Validation added
    },
    icon: {
      type: String,
      required: [true, "Please provide an icon URL"] // Validation added
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
