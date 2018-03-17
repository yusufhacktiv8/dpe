const express = require('express');
const ProjectProgressController = require('../controllers/project_progress.js');
const { isAuthorizedAsAdmin } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', ProjectProgressController.findAll);
router.post('/batchcreate', isAuthorizedAsAdmin, ProjectProgressController.batchCreate);

module.exports = router;
