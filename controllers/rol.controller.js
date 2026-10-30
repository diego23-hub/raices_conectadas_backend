const rolService = require("../services/rol.service");

const obtenerTodos = async (req, res, next) => {
    try {
        const roles = await rolService.obtenerTodos();

        res.status(200).json({
            success: true,
            data: roles
        });
    } catch (error) {
        next(error);
    }
};

const obtenerPorId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const rol = await rolService.obtenerPorId(id);

        res.status(200).json({
            success: true,
            data: rol
        });
    } catch (error) {
        next(error);
    }
};

const crear = async (req, res, next) => {
    try {
        const rol = await rolService.crear(req.body);

        res.status(201).json({
            success: true,
            message: "Rol creado correctamente.",
            data: rol
        });
    } catch (error) {
        next(error);
    }
};

const actualizar = async (req, res, next) => {
    try {
        const { id } = req.params;

        const rol = await rolService.actualizar(id, req.body);

        res.status(200).json({
            success: true,
            message: "Rol actualizado correctamente.",
            data: rol
        });
    } catch (error) {
        next(error);
    }
};

const eliminar = async (req, res, next) => {
    try {
        const { id } = req.params;

        await rolService.eliminar(id);

        res.status(200).json({
            success: true,
            message: "Rol eliminado correctamente."
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};