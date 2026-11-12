const bcrypt = require('bcryptjs');
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
        const rolUsuario = await rol.findByPk(user.idRol, {
            include: [{
                model: permiso,
                attributes: ['nombre'],
                through: { attributes: [] } // Evita traer los campos de la tabla intermedia
            }]
        });

        const tipo = await tipoDoc.findByPk(user.idTipoDoc);

        // Extraemos los nombres de los permisos directamente del rol encontrado
        const permisosNombres = (rolUsuario?.Permisos || []).map((p) => p.nombre);


        const token = generateToken({
            id: user.id,
            idRol: user.idRol,
            permisos: permisosNombres
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

const perfil = async (idUsuario) => {
    try {
        const user = await usuario.findByPk(idUsuario, { attributes: { exclude: ['contrasena'] } });
        if (!user) throw new UnauthorizedError('Sesión inválida');
        const rolUsuario = await rol.findByPk(user.idRol);
        const tipo = await tipoDoc.findByPk(user.idTipoDoc);
        return { ...user.toJSON(), rol: rolUsuario?.nombre ?? null, tipoDoc: tipo?.nombre ?? null };
    } catch (error) {
        handleError(error, 'Error al obtener el perfil');
    }
};

module.exports = { login, perfil };