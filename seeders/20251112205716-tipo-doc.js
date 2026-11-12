'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tipoDoc', 
      [
        { 
          id: 1, 
          nombre: 'CC', 
          aplicaIva: true
        },
        { 
          id: 2, 
          nombre: 'TI', 
          aplicaIva: true
        },
        { 
          id: 3, 
          nombre: 'CE', 
          aplicaIva: false
        },
        { 
          id: 4, 
          nombre: 'Pasaporte', 
          aplicaIva: false
        }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'tipoDoc', 
      null, {});
  }
};