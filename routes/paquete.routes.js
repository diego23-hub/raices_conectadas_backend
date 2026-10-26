const express= require('express');
const router=express.Router();
const paqueteController=require('../controllers/paquete.controller');
const authorize=require('../middlewares/authorize')
router.get('/', authorize("Listar paquete"), paqueteController.getAll);
router.get('/:id', authorize("ConsultarpaqueteByID"),paqueteController.getById);
router.post('/', paqueteController.create);
router.put('/:id', paqueteController.update);
router.delete('/:id', paqueteController.delete);
module.exports=router;