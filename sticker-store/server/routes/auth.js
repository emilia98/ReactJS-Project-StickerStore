const router = require('express').Router();
const auth = require('../controllers/auth');

router.post('/signup', auth.signUp);

module.exports = router;