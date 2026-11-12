'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "proveedor",
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
        ubicacion:{
          type: Sequelize.TEXT,
          allowNull: false
        },
        descripcion:{
          type: Sequelize.TEXT,
          allowNull: false
        },
        telefono:{
          type: Sequelize.STRING,
          allowNull: false
        },
        correo:{
          type: Sequelize.STRING,
          allowNull: false
        },
        idDestino:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:'destino',
            key:'id'
          }
        },
        idTipoProveedor:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:'tipoProveedor',
            key:'id'
          }
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(
      "proveedor"
    );
  }
};
