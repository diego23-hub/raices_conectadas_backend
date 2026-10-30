const express= require('express');
const router=express.Router();
const reservaController=require('../controllers/reserva.controller');
const authorize=require('../middlewares/authorize');

router.get('/mis', authorize('reserva:consultar'),reservaController.getMine);
router.get('/', authorize('reserva:listar'), reservaController.getAll);
router.post('/', authorize('reserva:crear'),reservaController.create);
router.put('/:id', authorize('reserva:editar'),reservaController.update);
router.delete('/:id', authorize('reserva:cancelar'),reservaController.cancel);
module.exports=router;