'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Certificate.belongsTo(models.BloodBank,{
        foreignKey:'blood_bank_id'
      })
    }
  }
  Certificate.init({
    aadhar: DataTypes.BIGINT,
    blood_bank_id: DataTypes.INTEGER,
    volume: DataTypes.FLOAT,
    blood_type: DataTypes.ENUM('A_positive', 'A_negative', 'B_positive', 'B_negative', 'AB_positive', 'AB_negative', 'O_positive', 'O_negative'),
    date_time: DataTypes.DATE,
    place: DataTypes.STRING,
    name: DataTypes.STRING,
    pdf:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Certificate',
  });
  return Certificate;
};