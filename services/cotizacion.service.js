const { paquete: Paquete, usuario: Usuario, tipoDoc: TipoDoc } = require('../models');
const BusinessError = require('../errors/BusinessError');
const { fecha } = require('../utils/validaciones');

const fechaTexto = (fecha) =>
    fecha instanceof Date ? fecha.toISOString().slice(0, 10) : String(fecha).slice(0, 10);

const diasEntre = (inicio, fin) => {
    const [a1, m1, d1] = fechaTexto(inicio).split('-').map(Number);
    const [a2, m2, d2] = fechaTexto(fin).split('-').map(Number);
    return Math.round((new Date(a2, m2 - 1, d2) - new Date(a1, m1 - 1, d1)) / 86400000) + 1;
};

const cotizar = async (idUsuario, idPaquete, datos) => {
    const { fechaInicio, fechaFinal } = datos;
    const adultos = Number(datos.adultos) || 0;
    const jovenes = Number(datos.jovenes) || 0;
    const ninos = Number(datos.ninos) || 0;
    const bebes = Number(datos.bebes) || 0;

    const hoyLocal = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    if (!fechaInicio || !fechaFinal) {
    throw new BusinessError('Debe indicar las fechas del viaje');
    }
    fecha(fechaInicio, 'fechaInicio');
    fecha(fechaFinal, 'fechaFinal');
    if (fechaTexto(fechaInicio) < hoyLocal()) {
        throw new BusinessError('La fecha de inicio no puede estar en el pasado');
    }

    const dias = diasEntre(fechaInicio, fechaFinal);
    if (dias < 1) throw new BusinessError('La fecha de fin no puede ser anterior a la de inicio');
    if (dias > 30) throw new BusinessError('La reserva no puede superar 30 días');

    if ([adultos, jovenes, ninos, bebes].some((n) => n < 0 || !Number.isInteger(n))) {
        throw new BusinessError('Las cantidades de personas no son válidas');
    }
    const cantidadPersonas = adultos + jovenes + ninos + bebes;
    if (cantidadPersonas < 1) throw new BusinessError('Debe haber al menos 1 persona viajando');

    if (adultos < 1) {
    throw new BusinessError('Debe viajar al menos un adulto');
    }

    const paquete = await Paquete.findByPk(idPaquete);
    if (!paquete) throw new BusinessError('Paquete no encontrado', 404);
    if (cantidadPersonas > paquete.limitePersonas) {
        throw new BusinessError(`La cantidad máxima permitida es de ${paquete.limitePersonas} personas`);
    }

    const usuario = await Usuario.findByPk(idUsuario);
    const tipoDoc = await TipoDoc.findByPk(usuario.idTipoDoc);

    const duracionBase = paquete.duracionDias || 1;
    // el precio del paquete es para su duración base; se ajusta según los días elegidos
    const precioBase = Math.round(Number(paquete.precio) / duracionBase * dias);
    const subtotal = Math.round((adultos + jovenes) * precioBase + ninos * precioBase * 0.8 + bebes * precioBase * 0.5);
    const iva = tipoDoc.aplicaIva ? Math.round(subtotal * 0.19) : 0;

    return {
        idPaquete: paquete.id, fechaInicio, fechaFinal,
        adultos, jovenes, ninos, bebes, cantidadPersonas,
        subtotal, iva, total: subtotal + iva
    };
};

module.exports = { cotizar };