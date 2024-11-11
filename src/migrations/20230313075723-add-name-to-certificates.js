module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('certificates', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('certificates', 'name');
  }
};