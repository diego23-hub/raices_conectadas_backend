'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tipoDestino', 
      [
        { 
          id: 1, 
          nombre: 'Arquitectónico'
        },
        { id: 2, 
          nombre: 'Inmaterial'
        },
        { id: 3, 
          nombre: 'Gastronómico'
        }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'tipoDestino', 
      null, {});
  }
};