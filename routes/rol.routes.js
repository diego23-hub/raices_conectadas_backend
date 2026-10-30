const express = require("express");
const router = express.Router();

const rolController = require("../controllers/rol.controller");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

// Obtener todos los roles
router.get(
    "/",
    authenticate,
    authorize(["rol.consultar"]),
    rolController.obtenerTodos
);

// Obtener un rol por id
router.get(
    "/:id",
    authenticate,
    authorize(["rol.consultar"]),
    rolController.obtenerPorId
);

// Crear un rol
router.post(
    "/",
    authenticate,
    authorize(["rol.crear"]),
    rolController.crear
);

// Actualizar un rol
router.put(
    "/:id",
    authenticate,
    authorize(["rol.actualizar"]),
    rolController.actualizar
);

// Eliminar un rol
router.delete(
    "/:id",
    authenticate,
    authorize(["rol.eliminar"]),
    rolController.eliminar
);

module.exports = router;