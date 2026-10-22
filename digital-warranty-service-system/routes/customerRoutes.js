const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.list);
router.post('/', customerController.create);
router.get('/:id', customerController.view);
router.delete('/:id', customerController.deleteOne);

module.exports = router;
