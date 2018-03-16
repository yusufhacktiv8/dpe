const express = require('express');
const RoleController = require('../controllers/roles.js');

const { isAuthorizedAsAdmin } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAsAdmin, RoleController.findAll);
router.get('/:roleId', RoleController.findOne);
router.post('/', RoleController.create);
router.put('/:roleId', RoleController.update);
router.delete('/:roleId', RoleController.destroy);

module.exports = router;
