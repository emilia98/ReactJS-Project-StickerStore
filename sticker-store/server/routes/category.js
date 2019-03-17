const router = require('express').Router();
const categoryController = require('../controllers/category');

router.post('/create', categoryController.create);
router.get('/all', categoryController.getAll);
router.get('/edit/:id', categoryController.editGet);
router.get('/status/:id', categoryController.changeActiveStatus);

module.exports = router;