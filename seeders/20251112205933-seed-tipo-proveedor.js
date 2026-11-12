'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tipoProveedor', 
      [
        { 
          id: 1, 
          nombre: 'Hotel'
        },
        { 
          id: 2, 
          nombre: 'Transporte' 
        },
        { 
          id: 3, 
          nombre: 'Guía'
        },
        { 
          id: 4, 
          nombre: 'Restaurante' 
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'tipoProveedor', 
      null, {});
  }
};