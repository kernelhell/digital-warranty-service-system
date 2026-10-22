require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    retry: {
      max: 10,
      match: [/ECONNREFUSED/, /ETIMEDOUT/],
      backoffBase: 2000,
      backoffExponent: 1.2
    }
  }
);

module.exports = sequelize;
