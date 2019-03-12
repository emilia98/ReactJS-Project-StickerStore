const router = require('express').Router();
const categoryController = require('../controllers/category');

router.post('/create', categoryController.create);

module.exports = router;