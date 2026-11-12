'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "notificacion",
      {
        id:{
          type: Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey:true
        },
        idReserva:{
          type: Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:'reserva',
            key:'id'
          }
        },
        idProveedor:{
          type: Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:'proveedor',
            key:'id'
          }
        },
        estado:{
          type: Sequelize.STRING,
          allowNull: false
        },
        fechaCreacion:{
          type: Sequelize.DATE,
          allowNull:false,
          defaultValue: Sequelize.NOW
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(
      "notificacion"
    );
  }
};
