'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'proveedor', 
      [
        { 
          id: 1, 
          nombre: "DANN CARLTON", 
          ubicacion: "Santa Fe de Antioquia", 
          descripcion: "Una experiencia inolvidable y única. ¡No te la pierdas!", 
          telefono: "3000123", 
          correo: "dann@santafe.com", 
          idDestino: 16, 
          idTipoProveedor: 1
        },
        { 
          id: 2, 
          nombre: "Hostería El Colonial", 
          ubicacion: "Barichara, Santander", 
          descripcion: "Disfruta de la arquitectura colonial con todas las comodidades modernas y una vista excepcional.", 
          telefono: "3104567890", 
          correo: "reservas@elcolonial.com", 
          idDestino: 2, 
          idTipoProveedor: 1
        },
        { 
          id: 3, 
          nombre: "Transportes Paisa Express", 
          ubicacion: "Medellín - Jardín", 
          descripcion: "Transporte seguro y cómodo en camperos y vans turísticas hacia el suroeste antioqueño.", 
          telefono: "3119876543", 
          correo: "info@paisaexpress.com", 
          idDestino: 7, 
          idTipoProveedor: 2 
        },
        { 
          id: 4, 
          nombre: "Guías Locales Mompox Aventura", 
          ubicacion: "Santa Cruz de Mompox, Bolívar", 
          descripcion: "Expertos en historia local, recorrido de filigrana y paseos fluviales por el río Magdalena.", 
          telefono: "3201234567", 
          correo: "contacto@mompoxaventura.co", 
          idDestino: 14, 
          idTipoProveedor: 3 
        },
        { 
          id: 5, 
          nombre: "Hotel Boutique La Candelaria", 
          ubicacion: "Jericó, Antioquia", 
          descripcion: "Un refugio de paz en medio de las montañas con atención personalizada y café artesanal.", 
          telefono: "3127894561", 
          correo: "contacto@lacandelaria.com", 
          idDestino: 8, 
          idTipoProveedor: 1
        },
        { 
          id: 6, 
          nombre: "Jeeps Willys Tradition", 
          ubicacion: "Salamina, Caldas", 
          descripcion: "Recorridos tradicionales en el icónico Jeep Willys hacia el Valle de la Samaria.", 
          telefono: "3145678912", 
          correo: "willystradicion@gmail.com", 
          idDestino: 12, 
          idTipoProveedor: 2
        },
        { 
          id: 7, 
          nombre: "Senderos del Páramo Guías", 
          ubicacion: "Monguí, Boyacá", 
          descripcion: "Acompañamiento profesional y seguro para trekking en el impresionante Páramo de Ocetá.", 
          telefono: "3156781234", 
          correo: "guias@paramoceta.com", 
          idDestino: 9, 
          idTipoProveedor: 3
        },
        { 
          id: 8, 
          nombre: "Transportes del Caribe", 
          ubicacion: "Ciénaga, Magdalena", 
          descripcion: "Lanchas y transporte terrestre especializado para los recorridos de la Ciénaga Grande.", 
          telefono: "3167892345", 
          correo: "logistica@caribetrans.com", 
          idDestino: 3, 
          idTipoProveedor: 2
        },
        { 
          id: 9, 
          nombre: "Hacienda El Paraíso Guaduas", 
          ubicacion: "Guaduas, Cundinamarca", 
          descripcion: "Alojamiento histórico colonial rodeado de naturaleza e historia de la Ruta Mutis.", 
          telefono: "3178901234", 
          correo: "reservas@hotelguaduas.com", 
          idDestino: 5, 
          idTipoProveedor: 1
        },
        { 
          id: 10, 
          nombre: "Expediciones Santander Aventura", 
          ubicacion: "Barichara, Santander", 
          descripcion: "Guías expertos en senderismo por caminos reales y patrimonio histórico de Santander.", 
          telefono: "3189012345", 
          correo: "contacto@santanderaventura.co", 
          idDestino: 2, 
          idTipoProveedor: 3
        },
        { 
          id: 11, 
          nombre: "Transportes y Excursiones Tolima", 
          ubicacion: "Honda, Tolima", 
          descripcion: "Flota de vehículos cómodos para traslados y tours por la ciudad de los puentes.", 
          telefono: "3190123456", 
          correo: "info@transportestolima.com", 
          idDestino: 6, 
          idTipoProveedor: 2
        },
        { 
          id: 12, 
          nombre: "Hotel Boutique Mompox Colonial", 
          ubicacion: "Santa Cruz de Mompox, Bolívar", 
          descripcion: "Vive la magia del río Magdalena en una casona colonial restaurada con todo el confort.", 
          telefono: "3201122334", 
          correo: "info@mompoxcolonial.com", 
          idDestino: 14, 
          idTipoProveedor: 1
        },
        { 
          id: 13, 
          nombre: "Guías del Páramo Monguí", 
          ubicacion: "Monguí, Boyacá", 
          descripcion: "Acompañamiento especializado para descubrir la belleza y leyendas del Páramo de Ocetá.", 
          telefono: "3212233445", 
          correo: "paramomongui@gmail.com", 
          idDestino: 9, 
          idTipoProveedor: 3
        },
        { 
          id: 14, 
          nombre: "Jeeps Cafeteros Salamina", 
          ubicacion: "Salamina, Caldas", 
          descripcion: "Tradicional servicio de transporte en Willys hacia el Valle de la Samaria y fincas cafeteras.", 
          telefono: "3223344556", 
          correo: "willyssalamina@gmail.com", 
          idDestino: 12, 
          idTipoProveedor: 2
        },
        { 
          id: 15, 
          nombre: "Hotel Campestre Los Estoraques", 
          ubicacion: "Playa de Belén, Norte de Santander", 
          descripcion: "Descanso y tranquilidad cerca de las formaciones rocosas únicas del parque natural.", 
          telefono: "3234455667", 
          correo: "reservas@losestoraques.com", 
          idDestino: 10, 
          idTipoProveedor: 1
        },
        { 
          id: 16, 
          nombre: "Guías Patrimoniales Aguadas", 
          ubicacion: "Aguadas, Caldas", 
          descripcion: "Recorridos guiados por los talleres de tejido del sombrero aguadeño y la zona cafetera.", 
          telefono: "3245566778", 
          correo: "aguadaspatrimonio@colombia.co", 
          idDestino: 1, 
          idTipoProveedor: 3
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'proveedor', 
      null, {});
  }
};