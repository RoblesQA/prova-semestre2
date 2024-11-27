const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Job = require('./Job');

const Payment = sequelize.define('Payment', {
  operationDate: DataTypes.DATE,
  paymentValue: DataTypes.DOUBLE,
});

Payment.belongsTo(Job, { foreignKey: 'jobId' });

module.exports = Payment;
