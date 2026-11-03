const bcrypt = require('bcrypt');
const { usuario, rol, permiso, tipoDoc } = require('../models');
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

        // Consultamos rol y tipo de documento
        const rolUsuario = await rol.findByPk(user.idRol);
        const tipo = await tipoDoc.findByPk(user.idTipoDoc);
                
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

        // Quitamos la contraseña del objeto usuario
        const { contrasena: _omitida, ...usuarioSinClave } = user.toJSON();

        return { 
            token, 
            usuario: { 
                ...usuarioSinClave, 
                rol: rolUsuario ? rolUsuario.nombre : null, 
                tipoDoc: tipo ? tipo.nombre : null 
            } 
        };
    } catch (error) {
        handleError(error, 'Error al iniciar sesión');
    }
};

module.exports = { login };