'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "evento",
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
        fechaInicio:{
          type: Sequelize.DATEONLY,
          allowNull:false
        },
        fechaFin:{
          type: Sequelize.DATEONLY,
          allowNull:false
        },
        idDestino:{
          type: Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:'destino',
            key:'id'
          }
        },
        idTipoEvento:{
          type: Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:'tipoEvento',
            key:'id'
          }
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(
      "evento"
    );
  }
};
