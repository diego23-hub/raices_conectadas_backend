const authrorize = (requiredPermission)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        console.log("MIDDLEWARE - Permisos del usuario en req.user:", req.user.permisos);
        console.log("MIDDLEWARE - Permiso que exige la ruta:", requiredPermission);

        const permisos = req.user.permisos || [];
        if (!permisos.includes(requiredPermission)) {
            return res.status(403).json({ message: "No tiene permisos para realizar esta acción" });
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
