require('dotenv').config();
const express=require('express')
const logger=require("./middlewares/logger")
const app=express();
const corsMiddleware=require("./middlewares/corsMiddleware");
app.use(corsMiddleware);
const authenticate = require('./middlewares/authenticate');
app.use(express.json());
app.use(logger.logger);

const { sequelize } = require('./models');
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => console.log('Conectado a MySQL'))
  .catch((error) => console.error('Error de conexión a MySQL:', error.message));

const usuarioRoutes=require("./routes/usuario.routes");
const destinoRoutes=require("./routes/destino.routes");
const eventoRoutes=require("./routes/evento.routes");
const paqueteRoutes=require("./routes/paquete.routes");
const proveedorRoutes=require("./routes/proveedor.routes");
const reservaRoutes=require("./routes/reserva.routes");
const authRoutes=require("./routes/auth.routes");
const rolRoutes=require("./routes/rol.routes");

app.use('/usuario', usuarioRoutes);
app.use('/destino', destinoRoutes);
app.use('/evento', eventoRoutes);
app.use('/paquete', authenticate,paqueteRoutes);
app.use('/proveedor', proveedorRoutes);
app.use('/reserva',authenticate, reservaRoutes);
app.use('/auth', authRoutes);
app.use('/roles', rolRoutes);

const handleError=require("./middlewares/handleError");
app.use(handleError);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
