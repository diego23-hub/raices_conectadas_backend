const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const login = async ({ correo, contrasena }) => {
    const user = await User.findOne({
        where: { correo }
    })
    if (!user) {
        throw new Error('Credenciales inválidas');
    }
    const validContrasena = await bcrypt.compare(contrasena, user.contrasena);
    if (!validContrasena) {
        throw new Error('Credenciales inválidas');
    }
    return generateToken({
        id: user.id,
        role: user.role
    });
};
module.exports = {
    login
};