'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'evento', 
      [
        { 
          id: 1, 
          idDestino: 1, 
          nombre: "Festival Nacional del Pasillo Colombiano - Aguadas", 
          idTipoEvento: 1, 
          descripcion: "Encuentro de músicos, compositores y bailarines de pasillo.", 
          fechaInicio: "2026-08-14", 
          fechaFin: "2026-08-17"
        },
        { 
          id: 2, 
          idDestino: 2, 
          nombre: "Festiver (Festival de Cine Verde) - Barichara", 
          idTipoEvento: 2, 
          descripcion: "Festival dedicado al cine ambiental que busca concientizar sobre el cuidado de la naturaleza.", 
          fechaInicio: "2026-09-17", 
          fechaFin: "2026-09-20"
        },
        { 
          id: 3, 
          idDestino: 3, 
          nombre: "Festival Nacional del Caimán Cienaguero - Ciénaga", 
          idTipoEvento: 8, 
          descripcion: "Celebración folclórica icónica con danzas, disfraces, música caribeña y comparsas.", 
          fechaInicio: "2026-01-17", 
          fechaFin: "2026-01-20"
        },
        { 
          id: 4, 
          idDestino: 4, 
          nombre: "Fiesta Patronal del Señor de los Milagros - Guadalajara de Buga", 
          idTipoEvento: 3, 
          descripcion: "Peregrinación y festividad religiosa de gran tradición que reúne a miles de devotos.", 
          fechaInicio: "2026-09-05", 
          fechaFin: "2026-09-14"
        },
        { 
          id: 5, 
          idDestino: 5, 
          nombre: "Fiestas de la Policarpa y el Patriotismo - Guaduas", 
          idTipoEvento: 4, 
          descripcion: "Conmemoración histórica y cultural con desfiles y actos patrióticos.", 
          fechaInicio: "2026-01-24", 
          fechaFin: "2026-01-26"
        },
        { 
          id: 6, 
          idDestino: 6, 
          nombre: "Festival Nacional Subienda y la Pesca - Honda", 
          idTipoEvento: 5, 
          descripcion: "Festividad tradicional a orillas del río Magdalena que celebra la subienda del pez capaz.", 
          fechaInicio: "2026-02-12", 
          fechaFin: "2026-02-15"
        },
        { 
          id: 7, 
          idDestino: 7, 
          nombre: "Festival de la Rosa y la Cultura Paisa - Jardín", 
          idTipoEvento: 1, 
          descripcion: "Celebración llena de color, música y tradiciones de la colonización antioqueña.", 
          fechaInicio: "2026-01-08", 
          fechaFin: "2026-01-12"
        },
        { 
          id: 8, 
          idDestino: 8, 
          nombre: "Hay Festival Jericó", 
          idTipoEvento: 1, 
          descripcion: "Encuentro internacional de literatura, artes, cine y pensamiento.", 
          fechaInicio: "2026-01-23", 
          fechaFin: "2026-01-25"
        },
        { 
          id: 9, 
          idDestino: 9, 
          nombre: "Feria del Balón y la Artesanía - Monguí", 
          idTipoEvento: 6, 
          descripcion: "Evento que resalta el trabajo de los artesanos locales del cuero y balones.", 
          fechaInicio: "2026-10-10", 
          fechaFin: "2026-10-12"
        },
        { 
          id: 10, 
          idDestino: 10, 
          nombre: "Festival de los Estoraques - Playa de Belén", 
          idTipoEvento: 7, 
          descripcion: "Encuentro que fomenta el turismo ecológico y senderismo guiado.", 
          fechaInicio: "2026-07-03", 
          fechaFin: "2026-07-05"
        },
        { 
          id: 11, 
          idDestino: 11, 
          nombre: "Festival Internacional del Garcero del Llano - Pore", 
          idTipoEvento: 8, 
          descripcion: "Fiesta de folclor llanero con joropo, contrapunteo y gastronomía.", 
          fechaInicio: "2026-11-13", 
          fechaFin: "2026-11-16"
        },
        { 
          id: 12, 
          idDestino: 12, 
          nombre: "Noche del Fuego y las Iluminaciones - Salamina", 
          idTipoEvento: 3, 
          descripcion: "Festividad donde calles y balcones se iluminan con miles de faroles.", 
          fechaInicio: "2026-12-07", 
          fechaFin: "2026-12-08"
        },
        { 
          id: 13, 
          idDestino: 13, 
          nombre: "Fiesta del Señor de los Milagros y Cultura Colonial - Girón", 
          idTipoEvento: 3, 
          descripcion: "Muestras religiosas y procesiones solemnes en calles empedradas.", 
          fechaInicio: "2026-09-12", 
          fechaFin: "2026-09-14"
        },
        { 
          id: 14, 
          idDestino: 14, 
          nombre: "Mompox Jazz Festival", 
          idTipoEvento: 1, 
          descripcion: "Encuentro musical de talla internacional a orillas del río Magdalena.", 
          fechaInicio: "2026-10-15", 
          fechaFin: "2026-10-18"
        },
        { 
          id: 15, 
          idDestino: 15, 
          nombre: "Festival Gastronómico del Sinú y Fusión Árabe - Lorica", 
          idTipoEvento: 5, 
          descripcion: "Muestra culinaria que resalta la identidad caribeña y la influencia árabe.", 
          fechaInicio: "2026-05-22", 
          fechaFin: "2026-05-25"
        },
        { 
          id: 16, 
          idDestino: 16, 
          nombre: "Festival de Cine de Santa Fe de Antioquia", 
          idTipoEvento: 1, 
          descripcion: "Muestra de cine independiente con proyecciones al aire libre.", 
          fechaInicio: "2026-12-04", 
          fechaFin: "2026-12-08"
        },
        { 
          id: 17, 
          idDestino: 17, 
          nombre: "Fiestas de la Insurrección Comunera - El Socorro", 
          idTipoEvento: 4, 
          descripcion: "Conmemoración del grito de libertad comunero con desfiles históricos.", 
          fechaInicio: "2026-03-14", 
          fechaFin: "2026-03-16"
        },
        { 
          id: 18, 
          idDestino: 18, 
          nombre: "Festival Nacional del Viento y las Cometas - Villa de Leyva", 
          idTipoEvento: 9, 
          descripcion: "Competencias y exhibiciones de cometas artesanales y gigantes.", 
          fechaInicio: "2026-08-15", 
          fechaFin: "2026-08-17"
        },
        { 
          id: 19, 
          idDestino: 1, 
          nombre: "Fiestas de la La Cabuya - Aguadas", 
          idTipoEvento: 10, 
          descripcion: "Homenaje al trabajo campesino, al cultivo del fique y a las artesanas.", 
          fechaInicio: "2026-11-13", 
          fechaFin: "2026-11-16"
        },
        { 
          id: 20, 
          idDestino: 2, 
          nombre: "Semana Santa Patronal y Colonial - Barichara", 
          idTipoEvento: 3, 
          descripcion: "Conmovedora conmemoración religiosa a través de procesiones nocturnas.", 
          fechaInicio: "2026-03-29", 
          fechaFin: "2026-04-05"
        },
        { 
          id: 21, 
          idDestino: 3, 
          nombre: "Festival de la Leyenda y la Danza del Caimán - Ciénaga", 
          idTipoEvento: 8, 
          descripcion: "Encuentro de comparsas, disfraces tradicionales y conciertos.", 
          fechaInicio: "2026-01-19", 
          fechaFin: "2026-01-21"
        },
        { 
          id: 22, 
          idDestino: 4, 
          nombre: "Encuentro Nacional de Contadores de Historias y Leyendas - Buga", 
          idTipoEvento: 1, 
          descripcion: "Espacio de tradición oral que reúne a narradores de todo el país.", 
          fechaInicio: "2026-11-06", 
          fechaFin: "2026-11-08"
        },
        { 
          id: 23, 
          idDestino: 5, 
          nombre: "Festival Turístico y Cultural del Camino Real - Guaduas", 
          idTipoEvento: 4, 
          descripcion: "Caminatas históricas por la Ruta Mutis y ferias artesanales.", 
          fechaInicio: "2026-07-18", 
          fechaFin: "2026-07-20"
        },
        { 
          id: 24, 
          idDestino: 6, 
          nombre: "Carnaval del Río Magdalena y los Puentes - Honda", 
          idTipoEvento: 1, 
          descripcion: "Desfiles náuticos de canoas engalanadas y comparsas.", 
          fechaInicio: "2026-06-26", 
          fechaFin: "2026-06-29"
        },
        { 
          id: 25, 
          idDestino: 7, 
          nombre: "Festival de Cine de Jardín", 
          idTipoEvento: 1, 
          descripcion: "Festival centrado en derechos humanos, naturaleza y patrimonio rural.", 
          fechaInicio: "2026-09-10", 
          fechaFin: "2026-09-13"
        },
        { 
          id: 26, 
          idDestino: 8, 
          nombre: "Fiestas de la Autonomía y el Carriel - Jericó", 
          idTipoEvento: 6, 
          descripcion: "Celebración popular centrada en el oficio guarnielero de la marroquinería.", 
          fechaInicio: "2026-08-21", 
          fechaFin: "2026-08-24"
        },
        { 
          id: 27, 
          idDestino: 9, 
          nombre: "Fiestas Patronales de Nuestra Señora de Monguí", 
          idTipoEvento: 3, 
          descripcion: "Celebración tradicional boyacense con romerías y ferias.", 
          fechaInicio: "2026-12-28", 
          fechaFin: "2026-12-31"
        },
        { 
          id: 28, 
          idDestino: 10, 
          nombre: "Aniversario de la Fundación de Playa de Belén", 
          idTipoEvento: 10, 
          descripcion: "Fiesta popular con retretas musicales y muestras folclóricas.", 
          fechaInicio: "2026-12-04", 
          fechaFin: "2026-12-06"
        },
        { 
          id: 29, 
          idDestino: 11, 
          nombre: "Encuentro de la Canto y la Copla Llanera - Pore", 
          idTipoEvento: 8, 
          descripcion: "Jornadas de contrapunteo, arpa y voz recia entre cantautores.", 
          fechaInicio: "2026-08-06", 
          fechaFin: "2026-08-09"
        },
        { 
          id: 30, 
          idDestino: 12, 
          nombre: "Festival Pedagógico de Arte y la Madera - Salamina", 
          idTipoEvento: 6, 
          descripcion: "Exposición de ebanistas y maestros talladores de madera.", 
          fechaInicio: "2026-10-16", 
          fechaFin: "2026-10-18"
        },
        { 
          id: 31, 
          idDestino: 13, 
          nombre: "Festival Gastronómico del Lobero y la Cocina Colonial - Girón", 
          idTipoEvento: 5, 
          descripcion: "Muestra de la gastronomía santandereana tradicional.", 
          fechaInicio: "2026-11-01", 
          fechaFin: "2026-11-03"
        },
        { 
          id: 32, 
          idDestino: 14, 
          nombre: "Semana Santa Mayor de Mompox", 
          idTipoEvento: 3, 
          descripcion: "Una de las celebraciones litúrgicas más antiguas y solemnes del Caribe.", 
          fechaInicio: "2026-03-29", 
          fechaFin: "2026-04-05"
        },
        { 
          id: 33, 
          idDestino: 15, 
          nombre: "Fiestas del Viejo Bolívar y del Río Sinú - Lorica", 
          idTipoEvento: 1, 
          descripcion: "Desfiles folclóricos, conciertos de porro sabanero y comparsas.", 
          fechaInicio: "2026-05-01", 
          fechaFin: "2026-05-03"
        },
        { 
          id: 34, 
          idDestino: 16, 
          nombre: "Fiestas del Tamarindo - Santa Fe de Antioquia", 
          idTipoEvento: 5, 
          descripcion: "Celebración alrededor de los productos derivados del tamarindo.", 
          fechaInicio: "2026-08-14", 
          fechaFin: "2026-08-17"
        },
        { 
          id: 35, 
          idDestino: 17, 
          nombre: "Festival Nacional de la Guabina y el Tiple - El Socorro", 
          idTipoEvento: 1, 
          descripcion: "Competencia y homenaje a la música andina colombiana.", 
          fechaInicio: "2026-11-06", 
          fechaFin: "2026-11-09"
        },
        { 
          id: 36, 
          idDestino: 18, 
          nombre: "Festival Internacional de Luces - Villa de Leyva", 
          idTipoEvento: 9, 
          descripcion: "Espectáculo pirotécnico y musical de fin de año en la plaza.", 
          fechaInicio: "2026-12-07", 
          fechaFin: "2026-12-09"
        },
        { 
          id: 37, 
          idDestino: 7, 
          nombre: "Cabalgata y Torneo Deportivo - Jardín", 
          idTipoEvento: 11, 
          descripcion: "Jornada de cabalgata, ciclismo de montaña y competencias al aire libre.", 
          fechaInicio: "2026-11-20", 
          fechaFin: "2026-11-22"
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('evento', null, {});
  }
};