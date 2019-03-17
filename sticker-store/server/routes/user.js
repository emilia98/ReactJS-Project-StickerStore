const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/all', userController.getAll);
router.get('/status/:id', userController.changeActiveStatus);

module.exports = router;