const express = require('express');
const ProjectionController = require('../controllers/projection.js');
const { isAuthorizedAsAdmin } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAsAdmin, ProjectionController.findAndCountAll);
router.get('/proyeksi/:year/:month', isAuthorizedAsAdmin, ProjectionController.findAll);
router.post('/batchcreate', isAuthorizedAsAdmin, ProjectionController.batchCreate);

module.exports = router;
