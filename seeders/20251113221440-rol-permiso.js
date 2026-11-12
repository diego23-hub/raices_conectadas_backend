'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Obtenemos dinámicamente los IDs desde las tablas de la base de datos para evitar desajustes
    const [roles] = await queryInterface.sequelize.query('SELECT id, nombre FROM rol;');
    const [permisos] = await queryInterface.sequelize.query('SELECT id, nombre FROM permiso;');

    const rolAdmin = roles.find(r => r.nombre === 'admin');
    const rolViajero = roles.find(r => r.nombre === 'viajero');

    const asociaciones = [];

    permisos.forEach(permiso => {
      // Si el permiso pertenece al viajero o al admin, los asociamos según corresponda
      if (permiso.nombre.startsWith('reserva:') || permiso.nombre.startsWith('pago:')) {
        if (rolViajero) {
          asociaciones.push({ idRol: rolViajero.id, idPermiso: permiso.id });
        }
      }
      if (rolAdmin) {
        asociaciones.push({ idRol: rolAdmin.id, idPermiso: permiso.id });
      }
    });

    if (asociaciones.length > 0) {
      await queryInterface.bulkInsert('rolPermiso', asociaciones, {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rolPermiso', null, {});
  }
};