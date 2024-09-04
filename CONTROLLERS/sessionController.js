const Session = require('../MODELS/Session');
const Availability = require('../MODELS/Availability');
const sendEmail = require('../utils/sendEmail');

// Create a session
exports.createSession = async (req, res) => {
    const { title, description, participants, scheduledTime, sessionType } = req.body;

    try {
        // Check for availability conflicts
        for (let participant of participants) {
            const availability = await Availability.find({
                user: participant,
                day: new Date(scheduledTime).toLocaleDateString('en-us', { weekday: 'long' }),
            });
            const isAvailable = availability.some(slot => (
                slot.startTime <= scheduledTime && slot.endTime >= scheduledTime
            ));
            if (!isAvailable) {
                return res.status(400).json({ message: `User with ID ${participant} is not available at the selected time.` });
            }
        }

        const session = new Session({ title, description, participants, scheduledTime, sessionType });
        await session.save();

        // Send notification emails
        for (let participant of participants) {
            const user = await User.findById(participant);
            await sendEmail({
                to: user.email,
                subject: 'New Session Scheduled',
                text: `A new session "${title}" has been scheduled for you.`,
            });
        }

        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get sessions for the current user
exports.getSessionsForUser = async (req, res) => {
    try {
        const sessions = await Session.find({ participants: req.user.id });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Reschedule or cancel a session
exports.updateSession = async (req, res) => {
    const { title, description, scheduledTime, sessionType } = req.body;

    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        session.title = title || session.title;
        session.description = description || session.description;
        session.scheduledTime = scheduledTime || session.scheduledTime;
        session.sessionType = sessionType || session.sessionType;

        await session.save();

        res.json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Delete a session
exports.deleteSession = async (req, res) => {
    try {
        await Session.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
