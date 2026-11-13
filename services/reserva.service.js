const { sequelize, reserva: Reserva, pago: Pago } = require('../models');
const BusinessError = require('../errors/BusinessError');
const SystemError = require('../errors/SystemError');
const { cotizar } = require('./cotizacion.service');
const { aRespuesta, aRespuestaLista } = require('../utils/reservaRespuesta');

const handleError = (error, defaultMessage) => {
    if (error instanceof BusinessError || error instanceof SystemError) {
        throw error;
    }
    console.error(error);
    throw new SystemError(defaultMessage);
};

exports.getMine = async (idUsuario) => {
    try {
        return await aRespuestaLista(await Reserva.findAll({ where: { idUsuario } }));
    } catch (error) {
        handleError(error, 'Error consultando las reservas');
    }
};

exports.getAll = async () => {
    try {
        return await aRespuestaLista(await Reserva.findAll());
    } catch (error) {
        handleError(error, 'Error al obtener las reservas');
    }
};

exports.create = async (idUsuario, datos) => {
    try {
        const cotizacion = await cotizar(idUsuario, datos.idPaquete, datos);
        const creada = await sequelize.transaction(async (t) => {
            // Generamos un número de seguimiento temporal o aleatorio 
            const codigoTemporal = 'RC-' + Math.floor(100000 + Math.random() * 900000);
            
            const nueva = await Reserva.create(
                { 
                    ...cotizacion, 
                    idUsuario, 
                    estado: 'pendiente',
                    numSeguimiento: codigoTemporal // <--- Se envía desde el create inicial
                },
                { transaction: t }
            );
            
            await nueva.update({ numSeguimiento: 1000 + nueva.id }, { transaction: t });
            
            return nueva;
        });
        return await aRespuesta(creada);
    } catch (error) {
        handleError(error, 'Error al crear la reserva');
    }
};

exports.update = async (id, idUsuario, datos) => {
    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva || reserva.idUsuario !== idUsuario) {
            throw new BusinessError('Reserva no encontrada', 404);
        }
        if (reserva.estado !== 'pendiente') {
            throw new BusinessError('Solo se pueden editar reservas pendientes', 409);
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
        return await aRespuesta(await reserva.update(cambios));
    } catch (error) {
        handleError(error, 'Error al actualizar la reserva');
    }
};

exports.cancel = async (id, idUsuario) => {
    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva || reserva.idUsuario !== idUsuario) {
            throw new BusinessError('Reserva no encontrada', 404);
        }
        if (reserva.estado !== 'pendiente') {
            throw new BusinessError('Solo se pueden cancelar reservas pendientes', 409);
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