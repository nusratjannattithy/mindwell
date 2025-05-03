const express = require('express');
const router = express.Router();
const SelfTestResult = require('../models/SelfTestResult');

const calculateResult = (answers) => {
    const yesCount = answers.filter(answer => answer === 'yes').length;
    const totalQuestions = answers.length;
    const ratio = yesCount / totalQuestions;

    if (ratio === 0) {
        return "No significant symptoms detected.";
    } else if (ratio <= 0.4) {
        return "Mild symptoms detected. Consider monitoring your condition.";
    } else if (ratio <= 0.7) {
        return "Moderate symptoms detected. It is advisable to consult a healthcare professional.";
    } else {
        return "Severe symptoms detected. Please seek professional help immediately.";
    }
};

router.post('/', async (req, res) => {
    try {
        console.log('Received self test submission:', req.body);
        const { userId, testType, answers } = req.body;

        if (!userId || !testType || !answers || !Array.isArray(answers)) {
            console.error('Invalid input data:', req.body);
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const result = calculateResult(answers);

        const selfTestResult = new SelfTestResult({
            userId,
            testType,
            answers,
            result,
        });

        await selfTestResult.save();

        res.json({ result });
    } catch (error) {
        console.error('Error saving self test result:', error);
        console.error(error.stack);
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

router.get('/history/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const history = await SelfTestResult.find({ userId }).sort({ createdAt: -1 });
        res.json({ success: true, history });
    } catch (error) {
        console.error('Error fetching self assessment history:', error);
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

module.exports = router;
