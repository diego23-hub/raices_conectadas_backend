const { usuario: Usuario, rol, tipoDoc: TipoDoc } = require('../models');
const BusinessError = require('../errors/BusinessError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const SystemError = require('../errors/SystemError');
const { idPorNombre } = require('../utils/tipos');

const handleError = (error, defaultMessage) => {
    if (error instanceof BusinessError || error instanceof SystemError) {
        throw error;
    }
    console.error(error); // útil para depurar el error original
    throw new SystemError(defaultMessage);
};

exports.register = async (data) => {
    try {
        const { idRol, tipoDoc, ...datos } = data;

        if (await Usuario.findOne({ where: { correo: datos.correo } })) {
            throw new BusinessError('Ese correo ya está registrado');
        }

        const idTipoDoc = await idPorNombre(TipoDoc, tipoDoc, 'Tipo de documento');
        const rolViajero = await rol.findOne({ where: { nombre: 'viajero' } });
        const creado = await Usuario.create({ ...datos, idTipoDoc, idRol: rolViajero.id });
        const { contrasena, ...sinClave } = creado.toJSON();
        return sinClave;
    } catch (error) {
        handleError(error, 'Error al registrar el usuario');
    }
};

exports.getAll = async () => {
    try {
        return await Usuario.findAll({ attributes: { exclude: ['contrasena'] } });
    } catch (error) {
        handleError(error, 'Error al obtener los usuarios');
    }
};

exports.getById = async (id) => {
    try {
        return await Usuario.findByPk(id, { attributes: { exclude: ['contrasena'] } });
    } catch (error) {
        handleError(error, 'Error al obtener el usuario');
    }
};

exports.update = async (id, data) => {
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) throw new BusinessError('Usuario no encontrado');
        return await usuario.update(data);
    } catch (error) {
        handleError(error, 'Error al actualizar el usuario');
    }
};

exports.delete = async (id) => {
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) throw new BusinessError('Usuario no encontrado');
        await usuario.destroy();
        return { message: 'Usuario eliminado correctamente' };
    } catch (error) {
        handleError(error, 'Error al eliminar el usuario');
    }
};