const Article = require('../models/articles.model');
const Category = require('../models/category.model');

const getArticlesByCategory = async (req, res) => {
  try {
    // Extract and decode the category query parameter
    const category = decodeURIComponent(req.query.category || ''); // Handle undefined case

    if (!category.trim()) {
      return res.status(400).json({ message: 'Category is required.' });
    }


    console.log('Requested category:', category); // Debugging log

    // Fetch category details from the 'Category' collection
    const categoryDetails = await Category.findOne({
      name: { $regex: `^${category.trim()}$`, $options: 'i' }, // Case-insensitive match
    });

    console.log('Fetched category details:', categoryDetails); // Debugging log

    if (!categoryDetails) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    // Fetch articles for the given category from the 'Article' collection
    const articles = await Article.find({
      category: { $regex: `^${category.trim()}$`, $options: 'i' },
    });

    console.log('Fetched articles:', articles); // Debugging log

    if (!articles || articles.length === 0) {
      return res
        .status(404)
        .json({ message: 'No articles found for this category.' });
    }

    // Return combined response with category details and articles
    res.status(200).json({
      category: {
        name: categoryDetails.name,
        icon: categoryDetails.icon,
        webtypes: categoryDetails.devType,
      },
      articles,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createOneArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(200).json(article);
    console.log(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createManyArticle = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res
        .status(400)
        .json({ message: 'Input should be an array of articles.' });
    }
    const articles = await Article.insertMany(req.body);
    res.status(201).json(articles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getArticlesByCategory, createOneArticle, createManyArticle };
