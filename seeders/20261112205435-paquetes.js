'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'paquete', 
      [
        { 
          id: 1, 
          nombre: "Experiencia Cafetera en Aguadas", 
          precio: 900000, 
          descripcion: "Cuna del pasillo colombiano y tierra de la cultura cafetera, famosa por la calidez de su gente y la tejeduría artesanal del icónico sombrero aguadeño. Vive una experiencia entre fincas cafeteras, talleres interactivos con maestras artesanas y catas de café premium.", 
          duracion: "3 días y 2 noches", 
          duracionDias: 3, 
          incluye: "Alojamiento en finca cafetera, talleres interactivos, catas de café y guía local.", 
          itinerario: "Día 1: Llegada y recibimiento. Día 2: Taller de sombreros y caficultura. Día 3: Despedida.", 
          limitePersonas: 10, 
          idDestino: 1
        },
        { 
          id: 2, 
          nombre: "Escapada Colonial en Barichara", 
          precio: 1200000, 
          descripcion: "Considerado el pueblo más lindo de Colombia, destaca por sus calles empedradas, su arquitectura colonial impecable y su ancestral técnica de construcción en tapia pisada.", 
          duracion: "3 días y 2 noches", 
          duracionDias: 3, 
          incluye: "Alojamiento en hotel boutique, caminata ecológica por el Camino Real y taller de tallado en piedra.", 
          itinerario: "Día 1: Llegada y recorrido colonial. Día 2: Caminata a Guane. Día 3: Taller de piedra y despedida.", 
          limitePersonas: 10, 
          idDestino: 2
        },
        { 
          id: 3, 
          nombre: "Magia Caribeña en Ciénaga", 
          precio: 1050000, 
          descripcion: "Capital del realismo mágico, un destino costero impregnado de historia bananera, arquitectura caribeña y leyendas folclóricas.", 
          duracion: "3 días y 2 noches", 
          duracionDias: 3, 
          incluye: "Alojamiento, tour por la zona bananera y recorrido en lancha por los pueblos palafitos.", 
          itinerario: "Día 1: Bienvenida e historia bananera. Día 2: Paseo en lancha por los palafitos. Día 3: Tiempo libre y salida.", 
          limitePersonas: 10, 
          idDestino: 3
        },
        { 
          id: 4, 
          nombre: "Pasadía Tradicional en Jardín", 
          precio: 300000, 
          descripcion: "Tesoro del suroeste antioqueño que conserva intacta la arquitectura de la colonización paisa, con balcones coloridos y una plaza vibrante.", 
          duracion: "1 día (Pasadía)", 
          duracionDias: 1, 
          incluye: "Transporte desde Medellín, cabalgata, caminata ecológica y entrada a la Cueva del Esplendor.", 
          itinerario: "Día 1: Salida de Medellín, caminata, cabalgata, Cueva del Esplendor y regreso.", 
          limitePersonas: 10, 
          idDestino: 7
        },
        { 
          id: 5, 
          nombre: "Ruta Religiosa y Dulce en Buga", 
          precio: 500000, 
          descripcion: "Uno de los centros religiosos más importantes del país, hogar de la Basílica del Señor de los Milagros y un centro histórico colonial muy bien conservado.", 
          duracion: "2 días y 1 noche", 
          duracionDias: 2, 
          incluye: "Alojamiento, guía turística a la basílica y museos, y cata de dulces típicos.", 
          itinerario: "Día 1: Llegada, visita a la Basílica y museos. Día 2: Ruta del dulce en hacienda y regreso.", 
          limitePersonas: 10, 
          idDestino: 4
        },
        { 
          id: 6, 
          nombre: "Aventura y Tradición en Jericó", 
          precio: 700000, 
          descripcion: "Pueblo de paisajes montañosos espectaculares, famoso por ser la cuna de la Madre Laura y por la fabricación artesanal del tradicional carriel antioqueño.", 
          duracion: "2 días y 1 noche", 
          duracionDias: 2, 
          incluye: "Alojamiento, visita al santuario, taller de marroquinería y experiencia de parapente.", 
          itinerario: "Día 1: Llegada y santuario. Día 2: Taller de carriel, vuelo en parapente y retorno.", 
          limitePersonas: 10, 
          idDestino: 8
        },
        { 
          id: 7, 
          nombre: "Expedición al Páramo en Monguí", 
          precio: 750000, 
          descripcion: "Famoso por sus calles de piedra y arquitectura franciscana, reconocido mundialmente por la fabricación artesanal de balones cosidos a mano.", 
          duracion: "3 días y 2 noches", 
          duracionDias: 3, 
          incluye: "Alojamiento, excursión guiada al páramo de Ocetá y taller de elaboración de balones.", 
          itinerario: "Día 1: Llegada y centro histórico. Día 2: Ascenso al Páramo de Ocetá. Día 3: Taller de balones y salida.", 
          limitePersonas: 10, 
          idDestino: 9
        },
        { 
          id: 8, 
          nombre: "Ruta Fluvial en Honda", 
          precio: 900000, 
          descripcion: "Conocida como la ciudad de los puentes, fue el principal puerto fluvial de la colonia y conserva una arquitectura andaluza única a orillas del río Magdalena.", 
          duracion: "3 días y 2 noches", 
          duracionDias: 3, 
          incluye: "Alojamiento, tour de puentes coloniales y paseo en canoa por el río Magdalena.", 
          itinerario: "Día 1: Llegada y recorrido por el puerto. Día 2: Paseo en canoa y museos. Día 3: Despedida.", 
          limitePersonas: 10, 
          idDestino: 6
        },
        { 
          id: 9, 
          nombre: "Oasis Natural en Playa de Belén", 
          precio: 750000, 
          descripcion: "Un oasis de paz con fachadas blancas y zócalos rojizos, puerta de entrada al impresionante paisaje del Parque Nacional Natural Los Estoraques.", 
          duracion: "3 días y 2 noches", 
          duracionDias: 3, 
          incluye: "Alojamiento y guía especializado para el Parque Nacional Natural Los Estoraques.", 
          itinerario: "Día 1: Llegada y descanso. Día 2: Exploración de Los Estoraques. Día 3: Miradores y salida.", 
          limitePersonas: 10, 
          idDestino: 10 
        },
        { 
          id: 10, 
          nombre: "Escapada Romántica en San Juan Girón", 
          precio: 600000, 
          descripcion: "Monumento nacional caracterizado por calles empedradas, paredes blancas y puentes de calicanto que transportan a la época colonial.", 
          duracion: "2 días y 1 noche", 
          duracionDias: 2, 
          incluye: "Alojamiento, cena romántica privada y recorrido nocturno de mitos y leyendas.", 
          itinerario: "Día 1: Llegada, tarde colonial y cena. Día 2: Ruta del dulce tradicional y retorno.", 
          limitePersonas: 10, 
          idDestino: 13
        },
        { 
          id: 11, 
          nombre: "Filigrana y Magia en Mompox", 
          precio: 1600000, 
          descripcion: "Isla flotante sobre el río Magdalena suspendida en el tiempo, famosa por su música, historia libertaria y la sofisticada técnica artesanal de filigrana en oro y plata.", 
          duracion: "4 días y 3 noches", 
          duracionDias: 4, 
          incluye: "Alojamiento exclusivo, taller de joyería en filigrana y recorrido en bote al atardecer.", 
          itinerario: "Día 1: Llegada y caminata nocturna. Día 2: Taller de filigrana. Día 3: Paseo en bote al atardecer. Día 4: Salida.", 
          limitePersonas: 10, 
          idDestino: 14
        },
        { 
          id: 12, 
          nombre: "Pasadía Histórica en Santa Fe de Antioquia", 
          precio: 200000, 
          descripcion: "Antigua capital del departamento y joya arquitectónica colonial de clima cálido, custodiada por el histórico Puente de Occidente.", 
          duracion: "1 día (Pasadía)", 
          duracionDias: 1, 
          incluye: "Transporte ida y vuelta, recorrido histórico, almuerzo típico y acceso a hostería con piscina.", 
          itinerario: "Día 1: Salida, visita al Puente de Occidente, almuerzo típico, tarde de piscina y retorno.", 
          limitePersonas: 10, 
          idDestino: 16
        },
        { 
          id: 13, 
          nombre: "Ciudad Luz y Valle de la Samaria en Salamina", 
          precio: 900000, 
          descripcion: "Conocida como la Ciudad Luz de Caldas, destaca por su arquitectura de colonización y sus espectaculares trabajos de madera tallada.", 
          duracion: "3 días y 2 noches", 
          duracionDias: 3, 
          incluye: "Alojamiento, recorrido patrimonial y tour en Jeep Willys al Valle de la Samaria.", 
          itinerario: "Día 1: Llegada y arquitectura en madera. Día 2: Excursión al Valle de la Samaria. Día 3: Despedida.", 
          limitePersonas: 10, 
          idDestino: 12
        },
        { 
          id: 14, 
          nombre: "Historia y Café en El Socorro", 
          precio: 750000, 
          descripcion: "Cuna de la Revolución de los Comuneros y de la Independencia de Colombia, llena de monumentos históricos e iglesias imponentes.", 
          duracion: "3 días y 2 noches", 
          duracionDias: 3, 
          incluye: "Alojamiento, tour histórico de los comuneros y catación en hacienda de café orgánico.", 
          itinerario: "Día 1: Llegada y monumentos. Día 2: Senderismo y hacienda cafetera. Día 3: Salida.", 
          limitePersonas: 10, 
          idDestino: 17
        },
        { 
          id: 15, 
          nombre: "Ruta Mutis en Guaduas", 
          precio: 500000, 
          descripcion: "Parte fundamental de la Ruta Mutis y lugar de nacimiento de Policarpa Salavarrieta, con casas de teja de barro y cercanía al histórico Camino Real.", 
          duracion: "2 días y 1 noche", 
          duracionDias: 2, 
          incluye: "Alojamiento, visita a la casa museo de Policarpa y recorrido guiado por miradores naturales.", 
          itinerario: "Día 1: Llegada y recorrido histórico. Día 2: Ruta Mutis, miradores y retorno.", 
          limitePersonas: 10, 
          idDestino: 5
        },
        { 
          id: 16, 
          nombre: "Cultura y Sabor Árabe en Lorica", 
          precio: 900000, 
          descripcion: "Conocida como la Ciudad Antigua y Señorial, mezcla arquitectura republicana y caribeña con influencia sirio-libanesa.", 
          duracion: "3 días y 2 noches", 
          duracionDias: 3, 
          incluye: "Alojamiento, taller de tejido en caña flecha y tour gastronómico de cocina árabe-caribeña.", 
          itinerario: "Día 1: Llegada y arquitectura junto al río Sinú. Día 2: Taller de caña flecha y gastronomía. Día 3: Salida.", 
          limitePersonas: 10, 
          idDestino: 15
        },
        { 
          id: 17, 
          nombre: "Safari y Llanura en Pore", 
          precio: 1200000, 
          descripcion: "Único Pueblo Patrimonio de los Llanos Orientales, famoso por sus ruinas jesuitas y su importancia histórica en la campaña libertadora.", 
          duracion: "3 días y 2 noches", 
          duracionDias: 3, 
          incluye: "Alojamiento, safari llanero con avistamiento de fauna y recorrido guiado por las ruinas jesuitas.", 
          itinerario: "Día 1: Llegada y ruinas históricas. Día 2: Safari llanero y atardecer en la sabana. Día 3: Salida.", 
          limitePersonas: 10, 
          idDestino: 11
        },
        { 
          id: 18, 
          nombre: "Joya Colonial en Villa de Leyva", 
          precio: 1000000, 
          descripcion: "Joya colonial de Boyacá, famosa por su inmensa plaza principal empedrada, sus casas blancas y su riqueza paleontológica.", 
          duracion: "3 días y 2 noches", 
          duracionDias: 3, 
          incluye: "Alojamiento en hotel colonial, visita al Museo El Fósil, entrada a la Casa Terracota y recorrido por los Pozos Azules.", 
          itinerario: "Día 1: Llegada, plaza principal y recorrido. Día 2: Museo El Fósil, Casa Terracota y Pozos Azules. Día 3: Observatorio y salida.", 
          limitePersonas: 10, 
          idDestino: 18
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'paquete', 
      null, {});
  }
};