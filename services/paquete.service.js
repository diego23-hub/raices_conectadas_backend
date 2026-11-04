const Paquete = require('../models/paquete.model');
const BusinessError = require('../errors/BusinessError');
const SystemError = require('../errors/SystemError');
const { elegir, texto, entero, numero } = require('../utils/validaciones');
const { destino: Destino } = require('../models');

const handleError = (error, defaultMessage) => {
    if (error instanceof BusinessError || error instanceof SystemError) {
        throw error;
    }
    console.error(error);
    throw new SystemError(defaultMessage);
};

const CAMPOS = [
    'nombre', 'precio', 'descripcion', 'duracion', 'duracionDias',
    'incluye', 'itinerario', 'limitePersonas', 'idDestino'
];
const validar = (d, requerido) => {
    texto(d.nombre, 'nombre', { min: 2, max: 100, requerido });
    numero(d.precio, 'precio', { min: 1, max: 100000000, requerido });
    texto(d.descripcion, 'descripcion', { min: 5, max: 2000, requerido });
    texto(d.duracion, 'duracion', { min: 2, max: 50, requerido });
    entero(d.duracionDias, 'duracionDias', { min: 1, max: 30, requerido });
    texto(d.incluye, 'incluye', { min: 2, max: 1000, requerido });
    texto(d.itinerario, 'itinerario', { min: 2, max: 2000, requerido });
    entero(d.limitePersonas, 'limitePersonas', { min: 1, max: 100, requerido });
    entero(d.idDestino, 'idDestino', { min: 1, requerido });
};
const existeDestino = async (idDestino) => {
    if (idDestino !== undefined && !(await Destino.findByPk(idDestino))) {
        throw new BusinessError('Destino no encontrado', 404);
    }
};

exports.create = async (data) => {
    try {
        const datos = elegir(data, CAMPOS);
        validar(datos, true);
        await existeDestino(datos.idDestino);
        return await Paquete.create(datos);
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
        if (!paquete) throw new BusinessError('Paquete no encontrado', 404);
        return paquete;
    } catch (error) {
        handleError(error, 'Error al obtener el paquete');
    }
};

exports.update = async (id, data) => {
    try {
        const paquete = await Paquete.findByPk(id);
        if (!paquete) throw new BusinessError('Paquete no encontrado', 404);
        const cambios = elegir(data, CAMPOS);
        validar(cambios, false);
        await existeDestino(cambios.idDestino);
        return await paquete.update(cambios);
    } catch (error) {
        handleError(error, 'Error al actualizar el paquete');
    }
};

exports.delete = async (id) => {
    try {
        const paquete = await Paquete.findByPk(id);
        if (!paquete) throw new BusinessError('Paquete no encontrado', 404);
        await paquete.destroy();
        return { message: 'Paquete eliminado correctamente' };
    } catch (error) {
        handleError(error, 'Error al eliminar el paquete');
    }
};