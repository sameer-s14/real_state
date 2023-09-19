'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('property_attributes', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      property_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      furnishing_type_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      facing_type_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      room_type_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      unit_type_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      currency_type_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      possession_type_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      ownership_type_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      transaction_type_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      built_up_area: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      carpet_area: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      residence_type_id: {
        type: new Sequelize.INTEGER(),
        allowNull: true,
      },
      no_of_bedrooms: {
        type: new Sequelize.INTEGER(),
        allowNull: true,
      },
      no_of_bathrooms: {
        type: new Sequelize.INTEGER(),
        allowNull: true,
      },
      no_of_living_rooms: {
        type: new Sequelize.INTEGER(),
        allowNull: true,
      },
      no_of_guestrooms: {
        type: new Sequelize.INTEGER(),
        allowNull: true,
      },
      capacity_per_room: {
        type: new Sequelize.INTEGER(),
        allowNull: true,
      },
      no_of_floors: {
        type: new Sequelize.INTEGER(),
        allowNull: true,
      },
      floor_number: {
        type: new Sequelize.INTEGER(),
        allowNull: true,
      },
      sale_price: {
        type: new Sequelize.DOUBLE(),
        allowNull: true,
      },
      expected_rent: {
        type: new Sequelize.DOUBLE(),
        allowNull: true,
      },
      security_deposit_amount: {
        type: new Sequelize.DOUBLE(),
        allowNull: true,
      },
      is_rent_negotiable: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      possession_date: {
        type: new Sequelize.DATE(),
        allowNull: true,
      },
      completion_year: {
        type: new Sequelize.STRING(100),
        allowNull: true,
      },
      yearly_charges: {
        type: new Sequelize.DOUBLE(),
        allowNull: true,
      },
      no_of_parkings: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      no_of_apartments: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lease_contract_end_date: {
        type: new Sequelize.DATE(),
        allowNull: true,
      },
      lease_amount: {
        type: new Sequelize.DOUBLE(),
        allowNull: true,
      },
      no_of_street: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      water_meter: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      electricity_meter: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      no_of_office: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      land_depth: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      land_length: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      no_of_opening: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('property_attributes');
  },
};
