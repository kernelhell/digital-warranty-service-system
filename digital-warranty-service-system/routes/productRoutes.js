const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.list);
router.get('/new', productController.newForm);
router.post('/', productController.create);
router.get('/:id', productController.view);
router.delete('/:id', productController.deleteOne);

module.exports = router;
