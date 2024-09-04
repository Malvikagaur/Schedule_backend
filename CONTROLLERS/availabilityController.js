const Availability = require("../MODELS/Availability");

// Get availability for a user
exports.getUserAvailability = async (req, res) => {
    try {
        const availability = await Availability.find({ user: req.user.id });
        res.json(availability);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add or update availability
exports.setUserAvailability = async (req, res) => {
    const { availability } = req.body;

    try {
        await Availability.deleteMany({ user: req.user.id });
        const newAvailability = availability.map((slot) => ({
            ...slot,
            user: req.user.id,
        }));
        await Availability.insertMany(newAvailability);
        res.status(201).json(newAvailability);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a specific availability slot
exports.deleteAvailability = async (req, res) => {
    try {
        await Availability.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
