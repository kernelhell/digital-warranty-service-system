const Customer = require('../models/Customer');
const Product = require('../models/Product');

exports.list = async (req, res) => {
  const customers = await Customer.findAll({ order: [['createdAt', 'DESC']] });
  res.render('customers', { customers });
};

exports.create = async (req, res) => {
  const { name, email, phone, address } = req.body;
  await Customer.create({ name, email, phone, address });
  res.redirect('/customers');
};

exports.deleteOne = async (req, res) => {
  await Customer.destroy({ where: { id: req.params.id } });
  res.redirect('/customers');
};

exports.view = async (req, res) => {
  const customer = await Customer.findByPk(req.params.id, {
    include: [Product]
  });
  res.render('customerDetail', { customer });
};
