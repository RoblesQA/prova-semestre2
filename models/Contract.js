const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Profile = require('./Profile');

const Contract = sequelize.define('Contract', {
  terms: DataTypes.STRING,
  status: DataTypes.STRING,
});

Contract.belongsTo(Profile, { as: 'Client', foreignKey: 'clientId' });
Contract.belongsTo(Profile, { as: 'Contractor', foreignKey: 'contractorId' });

module.exports = Contract;
