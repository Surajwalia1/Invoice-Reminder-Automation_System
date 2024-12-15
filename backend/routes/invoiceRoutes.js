const express = require('express');
const { getInvoices, triggerAutomation } = require('../controllers/invoiceController');

const router = express.Router();

router.get('/', getInvoices);
router.post('/trigger', triggerAutomation);

module.exports = router;
