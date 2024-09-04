const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    scheduledTime: {
        type: Date,
        required: true,
    },
    sessionType: {
        type: String,
        enum: ['one-on-one', 'group'],
        default: 'one-on-one',
    },
}, {
    timestamps: true,
});

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;
