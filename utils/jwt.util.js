const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'mi_secreto';

exports.generarToken = (usuario) => {

   return jwt.sign(

       {

           id: usuario.id,

           email: usuario.correo

       },

       SECRET,

       { expiresIn: '1h' }

   );

};

 

exports.verificarToken = (token) => {

   return jwt.verify(token, SECRET);

};