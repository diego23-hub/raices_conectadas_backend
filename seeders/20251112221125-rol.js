'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rol', [
      {
        id: 1,
        nombre: 'admin',
        descripcion: 'Administrador del sistema'
      },
      {
        id: 2,
        nombre: 'viajero',
        descripcion: 'Turista o viajero registrado'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rol', null, {});
  }
};