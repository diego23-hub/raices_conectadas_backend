const Reserva = require('../models/reserva.model');
const BusinessError = require('../errors/BusinessError');

const handleError = (error, defaultMessage) => {
    if (error instanceof BusinessError || error instanceof SystemError) {
        throw error;
    }
    console.error(error); // útil para depurar el error original
    throw new SystemError(defaultMessage);
};

exports.create = async (data) => {
    try {
        return await Reserva.create(data);
    } catch (error) {
        handleError(error, 'Error al crear la reserva');
    }
};

exports.getAll = async () => {
    try {
        return await Reserva.findAll();
    } catch (error) {
        handleError(error, 'Error al obtener las reservas');
    }
};

exports.getById = async (id) => {
    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva) throw new BusinessError('Reserva no encontrada');
        return reserva;
    } catch (error) {
        handleError(error, 'Error al obtener la reserva');
    }
};

exports.update = async (id, data) => {
    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva) throw new BusinessError('Reserva no encontrada');
        return await reserva.update(data);
    } catch (error) {
        handleError(error, 'Error al actualizar la reserva');
    }
};

exports.delete = async (id) => {
    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva) throw new BusinessError('Reserva no encontrada');
        await reserva.destroy();
        return { message: 'Reserva eliminada correctamente' };
    } catch (error) {
        handleError(error, 'Error al eliminar la reserva');
    }
};