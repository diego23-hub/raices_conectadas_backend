'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "tipoDoc",
      {
        id:{
          type: Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey:true
        },
        nombre:{
          type: Sequelize.STRING,
          allowNull: false
        },
        aplicaIva:{
          type: Sequelize.BOOLEAN,
          allowNull:false
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(
      "tipoDoc"
    );
  }
};
