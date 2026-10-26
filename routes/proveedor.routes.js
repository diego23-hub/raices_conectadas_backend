const express= require('express');
const router=express.Router();
const proveedorController=require('../controllers/proveedor.controller');
const authorize=require('../middlewares/authorize')
router.get('/', authorize("Listar proveedor"), proveedorController.getAll);
router.get('/:id', authorize("ConsultarproveedorByID"),proveedorController.getById);
router.post('/', proveedorController.create);
router.put('/:id', proveedorController.update);
router.delete('/:id', proveedorController.delete);
module.exports=router;