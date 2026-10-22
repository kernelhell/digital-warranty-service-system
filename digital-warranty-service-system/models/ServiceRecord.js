const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

const ServiceRecord = sequelize.define('ServiceRecord', {
  serviceDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  issueDescription: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  resolution: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  technicianName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  serviceCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0.0
  },
  status: {
    type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
    defaultValue: 'Pending'
  }
}, {
  tableName: 'service_records',
  timestamps: true
});

// A Product can have many ServiceRecords
Product.hasMany(ServiceRecord, { foreignKey: 'productId', onDelete: 'CASCADE' });
ServiceRecord.belongsTo(Product, { foreignKey: 'productId' });

module.exports = ServiceRecord;
