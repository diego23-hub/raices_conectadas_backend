require('dotenv').config();
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.error('Falta JWT_SECRET en el .env, o es demasiado corto (mínimo 32 caracteres)');
    process.exit(1);
};

const express=require('express');
const cors = require('cors');
const logger=require("./middlewares/logger");
const app=express();

const helmet = require('helmet');
app.use(helmet());

app.use(cors());

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
app.use('/paquete',paqueteRoutes);
app.use('/proveedor', proveedorRoutes);
app.use('/reserva',authenticate, reservaRoutes);
app.use('/auth', authRoutes);
app.use('/roles', rolRoutes);

const handleError=require("./middlewares/handleError");
app.use(handleError);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
