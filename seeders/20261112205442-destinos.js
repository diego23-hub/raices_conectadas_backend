'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'destino', 
      [
        { 
          id: 1, 
          nombre: "Aguadas, Caldas", 
          descripcion: "Cuna del pasillo colombiano y tierra de la tejeduría artesanal del icónico sombrero aguadeño.", 
          idTipoDestino: 2
        },
        { 
          id: 2, 
          nombre: "Barichara, Santander", 
          descripcion: "Considerado uno de los pueblos más lindos de Colombia, destaca por sus construcciones en piedra labrada y calles empedradas.", 
          idTipoDestino: 1 
        },
        { 
          id: 3, 
          nombre: "Ciénaga, Magdalena", 
          descripcion: "Capital del realismo mágico, impregnada de historia bananera, arquitectura caribeña y leyendas folclóricas.", 
          idTipoDestino: 1
        },
        { 
          id: 4, 
          nombre: "Guadalajara de Buga, Valle del Cauca", 
          descripcion: "Hogar de la Basílica del Señor de los Milagros y reconocida por su tradicional ruta de dulces típicos y haciendas.", 
          idTipoDestino: 3
        },
        { 
          id: 5, 
          nombre: "Guaduas, Cundinamarca", 
          descripcion: "Parte fundamental de la Ruta Mutis y lugar de nacimiento de Policarpa Salavarrieta, con casas coloniales de teja de barro.", 
          idTipoDestino: 1
        },
        { 
          id: 6, 
          nombre: "Honda, Tolima", 
          descripcion: "Ciudad de los puentes y antiguo puerto fluvial a orillas del río Magdalena, famosa por su plato típico el viudo de capaz.", 
          idTipoDestino: 3
        },
        { 
          id: 7, 
          nombre: "Jardín, Antioquia", 
          descripcion: "Tesoro del suroeste antioqueño que conserva intacta la arquitectura de la colonización paisa con balcones coloridos.", 
          idTipoDestino: 1
        },
        {
           id: 8, 
           nombre: "Jericó, Antioquia", 
           descripcion: "Pueblo de arraigo religioso y cafetero, cuna de la Madre Laura y famoso por la fabricación artesanal del carriel antioqueño.", 
           idTipoDestino: 2
          },
        { 
          id: 9, 
          nombre: "Monguí, Boyacá", 
          descripcion: "Famoso por sus calles de piedra, arquitectura franciscana y la reconocida fabricación artesanal de balones de fútbol cosidos a mano.", 
          idTipoDestino: 2
        },
        { 
          id: 10, 
          nombre: "Playa de Belén, Norte de Santander", 
          descripcion: "Oasis de paz con fachadas blancas y zócalos rojizos, puerta de entrada al Parque Nacional Natural Los Estoraques.", 
          idTipoDestino: 1
        },
        { 
          id: 11, 
          nombre: "Pore, Casanare", 
          descripcion: "Único Pueblo Patrimonio de los Llanos Orientales, célebre por sus ruinas jesuitas y su gran valor en la campaña libertadora.", 
          idTipoDestino: 1
        },
        { 
          id: 12, 
          nombre: "Salamina, Caldas", 
          descripcion: "Ciudad Luz de Caldas, destacada por su arquitectura de colonización antioqueña y sus sobresalientes trabajos de madera tallada.", 
          idTipoDestino: 1
        },
        { 
          id: 13, 
          nombre: "San Juan Girón, Santander", 
          descripcion: "Monumento nacional caracterizado por calles empedradas, paredes blancas y puentes de calicanto de época colonial.", 
          idTipoDestino: 1
        },
        { 
          id: 14, 
          nombre: "Santa Cruz de Mompox, Bolívar", 
          descripcion: "Isla fluvial sobre el río Magdalena, joya arquitectónica y cuna de la sofisticada técnica de orfebrería en filigrana.", 
          idTipoDestino: 2
        },
        { id: 15, 
          nombre: "Santa Cruz de Lorica, Córdoba", 
          descripcion: "Ciudad señorial que mezcla arquitectura republicana y caribeña con una exquisita tradición culinaria de fusión árabe.", 
          idTipoDestino: 3
        },
        { 
          id: 16, 
          nombre: "Santa Fe de Antioquia, Antioquia", 
          descripcion: "Antigua capital departamental de clima cálido, conocida por su arquitectura colonial, calles de piedra y el Puente de Occidente.", 
          idTipoDestino: 1
        },
        { id: 17, 
          nombre: "El Socorro, Santander", 
          descripcion: "Cuna de la Revolución de los Comuneros y de la Independencia de Colombia, repleta de monumentos históricos e iglesias.", 
          idTipoDestino: 1
        },
        { id: 18, 
          nombre: "Villa de Leyva, Boyacá", 
          descripcion: "Famoso por su inmensa plaza principal empedrada, edificios coloniales bien preservados y su cercanía a yacimientos fósiles.", 
          idTipoDestino: 1
        }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'destino', 
      null, {});
  }
};