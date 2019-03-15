const router = require('express').Router();
const categoryController = require('../controllers/category');

router.post('/create', categoryController.create);
router.get('/all', categoryController.listAll);

module.exports = router;