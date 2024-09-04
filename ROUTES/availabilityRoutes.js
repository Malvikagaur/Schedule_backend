const express = require('express');
const router = express.Router();
const authMiddleware = require('../MIDDLEWARE/authMiddleware');
const {
    getUserAvailability,
    setUserAvailability,
    deleteAvailability,
} = require('../CONTROLLERS/availabilityController');

router.get('/', authMiddleware, getUserAvailability);
router.post('/', authMiddleware, setUserAvailability);
router.delete('/:id', authMiddleware, deleteAvailability);

module.exports = router;
