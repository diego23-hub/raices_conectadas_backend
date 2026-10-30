const Paquete = require('../models/paquete.model');
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
        return await Paquete.create(data);
    } catch (error) {
        handleError(error, 'Error al crear el paquete');
    }
};

exports.getAll = async () => {
    try {
        return await Paquete.findAll();
    } catch (error) {
        handleError(error, 'Error al obtener los paquetes');
    }
};

exports.getById = async (id) => {
    try {
        const paquete = await Paquete.findByPk(id);
        if (!paquete) throw new BusinessError('Paquete no encontrado');
        return paquete;
    } catch (error) {
        handleError(error, 'Error al obtener el paquete');
    }
};

exports.update = async (id, data) => {
    try {
        const paquete = await Paquete.findByPk(id);
        if (!paquete) throw new BusinessError('Paquete no encontrado');
        return await paquete.update(data);
    } catch (error) {
        handleError(error, 'Error al actualizar el paquete');
    }
};

exports.delete = async (id) => {
    try {
        const paquete = await Paquete.findByPk(id);
        if (!paquete) throw new BusinessError('Paquete no encontrado');
        await paquete.destroy();
        return { message: 'Paquete eliminado correctamente' };
    } catch (error) {
        handleError(error, 'Error al eliminar el paquete');
    }
};