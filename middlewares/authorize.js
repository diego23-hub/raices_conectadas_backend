const authrorize = (requiredPermission)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const permiso = req.user.permiso || [];

        const tienePermiso= requiredPermission.some((permiso)=>
            permiso.includes(permiso)
        );
        if (!tienePermiso){
            return res.status(403).json({
                message: "No tiene permisos para realizar esta acción"
            });
        }
        /*
        if (!permiso.includes(requiredPermission)){
            return res.status(403).json({
                message: "No tiene permisos para realizar esta acción"
                });
            }*/
           next();
    };
};

module.exports=authrorize;
