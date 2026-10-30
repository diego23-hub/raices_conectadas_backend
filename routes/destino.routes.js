const express= require('express');
const router=express.Router();
const destinoController=require('../controllers/destino.controller');
const authorize=require('../middlewares/authorize')
router.get('/', authorize("Listar destino"), destinoController.getAll);
router.get('/:id', authorize("ConsultardestinoByID"),destinoController.getById);
router.post('/', destinoController.create);
router.put('/:id', destinoController.update);
router.delete('/:id', destinoController.delete);
module.exports=router;