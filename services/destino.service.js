const Destino = require ('../models/destino.model');
const BusinessError = require('../errors/BusinessError');
const SystemError = require ('../errors/SystemError');

// Deja pasar tus errores propios y envuelve cualquier otro como SystemError
const handleError = (error, defaultMessage) => {
    if (error instanceof BusinessError || error instanceof SystemError) {
        throw error;
    }
    console.error(error); // útil para depurar el error original
    throw new SystemError(defaultMessage);
};

exports.create = async (data) => {
    try{
    return await Destino.create(data);
    } catch (error){
        handleError(error, 'Error al crear el destino');
    }
};

exports.getAll = async () => {
    try {
    return await Destino.findAll();
    } catch (error) {
        handleError (error, 'Error al obtener los detinos');
    }
};

exports.getById = async (id) => {
    try {
    const destino = await Destino.findByPk(id)
    if (!destino) throw new Error('Destino no encontrado');
    return destino; 
    } catch (error) {
        handleError(error, 'Error al obtener el destino');
    }
}

exports.update = async (id,data) => {
    try{
    const destino = await Destino.findByPk(id);
    if (!destino) throw new BusinessError('Destino no encontrado');
    return await destino.update(data);
    } catch (error){
        handleError(error, 'Error al actualizar el destino');
    }
};

exports.delete = async (id) => {
    try {
    const destino = await Destino.findByPk(id);
    if(!destino)
    throw new BusinessError('Destino no encontrado');
    await destino.destroy();
    return {message: 'Destino eliminado correctamente'};
    }catch (error) {
        handleError (error, 'Error al eliminar destino')
    }
}