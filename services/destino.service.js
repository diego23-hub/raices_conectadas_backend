const Destino = require ('../models/destino.model');
const BusinessError = require('../errors/BusinessError');
const SystemError = require ('../errors/SystemError');
const { idPorNombre } = require('../utils/tipos');
const { tipoDestino: TipoDestino } = require('../models');

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

        const { tipo, ...resto } = data;
        const idTipoDestino = await idPorNombre(TipoDestino, tipo, 'Clasificación');
        return await Destino.create({ ...resto, idTipoDestino });

    } catch (error){
        handleError(error, 'Error al crear el destino');
    }
};

exports.getAll = async () => {
    try {
        return await Destino.findAll();
    } catch (error) {
        handleError (error, 'Error al obtener los destinos');
    }
};

exports.getById = async (id) => {
    try {
        const destino = await Destino.findByPk(id)
        if (!destino) throw new BusinessError('Destino no encontrado');
        return destino; 
    } catch (error) {
        handleError(error, 'Error al obtener el destino');
    }
};

exports.update = async (id,data) => {
    try{
        const destino = await Destino.findByPk(id);
        const { tipo, ...resto } = data;
        if (!destino) throw new BusinessError('Destino no encontrado');
        if (tipo !== undefined) resto.idTipoDestino = await idPorNombre(TipoDestino, tipo, 'Clasificación');
        return await destino.update(resto);
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
};