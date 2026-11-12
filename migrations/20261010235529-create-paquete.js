'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "paquete",
      {
        id:{
          type: Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey:true
        },
        nombre:{
          type: Sequelize.STRING,
          allowNull:false,
        },
        precio:{
          type: Sequelize.DECIMAL(12, 2),
          allowNull:false,
        },
        descripcion:{
          type: Sequelize.TEXT,
          allowNull: false
        },
        duracion:{
          type: Sequelize.STRING,
          allowNull:false,
        },
        duracionDias:{
          type: Sequelize.INTEGER,
          allowNull: false
        },
        incluye:{
          type: Sequelize.TEXT,
          allowNull: false
        },
        itinerario:{
          type: Sequelize.TEXT,
          allowNull:false
        },
        limitePersonas:{
          type: Sequelize.INTEGER,
          allowNull:false
        },
        idDestino:{
          type:Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:'destino',
            key:'id'
          }
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(
      "paquete"
    );
  }
};
