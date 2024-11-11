'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BloodBank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BloodBank.hasMany(models.Certificate,{
        foreignKey:'blood_bank_id'
      })
     
    }
  }
  BloodBank.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    phone: DataTypes.BIGINT(10),
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BloodBank',
  });
  return BloodBank;
};