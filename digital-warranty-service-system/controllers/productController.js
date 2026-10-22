const Product = require('../models/Product');
const Customer = require('../models/Customer');
const ServiceRecord = require('../models/ServiceRecord');

exports.list = async (req, res) => {
  const products = await Product.findAll({ include: [Customer], order: [['createdAt', 'DESC']] });
  res.render('products', { products });
};

exports.newForm = async (req, res) => {
  const customers = await Customer.findAll();
  res.render('addProduct', { customers });
};

exports.create = async (req, res) => {
  const { customerId, productName, brand, serialNumber, purchaseDate, warrantyPeriodMonths } = req.body;
  await Product.create({
    customerId,
    productName,
    brand,
    serialNumber,
    purchaseDate,
    warrantyPeriodMonths
  });
  res.redirect('/products');
};

exports.deleteOne = async (req, res) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.redirect('/products');
};

exports.view = async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: [Customer, ServiceRecord]
  });

  const today = new Date();
  const expiry = new Date(product.warrantyExpiry);
  const underWarranty = expiry >= today;

  res.render('productDetail', { product, underWarranty, expiry: product.warrantyExpiry });
};
