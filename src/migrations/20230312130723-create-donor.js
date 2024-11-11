'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Donors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phone: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      aadhar: {
        type: Sequelize.STRING(12),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      email:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      blood_type: {
        type: Sequelize.ENUM('A_positive', 'A_negative', 'B_positive', 'B_negative', 'AB_positive', 'AB_negative', 'O_positive', 'O_negative')
      },
      dob: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Donors');
  }
};