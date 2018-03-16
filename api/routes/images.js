const express = require('express');
const ImageController = require('../controllers/images.js');

const router = express.Router();

router.get('/', ImageController.findAll);
router.get('/:imageId', ImageController.findOne);
router.post('/', ImageController.create);
router.put('/:imageId', ImageController.update);
router.delete('/:imageId', ImageController.destroy);

module.exports = router;
