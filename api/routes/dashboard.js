const express = require('express');
const DashboardController = require('../controllers/dashboard.js');
const { isAuthorizedAsUser } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/data/:year/:month', isAuthorizedAsUser, DashboardController.getDashboardData);
router.get('/charts/:year', isAuthorizedAsUser, DashboardController.allCharts);

module.exports = router;
