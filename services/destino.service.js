const Destino = require('../models/destino.model');
const BusinessError = require('../errors/BusinessError');
const SystemError = require('../errors/SystemError');
const { idPorNombre } = require('../utils/tipos');
const { elegir, texto } = require('../utils/validaciones');
const { tipoDestino: TipoDestino } = require('../models');

const handleError = (error, defaultMessage) => {
    if (error instanceof BusinessError || error instanceof SystemError) {
        throw error;
    }
    console.error(error);
    throw new SystemError(defaultMessage);
};

const conTipo = async (destinos) => {
    const tipos = Object.fromEntries((await TipoDestino.findAll()).map((t) => [t.id, t.nombre]));
    return destinos.map((d) => ({ ...d.toJSON(), tipo: tipos[d.idTipoDestino] }));
};

const CAMPOS = ['nombre', 'descripcion'];
const validar = (d, requerido) => {
    texto(d.nombre, 'nombre', { min: 2, max: 100, requerido });
    texto(d.descripcion, 'descripcion', { min: 5, max: 1000, requerido });
};

exports.create = async (data) => {
    try {
        const datos = elegir(data, CAMPOS);
        validar(datos, true);
        const idTipoDestino = await idPorNombre(TipoDestino, data.tipo, 'Clasificación');
        const creado = await Destino.create({ ...datos, idTipoDestino });
        return (await conTipo([creado]))[0];
    } catch (error) {
        handleError(error, 'Error al crear el destino');
    }
};

exports.getAll = async () => {
    try {
        return await conTipo(await Destino.findAll());
    } catch (error) {
        handleError(error, 'Error al obtener los destinos');
    }
};

exports.getById = async (id) => {
    try {
        const destino = await Destino.findByPk(id);
        if (!destino) throw new BusinessError('Destino no encontrado', 404);
        return (await conTipo([destino]))[0];
    } catch (error) {
        handleError(error, 'Error al obtener el destino');
    }
};

exports.update = async (id, data) => {
    try {
        const destino = await Destino.findByPk(id);
        if (!destino) throw new BusinessError('Destino no encontrado', 404);
        const cambios = elegir(data, CAMPOS);
        validar(cambios, false);
        if (data.tipo !== undefined) {
            cambios.idTipoDestino = await idPorNombre(TipoDestino, data.tipo, 'Clasificación');
        }
        return (await conTipo([await destino.update(cambios)]))[0];
    } catch (error) {
        handleError(error, 'Error al actualizar el destino');
    }
};

exports.delete = async (id) => {
    try {
        const destino = await Destino.findByPk(id);
        if (!destino) throw new BusinessError('Destino no encontrado', 404);
        await destino.destroy();
        return { message: 'Destino eliminado correctamente' };
    } catch (error) {
        handleError(error, 'Error al eliminar el destino');
    }
};