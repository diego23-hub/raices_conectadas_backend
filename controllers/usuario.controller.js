const service=require("../services/usuario.service");

exports.register = async (req, res) => {
    try {
        const user = await service.register(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
try {
        const { correo, contrasena } = req.body;
        const data = await service.login(correo, contrasena);
        res.json(data);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

exports.getAll= async(req,res)=>{
    try{
        const usuarios=await service.getAll();
        res.status(200).json(usuarios);
    } catch(err){
        res.status(500).json({error:err.message});
    }
};
exports.getById= async(req,res)=>{
    try{
        const {id} = req.params;
        const usuario=await service.getById(id);

        if(!usuario){
            return res.status(404).json({error:'Usuario no encontrado'});
        }
        res.status(200).json(usuario);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};
exports.create= async(req,res)=>{
    try{
        const user=await service.register(req.body);
        res.status(201).json(user);
    }catch (err){
        res.status(400).json({error: err.message});
    }
};
exports.update= async(req,res)=>{
    try{
        const {id}= req.params;
        const updateUser =await service.update(id,req.body);
        res.status(200).json(updateUser);
    }catch(err){
        if(err.message ==='Usuario no encontrado'){
            return res.status(404).json({error:err.message});
        }
        res.status(400).json({error:err.message});
    }
};
exports.delete= async(req,res)=>{
    try{
        const {id}=req.params;
        const result = await service.delete(id);
        res.status(200).json(result);
    } catch(err){
        if(err.message==='Usuario no encontrado'){
            return res.status(404).json({error:err.message});
        }
        res.status(500).json({error:err.message});
    }
};