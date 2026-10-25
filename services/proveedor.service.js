const Proveedor = require ('../models/proveedor.model');

exports.create = async (data) => {
    return await Proveedor.create(data);
};

exports.getAll = async () => {
    return await Proveedor.findAll();
};

exports.getById = async (id) => {
    const proveedor = await Proveedor.findByPk(id)
    if (!proveedor) throw new Error('Proveedor no encontrado');
    return proveedor;
}

exports.update = async (id,data) => {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
        throw new Error('Proveedor no encontrado');
    }
    return await proveedor.update(data);
};

exports.delete = async (id) => {
    const proveedor = await Proveedor.findByPk(id);
    if(!proveedor){
        throw new Error('Proveedor no encontrado');
    }
    await proveedor.destroy();
    return {message: 'Proveedor eliminado correctamente'};
}