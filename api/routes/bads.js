const express = require('express');
const BadController = require('../controllers/bad.js');
const { isAuthorizedAsAdmin } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAsAdmin, BadController.findAndCountAll);
router.get('/all/:year/:month', isAuthorizedAsAdmin, BadController.findAll);
router.post('/batchcreate', isAuthorizedAsAdmin, BadController.batchCreate);

module.exports = router;
