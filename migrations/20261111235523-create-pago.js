'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "pago",
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
            key: 'id'
          }
        },
        idMetodoPago:{
          type: Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:'metodoPago',
            key: 'id'
          }
        },
        referencia:{
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        monto:{
          type: Sequelize.DECIMAL(12, 2),
          allowNull:false,
        },
        fecha:{
          type: Sequelize.DATE,
          allowNull: false
        },
        estado:{
          type: Sequelize.STRING,
          allowNull: false
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(
      "pago"
    );
  }
};
