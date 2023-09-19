/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const {
  TypeMasterInitialValues,
  generateSQLInserts,
} = require('../dbConstants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    let query = generateSQLInserts(TypeMasterInitialValues);
    await queryInterface.sequelize.query(query);
  },

  async down(queryInterface) {
    let query = generateSQLDeletes(TypeMasterInitialValues);
    await queryInterface.sequelize.query(query);
  },
};
