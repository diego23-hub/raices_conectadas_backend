const express= require('express');
const router=express.Router();
const paqueteController=require('../controllers/paquete.controller');
const authorize=require('../middlewares/authorize');
const authenticate=require('../middlewares/authenticate');

router.get('/', authenticate, paqueteController.getAll);
router.get('/:id', authenticate,paqueteController.getById);
router.post('/', authenticate,authorize('paquete:crear'),paqueteController.create);
router.put('/:id', authenticate,authorize('paquete:editar'),paqueteController.update);
router.delete('/:id', authenticate,authorize('paquete:eliminar'),paqueteController.delete);
module.exports=router;