'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Certificates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      aadhar: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      blood_bank_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BloodBanks',
          key: 'id'
        }
      },
      volume: {
        type: Sequelize.FLOAT
      },
      blood_type: {
        type: Sequelize.ENUM('A_positive', 'A_negative', 'B_positive', 'B_negative', 'AB_positive', 'AB_negative', 'O_positive', 'O_negative')
      },
      date_time: {
        type: Sequelize.DATE
      },
      place: {
        type: Sequelize.STRING
      },
      pdf: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Certificates');
  }
};