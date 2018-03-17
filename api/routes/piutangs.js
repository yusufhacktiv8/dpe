const express = require('express');
const PiutangController = require('../controllers/piutang.js');
const { isAuthorizedAsAdmin } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAsAdmin, PiutangController.findAndCountAll);
router.get('/piutang/:year/:month', isAuthorizedAsAdmin, PiutangController.findAll);
router.post('/batchcreate', isAuthorizedAsAdmin, PiutangController.batchCreate);

module.exports = router;
