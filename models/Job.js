const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Contract = require('./Contract');

const Job = sequelize.define('Job', {
  description: DataTypes.STRING,
  price: DataTypes.DOUBLE,
  paid: DataTypes.BOOLEAN,
  paymentDate: DataTypes.DATE,
});

Job.belongsTo(Contract, { foreignKey: 'contractId' });

module.exports = Job;
