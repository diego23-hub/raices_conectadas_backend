const Evento = require ('../models/evento.model');

exports.create = async (data) => {
    return await Evento.create(data);
};

exports.getAll = async () => {
    return await Evento.findAll();
};

exports.getById = async (id) => {
    const evento = await Evento.findByPk(id)
    if (!evento) throw new Error('Evento no encontrado');
    return evento;
}

exports.update = async (id,data) => {
    const evento = await Evento.findByPk(id);
    if (!evento) {
        throw new Error('Evento no encontrado');
    }
    return await evento.update(data);
};

exports.delete = async (id) => {
    const evento = await Evento.findByPk(id);
    if(!evento){
        throw new Error('Evento no encontrado');
    }
    await evento.destroy();
    return {message: 'Evento eliminado correctamente'};
}