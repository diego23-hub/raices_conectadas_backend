'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "reserva",
      {
        id:{
          type: Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey:true
        },
        idUsuario:{
          type: Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:'usuario',
            key:'id'
          }
        },
        idPaquete:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:'paquete',
            key:'id'
          }
        },
        fechaInicio:{
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        fechaFinal:{
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        cantidadPersonas:{
          type: Sequelize.INTEGER,
          allowNull: false
        },
        subtotal:{
          type: Sequelize.DECIMAL(12, 2),
          allowNull: false,
        },
        iva:{
          type: Sequelize.DECIMAL(12, 2),
          allowNull: false,
        },
        total:{
          type: Sequelize.DECIMAL(12, 2),
          allowNull:false
        },
        adultos:{
          type: Sequelize.INTEGER,
          allowNull:false
        },
        bebes:{
          type: Sequelize.INTEGER,
          allowNull:false
        },
        jovenes:{
          type: Sequelize.INTEGER,
          allowNull:false
        },
        ninos:{
          type: Sequelize.INTEGER,
          allowNull:false
        },
        estado:{
          type: Sequelize.STRING,
          allowNull:false
        },
        numSeguimiento:{
          type: Sequelize.STRING,
          allowNull:false
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(
      "reserva"
    );
  }
};
