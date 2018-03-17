const express = require('express');
const RoleController = require('../controllers/roles.js');

const { isAuthorizedAsAdmin } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAsAdmin, isAuthorizedAsAdmin, RoleController.findAll);
router.get('/:roleId', isAuthorizedAsAdmin, RoleController.findOne);
router.post('/', isAuthorizedAsAdmin, RoleController.create);
router.put('/:roleId', isAuthorizedAsAdmin, RoleController.update);
router.delete('/:roleId', isAuthorizedAsAdmin, RoleController.destroy);

module.exports = router;
