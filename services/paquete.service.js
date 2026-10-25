const Paquete = require ('../models/paquete.model');

exports.create = async (data) => {
    return await Paquete.create(data);
};

exports.getAll = async () => {
    return await Paquete.findAll();
};

exports.getById = async (id) => {
    const paquete = await Paquete.findByPk(id)
    if (!paquete) throw new Error('Paquete no encontrado');
    return paquete;
}

exports.update = async (id,data) => {
    const paquete = await Paquete.findByPk(id);
    if (!paquete) {
        throw new Error('Paquete no encontrado');
    }
    return await paquete.update(data);
};

exports.delete = async (id) => {
    const paquete = await Paquete.findByPk(id);
    if(!paquete){
        throw new Error('Paquete no encontrado');
    }
    await paquete.destroy();
    return {message: 'Paquete eliminado correctamente'};
}