'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BloodStocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blood_bank_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BloodBanks',
          key: 'id'
        }
      },
      A_positive: {
        type: Sequelize.FLOAT
      },
      A_negative: {
        type: Sequelize.FLOAT
      },
      B_positive: {
        type: Sequelize.FLOAT
      },
      B_negative: {
        type: Sequelize.FLOAT
      },
      AB_positive: {
        type: Sequelize.FLOAT
      },
      AB_negative: {
        type: Sequelize.FLOAT
      },
      O_positive: {
        type: Sequelize.FLOAT
      },
      O_negative: {
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
    await queryInterface.dropTable('BloodStocks');
  }
};