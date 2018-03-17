const express = require('express');
const ProjectController = require('../controllers/projects.js');
const { isAuthorizedAsAdmin } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAsAdmin, ProjectController.findAll);
router.get('/:projectId', isAuthorizedAsAdmin, ProjectController.findOne);
router.post('/', isAuthorizedAsAdmin, ProjectController.create);
router.put('/:projectId', isAuthorizedAsAdmin, ProjectController.update);
router.delete('/:projectId', isAuthorizedAsAdmin, ProjectController.destroy);

module.exports = router;
