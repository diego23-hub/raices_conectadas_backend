const Evento = require ('../models/evento.model');
const { idPorNombre } = require('../utils/tipos');
const { tipoEvento: TipoEvento, tipoEvento } = require('../models');
const BusinessError = require('../errors/BusinessError');
const SystemError=require('../errors/SystemError');

const handleError = (error, defaultMessage) => {
    if (error instanceof BusinessError || error instanceof SystemError) {
        throw error;
    }
    console.error(error); // útil para depurar el error original
    throw new SystemError(defaultMessage);
};

const conTipo = async (eventos) => {
    const tipos = Object.fromEntries(
        (await tipoEvento.findAll()).map((t) => [t.id, t.nombre])
    );
    return eventos.map((d) => ({ ...d.toJSON(), tipoEvento: tipos[d.idTipoEvento] }));
};

exports.create = async (data) => {
    try {
        const { tipoEvento, ...resto } = data;
        const idTipoEvento = await idPorNombre(TipoEvento, tipoEvento, 'Tipo de evento');
        const creado = await Evento.create({ ...resto, idTipoEvento });
        return (await conTipo([creado]))[0];    
    } catch (error){
        handleError(error, 'Error al crear el evento');
    }
};

exports.getAll = async () => {
    try {
        return await conTipo(await Evento.findAll());
    } catch(error){
        handleError(error, 'Error al obtener los eventos');
    }
};

exports.getById = async (id) => {
    try{
        const evento = await Evento.findByPk(id)
        if (!evento) throw new BusinessError('Evento no encontrado');
        return (await conTipo([evento]))[0]; 
    }catch(error){
        handleError(error, 'Error al obtener el evento');
    }
};

exports.update = async (id,data) => {
    try{
        const evento = await Evento.findByPk(id);
        if (!evento) throw new BusinessError('Evento no encontrado');

        const { tipoEvento, ...resto } = data;
        if (tipoEvento !== undefined) {
            resto.idTipoEvento = await idPorNombre(TipoEvento, tipoEvento, 'Tipo de evento');
        }
        return (await conTipo([await evento.update(resto)]))[0];
        }catch(error){
            handleError(error,'Error al actualizar el evento');
        }
};

exports.delete = async (id) => {
    try{
        const evento = await Evento.findByPk(id);
        if(!evento){
            throw new BusinessError('Evento no encontrado');
        }
        await evento.destroy();
        return {message: 'Evento eliminado correctamente'};
    }catch(error){
        handleError(error,'Error al eliminar el evento')
    }
};