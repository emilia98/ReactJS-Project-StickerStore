const router = require('express').Router();
const tagController = require('../controllers/tag');
const verify = require('../middlewares/verify');
const admin = require('../middlewares/admin');

router.get('/all', tagController.getAll);
router.post('/create', verify, admin, tagController.create);
router.get('/edit/:id', tagController.editGet);
router.post('/edit/:id', tagController.editPost);
router.get('/status/:id', tagController.changeActiveStatus);

module.exports = router;