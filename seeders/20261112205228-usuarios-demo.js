'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('Admin123*', 10);

    await queryInterface.bulkInsert(
      'usuario', 
      [
        {
          id: 1,
          idTipoDoc: 1, 
          numDoc: 1000000000,
          nombres: 'Administrador',
          apellidos: 'Principal',
          telefono: '3000000000',
          correo: 'admin@correo.com',
          contrasena: hashedPassword,
          idRol: 1
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'usuario',
       { correo: 'admin@correo.com' }, {});
  }
};