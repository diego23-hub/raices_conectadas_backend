const express= require('express');
const router=express.Router();
const proveedorController=require('../controllers/proveedor.controller');
const authorize=require('../middlewares/authorize');
const authenticate=require('../middlewares/authenticate');

router.get('/', proveedorController.getAll);
router.get('/:id', proveedorController.getById);
router.post('/', authenticate,authorize('proveedor:crear'),proveedorController.create);
router.put('/:id', authenticate,authorize('proveedor:editar'), proveedorController.update);
router.delete('/:id', authenticate,authorize('proveedor:eliminar'),proveedorController.delete);
module.exports=router;