const express = require('express');
const router = express.Router();
const {createCategory,createManyCategory,deleteAllCategories} = require('../controllers/category.controller');
const {createOneArticle,createManyArticle} = require('../controllers/article.controller')

router.post('/',createCategory);
router.post('/many',createManyCategory);
router.post('/article/',createOneArticle);
router.post('/article/many/',createManyArticle);
router.delete('/delete/',deleteAllCategories);

module.exports = router;