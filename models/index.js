const usuario = require("./usuario.model");
const destino = require("./destino.model");
const evento = require("./evento.model");
const paquete = require("./paquete.model");
const proveedor = require("./proveedor.model");
const reserva = require("./reserva.model");
const notificacion = require("./notificacion.model");
const pago = require("./pago.model");

const tipoDestino = require("./tipo.destino.model");
const tipoEvento = require("./tipo.evento.model");
const tipoDoc = require("./tipo.doc.model");
const tipoProveedor = require("./tipo.proveedor.model");

const user = require("./user.model");
const rol = require("./rol.model");
const rolPermiso = require("./rol.permiso.model");
const permiso = require("./permiso.model");

tipoDoc.hasMany(usuario,{
    foreignKey: "idTipoDoc"
});
usuario.belongsTo(tipoDoc,{
    foreignKey: "idTipoDoc"
});

usuario.hasMany(reserva,{
    foreignKey: "idUsuario"
});
reserva.belongsTo(usuario,{
    foreignKey:"idUsuario"
});

tipoDestino.hasMany(destino,{
    foreignKey: "idTipoDestino"
});
destino.belongsTo(tipoDestino,{
    foreignKey: "idTipoDestino"
});

tipoEvento.hasMany(evento,{
    foreignKey: "idTipoEvento"
});
evento.belongsTo(tipoEvento,{
    foreignKey: "idTipoEvento"
});

destino.hasMany(evento,{
    foreignKey: "idDestino"
});
evento.belongsTo(destino,{
    foreignKey: "idDestino"
});

destino.hasMany(paquete,{
    foreignKey:"idDestino"
});
paquete.belongsTo(destino,{
    foreignKey:"idDestino"
});

paquete.hasMany(reserva,{
    foreignKey:"idPaquete"
});
reserva.belongsTo(paquete,{
    foreignKey:"idPaquete"
});

tipoProveedor.hasMany(proveedor,{
    foreignKey:"idTipoProveedor"
});
proveedor.belongsTo(tipoProveedor,{
    foreignKey:"idTipoProveedor"
});

reserva.hasMany(notificacion,{
    foreignKey:"idReserva"
});
notificacion.belongsTo(reserva,{
    foreignKey:"idReserva"
});

proveedor.hasMany(notificacion,{
    foreignKey:"idProveedor"
});
notificacion.belongsTo(proveedor,{
    foreignKey:"idProveedor"
});

reserva.hasMany(pago,{
    foreignKey:"idReserva"
});
pago.belongsTo(reserva,{
    foreignKey:"idReserva"
});

destino.hasMany(proveedor,{
    foreignKey:"idDestino"
});
proveedor.belongsTo(destino,{
    foreignKey:"idDestino"
});

rol.belongsToMany(permiso,{
    through: rolPermiso,
    foreignKey: "idRol",
    otherKey: "idPermiso"
});
permiso.belongsToMany(rol,{
    through: rolPermiso,
    foreignKey: "idPermiso",
    otherKey: "idRol"
});