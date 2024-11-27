const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Profile = require('./Profile');

const Deposit = sequelize.define('Deposit', {
  operationDate: DataTypes.DATE,
  depositValue: DataTypes.DOUBLE,
});

Deposit.belongsTo(Profile, { foreignKey: 'clientId' });

module.exports = Deposit;
