const { idPorNombre } = require('../utils/tipos');
const { tipoProveedor: TipoProveedor, proveedor } = require('../models');
const BusinessError = require('../errors/BusinessError');
const SystemError=require('../errors/SystemError');
const Proveedor = require ('../models/proveedor.model');

const handleError = (error, defaultMessage) => {
    if (error instanceof BusinessError || error instanceof SystemError) {
        throw error;
    }
    console.error(error); // útil para depurar el error original
    throw new SystemError(defaultMessage);
};

const conTipo = async (destinos) => {
    const tipos = Object.fromEntries(
        (await TipoProveedor.findAll()).map((t) => [t.id, t.nombre])
    );
    return proveedor.map((d) => ({ ...d.toJSON(), tipo: tipos[d.idTipoProveedor] }));
};

exports.create = async (data) => {
    try{
        const { tipo, lugar, ...resto } = data;
        const idTipoProveedor = await idPorNombre(TipoProveedor, tipo, 'Tipo de proveedor');
        const creado = await Destino.create({ ...resto, idTipoDestino });
        return await Proveedor.create({ ...resto, ubicacion:lugar ?? resto.ubicacion, idTipoProveedor });
        return (await conTipo([creado]))[0];
    }catch(error){
        handleError(error, 'Error creando el proveedor');
    }
};

exports.getAll = async () => {
    try{
        return await conTipo(await Proveedor.findAll());
    }catch(error){
        handleError(error,'Error obteniendo los proveedores');
    }
};

exports.getById = async (id) => {
    try{
        const proveedor = await Proveedor.findByPk(id)
        if (!proveedor) throw new BusinessError('Proveedor no encontrado');
        return (await conTipo([proveedor]))[0]; 
    }catch(error){
        handleError(error,'Error obteniendo el proveedor');
    }
};

exports.update = async (id,data) => {
    try{
        const proveedor = await Proveedor.findByPk(id);
        if (!proveedor) {
            throw new BusinessError('Proveedor no encontrado');
        }
        const { tipo, lugar, ...resto } = data;
        if (lugar !== undefined) resto.ubicacion = lugar;
        if (tipo !== undefined) {
            resto.idTipoProveedor = await idPorNombre(TipoProveedor, tipo, 'Tipo de proveedor');
        }
        return (await conTipo([await proveedor.update(resto)]))[0];

    }catch(error){
        handleError(error, 'Error al actualizar el proveedor');
    }
};

exports.delete = async (id) => {
    try{
        const proveedor = await Proveedor.findByPk(id);
        if(!proveedor){
            throw new BusinessError('Proveedor no encontrado');
        }
        await proveedor.destroy();
        return {message: 'Proveedor eliminado correctamente'};
    }catch(error){
        handleError(error, 'Error al eliminar el proveedor');
    }
};