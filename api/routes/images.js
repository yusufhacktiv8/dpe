const express = require('express');
const ImageController = require('../controllers/images.js');
const { isAuthorizedAsAdmin } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAsAdmin, ImageController.findAll);
router.get('/:imageId', isAuthorizedAsAdmin, ImageController.findOne);
router.post('/', isAuthorizedAsAdmin, ImageController.create);
router.put('/:imageId', isAuthorizedAsAdmin, ImageController.update);
router.delete('/:imageId', isAuthorizedAsAdmin, ImageController.destroy);

module.exports = router;
