const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../CONTROLLERS/authController');
const authMiddleware = require('../MIDDLEWARE/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);

module.exports = router;
