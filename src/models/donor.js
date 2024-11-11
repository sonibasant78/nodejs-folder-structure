'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Donor.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    phone: {
      type: DataTypes.BIGINT(10),
      allowNull: false,
    },
    aadhar: {
      type: DataTypes.BIGINT(12),
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    token: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    blood_type: {
      type: DataTypes.ENUM('A_positive', 'A_negative', 'B_positive', 'B_negative', 'AB_positive', 'AB_negative', 'O_positive', 'O_negative')
    },
    dob: {
      type: DataTypes.DATE
    },
    gender: {
      type: DataTypes.STRING
    },
    weight: {
      type: DataTypes.FLOAT
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Donor',
  });
  return Donor;
};