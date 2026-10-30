const express= require('express');
const router=express.Router();
const usuarioController=require('../controllers/usuario.controller');
const authenticate = require('../middlewares/auth');
const authorize = require('../middlewares/auth');

router.get('/', authenticate, authorize('usuario:listar'), usuarioController.getAll);
router.get('/:id', authenticate, authorize('usuario:consultar'), usuarioController.getById);
router.post('/', usuarioController.create);
router.put('/:id', authenticate, authorize('usuario:editar'), usuarioController.update);
router.delete('/:id', authenticate, authorize('usuario:eliminar'), usuarioController.delete);

module.exports=router;