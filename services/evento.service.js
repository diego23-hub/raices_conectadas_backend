const Evento = require('../models/evento.model');
const BusinessError = require('../errors/BusinessError');
const SystemError = require('../errors/SystemError');
const { idPorNombre } = require('../utils/tipos');
const { elegir, texto, entero, fecha } = require('../utils/validaciones');
const { tipoEvento: TipoEvento, destino: Destino } = require('../models');

const handleError = (error, defaultMessage) => {
    if (error instanceof BusinessError || error instanceof SystemError) {
        throw error;
    }
    console.error(error);
    throw new SystemError(defaultMessage);
};

const conTipo = async (eventos) => {
    const tipos = Object.fromEntries((await TipoEvento.findAll()).map((t) => [t.id, t.nombre]));
    return eventos.map((e) => ({ ...e.toJSON(), tipoEvento: tipos[e.idTipoEvento] }));
};

const CAMPOS = ['nombre', 'descripcion', 'fechaInicio', 'fechaFin', 'idDestino'];
const validar = (d, requerido, actual = {}) => {
    texto(d.nombre, 'nombre', { min: 2, max: 150, requerido });
    texto(d.descripcion, 'descripcion', { min: 5, max: 1000, requerido });
    fecha(d.fechaInicio, 'fechaInicio', { requerido });
    fecha(d.fechaFin, 'fechaFin', { requerido });
    entero(d.idDestino, 'idDestino', { min: 1, requerido });
    const inicio = d.fechaInicio ?? actual.fechaInicio;
    const fin = d.fechaFin ?? actual.fechaFin;
    if (inicio && fin && fin < inicio) {
        throw new BusinessError('La fecha de fin no puede ser anterior a la de inicio');
    }
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
        const idTipoEvento = await idPorNombre(TipoEvento, data.tipoEvento, 'Tipo de evento');
        const creado = await Evento.create({ ...datos, idTipoEvento });
        return (await conTipo([creado]))[0];
    } catch (error) {
        handleError(error, 'Error al crear el evento');
    }
};

exports.getAll = async () => {
    try {
        return await conTipo(await Evento.findAll());
    } catch (error) {
        handleError(error, 'Error al obtener los eventos');
    }
};

exports.getById = async (id) => {
    try {
        const evento = await Evento.findByPk(id);
        if (!evento) throw new BusinessError('Evento no encontrado', 404);
        return (await conTipo([evento]))[0];
    } catch (error) {
        handleError(error, 'Error al obtener el evento');
    }
};

exports.update = async (id, data) => {
    try {
        const evento = await Evento.findByPk(id);
        if (!evento) throw new BusinessError('Evento no encontrado', 404);
        const cambios = elegir(data, CAMPOS);
        validar(cambios, false, evento);
        await existeDestino(cambios.idDestino);
        if (data.tipoEvento !== undefined) {
            cambios.idTipoEvento = await idPorNombre(TipoEvento, data.tipoEvento, 'Tipo de evento');
        }
        return (await conTipo([await evento.update(cambios)]))[0];
    } catch (error) {
        handleError(error, 'Error al actualizar el evento');
    }
};

exports.delete = async (id) => {
    try {
        const evento = await Evento.findByPk(id);
        if (!evento) throw new BusinessError('Evento no encontrado', 404);
        await evento.destroy();
        return { message: 'Evento eliminado correctamente' };
    } catch (error) {
        handleError(error, 'Error al eliminar el evento');
    }
};