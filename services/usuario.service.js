const { usuario: Usuario, rol, tipoDoc: TipoDoc } = require('../models');
const BusinessError = require('../errors/BusinessError');
const SystemError = require('../errors/SystemError');
const { idPorNombre } = require('../utils/tipos');

const handleError = (error, defaultMessage) => {
    if (error instanceof BusinessError || error instanceof SystemError) {
        throw error;
    }
    console.error(error); // útil para depurar el error original
    throw new SystemError(defaultMessage);
};

const CAMPOS = ['numDoc', 'nombres', 'apellidos', 'telefono', 'correo', 'contrasena'];
const permitidos = (obj) =>
    Object.fromEntries(CAMPOS.filter((c) => obj[c] !== undefined).map((c) => [c, obj[c]]));

const REGLAS = {
    numDoc: (v) => /^\d{5,15}$/.test(v),
    nombres: (v) => v.trim().length >= 2 && v.length <= 60,
    apellidos: (v) => v.trim().length >= 2 && v.length <= 60,
    telefono: (v) => /^\d{7,15}$/.test(v),
    correo: (v) => v.length <= 100 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    contrasena: (v) => v.length >= 8 && v.length <= 100
};

const validar = (datos, { parcial = false } = {}) => {
    for (const [campo, esValido] of Object.entries(REGLAS)) {
        if (datos[campo] === undefined) {
            if (!parcial) throw new BusinessError(`El campo ${campo} es obligatorio`);
            continue;
        }
        if (!esValido(String(datos[campo]))) throw new BusinessError(`El campo ${campo} no es válido`);
    }
};

exports.register = async (data) => {
    try {
        const datos = permitidos(data);
        validar(datos);
        const idTipoDoc = await idPorNombre(TipoDoc, data.tipoDoc, 'Tipo de documento');
        if (await Usuario.findOne({ where: { correo: datos.correo } })) {
            throw new BusinessError('Ese correo ya está registrado', 409);
        }
        const rolViajero = await rol.findOne({ where: { nombre: 'viajero' } });
        if (!rolViajero) throw new SystemError('Rol viajero no configurado');
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
        const usuario = await Usuario.findByPk(id, { attributes: { exclude: ['contrasena'] } });
        if (!usuario) throw new BusinessError('Usuario no encontrado', 404);
        return usuario;
    } catch (error) {
        handleError(error, 'Error al obtener el usuario');
    }
};

exports.update = async (id, data) => {
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) throw new BusinessError('Usuario no encontrado', 404);

        const cambios = permitidos(data);
        validar(cambios, { parcial: true });
        if (data.tipoDoc !== undefined) {
            cambios.idTipoDoc = await idPorNombre(TipoDoc, data.tipoDoc, 'Tipo de documento');
        }

        const actualizado = await usuario.update(cambios);
        const { contrasena, ...sinClave } = actualizado.toJSON();
        return sinClave;
    } catch (error) {
        handleError(error, 'Error al actualizar el usuario');
    }
};

exports.delete = async (id) => {
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) throw new BusinessError('Usuario no encontrado', 404);
        await usuario.destroy();
        return { message: 'Usuario eliminado correctamente' };
    } catch (error) {
        handleError(error, 'Error al eliminar el usuario');
    }
};