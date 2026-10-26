const bcrypt = require('bcryptjs');
const { usuario, rol, permiso } = require('../models');
const { generateToken } = require('../utils/jwt.util');

const credencialesInvalidas = () => {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    return error;
};

const login = async ({ correo, contrasena }) => {
    const user = await usuario.findOne({ where: { correo } });
    if (!user) throw credencialesInvalidas();

    const valida = await bcrypt.compare(contrasena, user.contrasena);
    if (!valida) throw credencialesInvalidas();

    const permisos = await permiso.findAll({
        include: { model: rol, where: { id: user.idRol }, attributes: [], through: { attributes: [] } }
    });

    const token = generateToken({
        id: user.id,
        idRol: user.idRol,
        permisos: permisos.map((p) => p.nombre)
    });

    const { contrasena: _omitida, ...usuarioSinClave } = user.toJSON();
    return { token, usuario: usuarioSinClave };
};

module.exports = { login };