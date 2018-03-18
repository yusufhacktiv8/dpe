const express = require('express');
const OkDetailsController = require('../controllers/ok_details.js');
const { isAuthorizedAsUser } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/:year/:month/:projectType', isAuthorizedAsUser, OkDetailsController.getData);

module.exports = router;
