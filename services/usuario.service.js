const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario.model');
const jwtUtil = require('../utils/jwt');

exports.register = async (data) => {

    return await Usuario.create(data)
};

exports.login = async (correo, contrasena) => {
    const user = await Usuario.findOne({ where: { correo } });

    if (!user) throw new Error('Usuario no existe');

    const valid = await bcrypt.compare(contrasena, user.contrasena);

    if (!valid) throw new Error('Credenciales inválidas');

    const token = jwtUtil.generarToken(user);

    return { user, token };
};
exports.getAll = async () => {
    return await Usuario.findAll({ attributes: { exclude: ['contrasena'] } });
};

exports.getById = async (id) => {
    return await Usuario.findByPk(id, { attributes: { exclude: ['contrasena'] } });
};

exports.update = async (id, data) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuario no encontrado'); 
    return await usuario.update(data);
};

exports.delete = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuario no encontrado');
    await usuario.destroy();
    return { message: 'Usuario eliminado correctamente' };
};