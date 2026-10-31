const {
    sequelize, reserva: Reserva, paquete: Paquete, usuario: Usuario, tipoDoc: TipoDoc,
    proveedor: Proveedor, pago: Pago, metodoPago: MetodoPago, notificacion: Notificacion
} = require('../models');
const BusinessError = require('../errors/BusinessError');
const SystemError = require('../errors/SystemError');
const { idPorNombre } = require('../utils/tipos');

const handleError = (error, defaultMessage) => {
    if (error instanceof BusinessError || error instanceof SystemError) {
        throw error;
    }
    console.error(error); // útil para depurar el error original
    throw new SystemError(defaultMessage);
};

// ---------- Cotización (la misma regla que el frontend) ----------
const fechaTexto = (fecha) =>
    fecha instanceof Date ? fecha.toISOString().slice(0, 10) : String(fecha).slice(0, 10);

// Cuenta los días entre dos fechas, ambas incluidas: del 10 al 12 son 3 días
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

    if (!fechaInicio || !fechaFinal) {
        throw new BusinessError('Debe indicar las fechas del viaje');
    }
    const dias = diasEntre(fechaInicio, fechaFinal);
    if (dias < 1) throw new BusinessError('La fecha de fin no puede ser anterior a la de inicio');
    if (dias > 30) throw new BusinessError('La reserva no puede superar 30 días');

    if ([adultos, jovenes, ninos, bebes].some((n) => n < 0 || !Number.isInteger(n))) {
        throw new BusinessError('Las cantidades de personas no son válidas');
    }
    const cantidadPersonas = adultos + jovenes + ninos + bebes;
    if (cantidadPersonas < 1) throw new BusinessError('Debe haber al menos 1 persona viajando');

    const paquete = await Paquete.findByPk(idPaquete);
    if (!paquete) throw new BusinessError('Paquete no encontrado');
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

// ---------- Reservas ----------
exports.getMine = async (idUsuario) => {
    try {
        return await Reserva.findAll({ where: { idUsuario } });
    } catch (error) {
        handleError(error, 'Error consultando las reservas');
    }
};

exports.getAll = async () => {
    try {
        return await Reserva.findAll();
    } catch (error) {
        handleError(error, 'Error al obtener las reservas');
    }
};

exports.create = async (idUsuario, datos) => {
    try {
        const cotizacion = await cotizar(idUsuario, datos.idPaquete, datos);
        return await sequelize.transaction(async (t) => {
            const creada = await Reserva.create(
                { ...cotizacion, idUsuario, estado: 'pendiente' },
                { transaction: t }
            );
            await creada.update({ numSeguimiento: 1000 + creada.id }, { transaction: t });
            return creada;
        });
    } catch (error) {
        handleError(error, 'Error al crear la reserva');
    }
};

exports.update = async (id, idUsuario, datos) => {
    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva || reserva.idUsuario !== idUsuario) {
            throw new BusinessError('Reserva no encontrada');
        }
        if (reserva.estado !== 'pendiente') {
            throw new BusinessError('Solo se pueden editar reservas pendientes');
        }
        // lo que el cliente no manda se conserva; el paquete no se puede cambiar
        const { idPaquete, ...cambios } = await cotizar(idUsuario, reserva.idPaquete, {
            fechaInicio: datos.fechaInicio ?? reserva.fechaInicio,
            fechaFinal: datos.fechaFinal ?? reserva.fechaFinal,
            adultos: datos.adultos ?? reserva.adultos,
            jovenes: datos.jovenes ?? reserva.jovenes,
            ninos: datos.ninos ?? reserva.ninos,
            bebes: datos.bebes ?? reserva.bebes
        });
        return await reserva.update(cambios);
    } catch (error) {
        handleError(error, 'Error al actualizar la reserva');
    }
};

exports.cancel = async (id, idUsuario) => {
    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva || reserva.idUsuario !== idUsuario) {
            throw new BusinessError('Reserva no encontrada');
        }
        if (reserva.estado !== 'pendiente') {
            throw new BusinessError('Solo se pueden cancelar reservas pendientes');
        }
        await sequelize.transaction(async (t) => {
            await Pago.destroy({ where: { idReserva: id }, transaction: t }); // pagos rechazados
            await reserva.destroy({ transaction: t });
        });
        return { message: 'Reserva cancelada correctamente' };
    } catch (error) {
        handleError(error, 'Error al cancelar la reserva');
    }
};

exports.pagar = async (id, idUsuario, metodo) => {
    try {
        const aprobado = await sequelize.transaction(async (t) => {
            const reserva = await Reserva.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE });
            if (!reserva || reserva.idUsuario !== idUsuario) {
                throw new BusinessError('Reserva no encontrada', 404);
            }
            if (reserva.estado !== 'pendiente') {
                throw new BusinessError('La reserva ya no está pendiente', 409);
            }

            const idMetodoPago = await idPorNombre(MetodoPago, metodo, 'Método de pago');
            const aprobado = Math.random() < 0.8; // simulación: 8 de cada 10 se aprueban

            await Pago.create({
                idReserva: reserva.id,
                idMetodoPago,
                referencia: `${aprobado ? 'SIM' : 'RECH'}-${Date.now()}`,
                monto: reserva.total,
                fecha: new Date(),
                estado: aprobado ? 'aprobado' : 'rechazado'
            }, { transaction: t });

            if (aprobado) {
                await reserva.update({ estado: 'pagada' }, { transaction: t });

                // RF006: una notificación pendiente por cada proveedor del destino
                const paquete = await Paquete.findByPk(reserva.idPaquete, { transaction: t });
                const proveedores = await Proveedor.findAll({
                    where: { idDestino: paquete.idDestino }, transaction: t
                });
                await Notificacion.bulkCreate(
                    proveedores.map((p) => ({
                        idReserva: reserva.id,
                        idProveedor: p.id,
                        estado: 'pendiente',
                        fechaCreacion: new Date()
                    })),
                    { transaction: t }
                );
            }

            return aprobado;   // la transacción se confirma en ambos casos: el pago rechazado queda registrado
        });

        if (!aprobado) throw new BusinessError('Pago rechazado', 402);

        return await Reserva.findByPk(id);   // devuelve la reserva, ya "pagada"
    } catch (error) {
        handleError(error, 'Error al procesar el pago');
    }
};