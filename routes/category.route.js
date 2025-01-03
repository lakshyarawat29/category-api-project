const express = require('express');
const router = express.Router();
const {getAllCategories,getOneCategory} = require('../controllers/category.controller');

router.get('/fetch/',getAllCategories);
router.get('/fetch/:name',getOneCategory);

module.exports = router;