/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

/** @type {import('sequelize-cli').Migration} */
const stateData = require('../dbConstants/states.json');
module.exports = {
  async up(queryInterface) {
    // inserting states
    const values = [];
    stateData.forEach((element) => {
      values.push(`('${element.name}', '${element.state_code}')`);
    });
    const sqlInsert = `
        INSERT INTO states (name,code) VALUES
        ${values.join(',\n')};
      `;
    await queryInterface.sequelize.query(sqlInsert);

    // inserting cities
    const cityValues = [];
    stateData.forEach((element) => {
      element?.cities?.map((city) => {
        cityValues.push(
          `('${city}',(SELECT id FROM states WHERE name = '${element?.name}' AND code ='${element.state_code}') )`,
        );
      });
    });
    const sqlInsertCity = `
        INSERT INTO cities (name,state_id)
        VALUES ${cityValues.join(',\n')};
      `;
    await queryInterface.sequelize.query(sqlInsertCity);
  },

  async down() {
    // do nothing
  },
};
