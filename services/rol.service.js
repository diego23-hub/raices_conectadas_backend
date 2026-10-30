const Rol = require("../models/rol.model");

const obtenerTodos = async () => {
    return await Rol.findAll();
};

const obtenerPorId = async (id) => {
    const rol = await Rol.findByPk(id);

    if (!rol) {
        throw new Error("El rol no existe.");
    }

    return rol;
};

const crear = async (datos) => {
    const existe = await Rol.findOne({
        where: {
            nombre: datos.nombre
        }
    });

    if (existe) {
        throw new Error("Ya existe un rol con ese nombre.");
    }

    return await Rol.create(datos);
};

const actualizar = async (id, datos) => {
    const rol = await obtenerPorId(id);

    if (datos.nombre && datos.nombre !== rol.nombre) {
        const existe = await Rol.findOne({
            where: {
                nombre: datos.nombre
            }
        });

        if (existe) {
            throw new Error("Ya existe un rol con ese nombre.");
        }
    }

    await rol.update(datos);

    return rol;
};

const eliminar = async (id) => {
    const rol = await obtenerPorId(id);

    await rol.destroy();
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};