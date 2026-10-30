const express= require('express');
const router=express.Router();
const destinoController=require('../controllers/destino.controller');
const authorize=require('../middlewares/authorize');
const authenticate = require('../middlewares/authenticate');

router.get('/', destinoController.getAll);
router.get('/:id', destinoController.getById);
router.post('/', authenticate, authorize('destino:crear'), destinoController.create);
router.put('/:id', authenticate,authorize('destino:editar'),destinoController.update);
router.delete('/:id', authenticate,authorize('destino:eliminar'),destinoController.delete);
module.exports=router;