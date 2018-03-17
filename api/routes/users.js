const express = require('express');
const UserController = require('../controllers/users.js');
const { isAuthorizedAsAdmin } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAsAdmin, UserController.findAll);
router.get('/:userId', isAuthorizedAsAdmin, UserController.findOne);
router.post('/', isAuthorizedAsAdmin, UserController.create);
router.put('/:userId', isAuthorizedAsAdmin, UserController.update);
router.delete('/:userId', isAuthorizedAsAdmin, UserController.destroy);

module.exports = router;
