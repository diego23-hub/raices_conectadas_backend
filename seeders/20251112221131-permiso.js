'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const entidades = ['destino', 'evento', 'paquete', 'proveedor'];
    
    // El admin puede crear, consultar, editar y eliminar las entidades, más gestión de usuarios y reservas
    const permisosAdmin = [
      ...entidades.flatMap((e) => ['crear', 'consultar', 'editar', 'eliminar'].map((accion) => `${e}:${accion}`)),
      'usuario:listar', 'usuario:consultar', 'usuario:editar', 'usuario:eliminar',
      'rol:consultar',
      'reserva:listar'
    ];

    // El usuario/viajero puede consultar/ver las entidades, además de sus reservas y pagos
    const permisosViajero = [
      ...entidades.flatMap((e) => [`${e}:consultar`]),
      'reserva:crear', 'reserva:consultar', 'reserva:editar', 'reserva:cancelar', 'pago:procesar'
    ];

    const todosPermisos = [...new Set([...permisosAdmin, ...permisosViajero])];

    const registros = todosPermisos.map((nombre, index) => ({
      id: index + 1,
      nombre,
      descripcion: `Permiso para ${nombre}`
    }));

    await queryInterface.bulkInsert('permiso', registros, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permiso', null, {});
  }
};