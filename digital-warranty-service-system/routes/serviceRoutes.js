const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/', serviceController.list);
router.get('/new', serviceController.newForm);
router.post('/', serviceController.create);
router.delete('/:id', serviceController.deleteOne);

module.exports = router;
