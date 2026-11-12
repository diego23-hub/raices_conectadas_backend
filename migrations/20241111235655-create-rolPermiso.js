'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "rolPermiso",
      {
        idRol:{
          type: Sequelize.INTEGER,
          allowNull:false,
          primaryKey: true,
          references:{
            model:'rol',
            key:'id'
          }
        },
        idPermiso:{
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references:{
            model:'permiso',
            key:'id'
          }
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(
      "rolPermiso"
    );
  }
};
