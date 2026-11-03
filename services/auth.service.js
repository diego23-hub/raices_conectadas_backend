const bcrypt = require('bcrypt');
const { usuario, rol, permiso, tipoDoc, rolPermiso } = require('../models');
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

        console.log("Correo buscado:", correo);
        console.log("Contraseña que llegó del frontend:", contrasena);
        console.log("Hash guardado en la BD:", user.contrasena);

        const valida = await bcrypt.compare(contrasena, user.contrasena);
        console.log("¿La contraseña coincidió?", valida);
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
        const permisosNombres = rolUsuario && rolUsuario.permisos 
            ? rolUsuario.permisos.map((p) => p.nombre) 
            : [];

        console.log("LOGÍN - Permisos que van para el token:", permisosNombres);

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

module.exports = { login };