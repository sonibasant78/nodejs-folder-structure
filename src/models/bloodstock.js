
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BloodStock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      console.log("models::",models)
      // define association here
    }
  }
  BloodStock.init({
    blood_bank_id: DataTypes.INTEGER,
    A_positive: DataTypes.FLOAT,
    A_negative: DataTypes.FLOAT,
    B_positive: DataTypes.FLOAT,
    B_negative: DataTypes.FLOAT,
    AB_positive: DataTypes.FLOAT,
    AB_negative: DataTypes.FLOAT,
    O_positive: DataTypes.FLOAT,
    O_negative: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'BloodStock',
  });
  return BloodStock;
};