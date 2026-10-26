const express= require('express');
const router=express.Router();
const reservaController=require('../controllers/reserva.controller');
const authorize=require('../middlewares/authorize')
router.get('/', authorize("Listar reserva"), reservaController.getAll);
router.get('/:id', authorize("ConsultarreservaByID"),reservaController.getById);
router.post('/', reservaController.create);
router.put('/:id', reservaController.update);
router.delete('/:id', reservaController.delete);
module.exports=router;