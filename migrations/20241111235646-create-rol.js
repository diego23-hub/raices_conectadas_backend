'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "rol",
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
        descripcion:{
          type: Sequelize.TEXT,
          allowNull: false
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(
      "rol"
    );
  }
};
