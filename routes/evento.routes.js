const express= require('express');
const router=express.Router();
const eventoController=require('../controllers/evento.controller');
const authorize=require('../middlewares/authorize')
router.get('/', authorize("Listar evento"), eventoController.getAll);
router.get('/:id', authorize("ConsultareventoByID"),eventoController.getById);
router.post('/', eventoController.create);
router.put('/:id', eventoController.update);
router.delete('/:id', eventoController.delete);
module.exports=router;