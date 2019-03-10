const router = require('express').Router();
const tagController = require('../controllers/tag');

router.post('/create', tagController.create);

module.exports = router;