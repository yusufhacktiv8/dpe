const express = require('express');
const CashFlowController = require('../controllers/cash_flow.js');
const { isAuthorizedAsAdmin } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAsAdmin, CashFlowController.findAndCountAll);
router.get('/all/:year/:month', isAuthorizedAsAdmin, CashFlowController.findAll);
router.post('/batchcreate', isAuthorizedAsAdmin, CashFlowController.batchCreate);

module.exports = router;
