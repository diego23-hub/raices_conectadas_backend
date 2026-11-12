'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'metodoPago', 
      [
        { 
          id: 1, 
          nombre: 'Tarjeta'
        },
        { 
          id: 2, 
          nombre: 'PSE'
        },
        { 
          id: 3, 
          nombre: 'Nequi'
        }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'metodoPago', 
      null, {});
  }
};