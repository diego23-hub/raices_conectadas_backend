const express= require('express');
const router=express.Router();
const eventoController=require('../controllers/evento.controller');
const authorize=require('../middlewares/authorize');
const authenticate=require('../middlewares/authenticate');

router.get('/', eventoController.getAll);
router.get('/:id', eventoController.getById);
router.post('/', authenticate, authorize('evento:crear'),eventoController.create);
router.put('/:id', authenticate,authorize('evento:editar'),eventoController.update);
router.delete('/:id', authenticate,authorize('evento:eliminar'),eventoController.delete);
module.exports=router;