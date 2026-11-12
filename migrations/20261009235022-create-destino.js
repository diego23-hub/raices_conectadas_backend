'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "destino",
      {
        id:{
          type: Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey:true
        },
        nombre:{
          type: Sequelize.STRING,
          allowNull:false
        },
        descripcion:{
          type: Sequelize.TEXT,
          allowNull:false
        },
        idTipoDestino:{
          type: Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:'tipoDestino',
            key:'id'
          }
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(
      "destino"
    );
  }
};
