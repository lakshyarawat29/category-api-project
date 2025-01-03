const express = require('express');
const router = express.Router();
const {createCategory,createManyCategory} = require('../controllers/category.controller');

router.post('/',createCategory);
router.post('/many',createManyCategory);

module.exports = router;