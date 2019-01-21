const Sequelize = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: "b54utghgafq6udeftzfy-mysql.services.clever-cloud.com",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  
  module.exports = sequelize;
  