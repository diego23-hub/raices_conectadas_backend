const { usuario: Usuario, rol } = require('../models');
const 

exports.register = async (data) => {
    const { idRol, ...datosSeguros } = data;   // ignora el rol que mande el cliente
    const rolViajero = await rol.findOne({ where: { nombre: 'viajero' } });
    const creado = await Usuario.create({ ...datosSeguros, idRol: rolViajero.id });
    const { contrasena, ...sinClave } = creado.toJSON();
    return sinClave;
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