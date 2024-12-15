const express = require('express');
const axios = require('axios');
const router = express.Router();

// Replace with your actual Zapier webhook URL
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/21017940/2sg5d41/';

router.post('/trigger-automation', async (req, res) => {
    try {
        const { invoiceId, invoiceAmount, dueDate, recipientEmail } = req.body;

        // Send data to Zapier Webhook
        const zapierResponse = await axios.post(ZAPIER_WEBHOOK_URL, {
            invoiceId,
            invoiceAmount,
            dueDate,
            recipientEmail,
        });

        console.log('Zapier Automation Triggered:', zapierResponse.data);
        res.status(200).json({ message: 'Automation triggered successfully!' });
    } catch (error) {
        console.error('Error triggering Zapier automation:', error.message);
        res.status(500).json({ message: 'Failed to trigger automation', error: error.message });
    }
});

module.exports = router;
