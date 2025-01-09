const express = require('express');
const router = express.Router();
const { getAllCategories, getOneCategory } = require('../controllers/category.controller');
const {getArticlesByCategory} = require('../controllers/article.controller')

router.get('/fetch/', getAllCategories);
router.get('/fetch/:name', getOneCategory);
router.get('/articles', getArticlesByCategory);

module.exports = router;
