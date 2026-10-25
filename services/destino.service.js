const Destino = require ('../models/destino.model');

exports.create = async (data) => {
    return await Destino.create(data);
};

exports.getAll = async () => {
    return await Destino.findAll();
};

exports.getById = async (id) => {
    const destino = await Destino.findByPk(id)
    if (!destino) throw new Error('Destino no encontrado');
    return destino;
}

exports.update = async (id,data) => {
    const destino = await Destino.findByPk(id);
    if (!destino) {
        throw new Error('Destino no encontrado');
    }
    return await destino.update(data);
};

exports.delete = async (id) => {
    const destino = await Destino.findByPk(id);
    if(!destino){
        throw new Error('Destino no encontrado');
    }
    await destino.destroy();
    return {message: 'Destino eliminado correctamente'};
}