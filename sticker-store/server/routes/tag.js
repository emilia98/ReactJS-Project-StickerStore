const router = require('express').Router();
const tagController = require('../controllers/tag');

router.get('/all', tagController.getAll);
router.post('/create', tagController.create);
router.get('/edit/:id', tagController.editGet);
router.post('/edit/:id', tagController.editPost);
router.get('/status/:id', tagController.changeActiveStatus);

module.exports = router;