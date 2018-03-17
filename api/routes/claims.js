const express = require('express');
const ClaimController = require('../controllers/claim.js');
const { isAuthorizedAsAdmin } = require('../helpers/AuthUtils');

const router = express.Router();

router.post('/batchcreate', isAuthorizedAsAdmin, ClaimController.batchCreate);

module.exports = router;
