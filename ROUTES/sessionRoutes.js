const express = require('express');
const router = express.Router();
const authMiddleware = require('../MIDDLEWARE/authMiddleware');
const {
    createSession,
    getSessionsForUser,
    updateSession,
    deleteSession,
} = require('../CONTROLLERS/sessionController');

router.post('/', authMiddleware, createSession);
router.get('/', authMiddleware, getSessionsForUser);
router.put('/:id', authMiddleware, updateSession);
router.delete('/:id', authMiddleware, deleteSession);

module.exports = router;
