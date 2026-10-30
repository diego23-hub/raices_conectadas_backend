const { usuario: Usuario, rol } = require('../models');
const BusinessError = require('../errors/BusinessError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const handleError = (error, defaultMessage) => {
    if (error instanceof BusinessError || error instanceof SystemError) {
        throw error;
    }
    console.error(error); // útil para depurar el error original
    throw new SystemError(defaultMessage);
};

exports.register = async (data) => {
    try {
        const { idRol, ...datosSeguros } = data;   // ignora el rol que mande el cliente
        const rolViajero = await rol.findOne({ where: { nombre: 'viajero' } });
        const creado = await Usuario.create({ ...datosSeguros, idRol: rolViajero.id });
        const { contrasena, ...sinClave } = creado.toJSON();
        return sinClave;
    } catch (error) {
        handleError(error, 'Error al registrar el usuario');
    }
};

exports.login = async (correo, contrasena) => {
    try {
        const user = await Usuario.findOne({ where: { correo } });

        if (!user) throw new UnauthorizedError('Usuario no existe');

        const valid = await bcrypt.compare(contrasena, user.contrasena);

        if (!valid) throw new UnauthorizedError('Credenciales inválidas');

        const token = jwtUtil.generarToken(user);

        return { user, token };
    } catch (error) {
        handleError(error, 'Error al iniciar sesión');
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