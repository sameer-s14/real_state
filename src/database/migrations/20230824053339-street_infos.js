'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('street_infos', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      property_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      street_width: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      position: {
        type: Sequelize.BIGINT,
      },
      facing_type_id: {
        type: Sequelize.BIGINT,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('street_infos');
  },
};
