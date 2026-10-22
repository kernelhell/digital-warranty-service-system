const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Customer = require('./Customer');

const Product = sequelize.define('Product', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  purchaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  warrantyPeriodMonths: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 12
  },
  warrantyExpiry: {
    type: DataTypes.VIRTUAL,
    get() {
      const purchase = new Date(this.getDataValue('purchaseDate'));
      const months = this.getDataValue('warrantyPeriodMonths') || 0;
      purchase.setMonth(purchase.getMonth() + months);
      return purchase.toISOString().split('T')[0];
    }
  }
}, {
  tableName: 'products',
  timestamps: true
});

// A Customer can own many Products
Customer.hasMany(Product, { foreignKey: 'customerId', onDelete: 'CASCADE' });
Product.belongsTo(Customer, { foreignKey: 'customerId' });

module.exports = Product;
