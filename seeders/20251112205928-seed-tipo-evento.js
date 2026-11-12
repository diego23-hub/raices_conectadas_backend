'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tipoEvento', 
      [
        { 
          id: 1, 
          nombre: 'Cultural'
        },
        { 
          id: 2, 
          nombre: 'Ambiental'
        },
        { 
          id: 3, 
          nombre: 'Religioso'
        },
        { 
          id: 4, 
          nombre: 'Histórico'
        },
        { 
          id: 5, 
          nombre: 'Gastronómico'
        },
        { 
          id: 6, 
          nombre: 'Artesanal' 
        },
        { 
          id: 7, 
          nombre: 'Ecoturístico'
        },
        { 
          id: 8, 
          nombre: 'Folclórico'
        },
        { 
          id: 9, 
          nombre: 'Recreativo'
        },
        { 
          id: 10, 
          nombre: 'Tradicional'
        },
        { 
          id: 11, 
          nombre: 'Deportivo'
        }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'tipoEvento', 
      null, {});
  }
};