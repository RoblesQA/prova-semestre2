const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('Profile', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  profession: DataTypes.STRING,
  balance: DataTypes.DOUBLE,
  type: DataTypes.STRING,
});

module.exports = Profile;
