const express = require('express');
const LspController = require('../controllers/lsp.js');
const { isAuthorizedAsAdmin } = require('../helpers/AuthUtils');

const router = express.Router();

router.post('/batchcreate', isAuthorizedAsAdmin, LspController.batchCreate);

module.exports = router;
