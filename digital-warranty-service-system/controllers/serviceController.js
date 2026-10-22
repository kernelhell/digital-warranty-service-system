const ServiceRecord = require('../models/ServiceRecord');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

exports.list = async (req, res) => {
  const services = await ServiceRecord.findAll({
    include: [{ model: Product, include: [Customer] }],
    order: [['createdAt', 'DESC']]
  });
  res.render('services', { services });
};

exports.newForm = async (req, res) => {
  const products = await Product.findAll({ include: [Customer] });
  res.render('addService', { products, preselectedProductId: req.query.productId || '' });
};

exports.create = async (req, res) => {
  const { productId, serviceDate, issueDescription, resolution, technicianName, serviceCost, status } = req.body;
  await ServiceRecord.create({
    productId,
    serviceDate,
    issueDescription,
    resolution,
    technicianName,
    serviceCost: serviceCost || 0,
    status: status || 'Pending'
  });
  res.redirect('/services');
};

exports.deleteOne = async (req, res) => {
  await ServiceRecord.destroy({ where: { id: req.params.id } });
  res.redirect('/services');
};
