const express= require('express');
const router=express.Router();
const usuarioController=require('../controllers/usuario.controller');
const authorize=require('../middlewares/authorize')
router.get('/', authorize("Listar usuarios"), usuarioController.getAll);
router.get('/:id', authorize("ConsultarUsuarioByID"),usuarioController.getById);
router.post('/', usuarioController.create);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.delete);
module.exports=router;