const express = require('express');
const ProjectTypeController = require('../controllers/project_types.js');
const { isAuthorizedAsAdmin } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAsAdmin, ProjectTypeController.findAll);

module.exports = router;
