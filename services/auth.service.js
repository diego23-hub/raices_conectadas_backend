const bcrypt = require('bcrypt');
const { usuario, rol, permiso } = require('../models');
const BusinessError = require('../errors/BusinessError');
const SystemError = require('../errors/SystemError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { generateToken } = require('../utils/jwt.util');

// Deja pasar tus errores propios y envuelve cualquier otro como SystemError
const handleError = (error, defaultMessage) => {
    if (
        error instanceof BusinessError ||
        error instanceof UnauthorizedError ||
        error instanceof SystemError
    ) {
        throw error;
    }
    console.error(error);
    throw new SystemError(defaultMessage);
};

const login = async ({ correo, contrasena }) => {
    try {
        if (!correo || !contrasena) {
            throw new BusinessError('Correo y contraseña son obligatorios');
        }

        const user = await usuario.findOne({ where: { correo } });
        if (!user) throw new UnauthorizedError('Credenciales inválidas');

        const valida = await bcrypt.compare(contrasena, user.contrasena);
        if (!valida) throw new UnauthorizedError('Credenciales inválidas');

        const permisos = await permiso.findAll({
            include: {
                model: rol,
                where: { id: user.idRol },
                attributes: [],
                through: { attributes: [] }
            }
        });

        const token = generateToken({
            id: user.id,
            idRol: user.idRol,
            permisos: permisos.map((p) => p.nombre)
        });

        const { contrasena: _omitida, ...usuarioSinClave } = user.toJSON();
        return { token, usuario: usuarioSinClave };
    } catch (error) {
        handleError(error, 'Error al iniciar sesión');
    }
};

module.exports = { login };