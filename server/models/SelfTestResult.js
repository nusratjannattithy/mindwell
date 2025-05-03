const mongoose = require('mongoose');

const SelfTestResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    testType: {
        type: String,
        required: true,
    },
    answers: {
        type: [String],
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('SelfTestResult', SelfTestResultSchema);
