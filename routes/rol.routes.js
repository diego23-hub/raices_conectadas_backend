const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.get('/', authenticate, authorize('rol:consultar'), rolController.obtenerTodos);
router.get('/:id', authenticate, authorize('rol:consultar'), rolController.obtenerPorId);

module.exports = router;