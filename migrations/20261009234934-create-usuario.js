'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "usuario",
      {
        id:{
          type: Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey:true
        },
        idTipoDoc:{
          type: Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:'tipoDoc',
            key:'id'
          }
        },
        numDoc:{
          type: Sequelize.INTEGER,
          allowNull:false
        },
        nombres:{
          type: Sequelize.STRING,
          allowNull:false
        },
        apellidos:{
          type: Sequelize.STRING,
          allowNull:false
        },
        telefono:{
          type: Sequelize.STRING,
          allowNull:false
        },
        correo:{
          type: Sequelize.STRING,
          allowNull:false,
          unique:true
        },
        contrasena:{
          type: Sequelize.STRING,
          allowNull:false
        },
        idRol:{
          type: Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:'rol',
            key: 'id'
          }
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(
      "usuario"
    );
  }
};
