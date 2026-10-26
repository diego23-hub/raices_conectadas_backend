const express= require('express');
const router=express.Router();
const rolController=require('../controllers/rol.controller');
const authorize=require('../middlewares/authorize')
router.get('/', authorize("Listar rol"), rolController.getAll);
router.get('/:id', authorize("ConsultarrolByID"),rolController.getById);
module.exports=router;