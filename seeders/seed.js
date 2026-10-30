require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {
  sequelize, usuario, destino, evento, paquete, proveedor,
  tipoDestino, tipoEvento, tipoDoc, tipoProveedor, rol, permiso, rolPermiso
} = require('../models');

const datos = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));

const cargarTipos = async (modelo, nombres) => {
  await modelo.bulkCreate(nombres.map((nombre) => ({ nombre })));
  const filas = await modelo.findAll();
  return Object.fromEntries(filas.map((fila) => [fila.nombre, fila.id]));
};

const normalizarEvento = (tipo) => (tipo === 'Historico' ? 'Histórico' : tipo);

const sembrar = async () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('El seed borra todas las tablas: no se ejecuta en producción');
  }

  await sequelize.sync({ force: true });
  await tipoDoc.bulkCreate([
    { nombre: 'CC', aplicaIva: true },
    { nombre: 'TI', aplicaIva: true },
    { nombre: 'CE', aplicaIva: false },
    { nombre: 'Pasaporte', aplicaIva: false }
  ]);
  const tiposDoc = Object.fromEntries((await tipoDoc.findAll()).map((t) => [t.nombre, t.id]));

  const tiposDestino = await cargarTipos(tipoDestino, ['Arquitectónico', 'Inmaterial', 'Gastronómico']);
  const tiposEvento = await cargarTipos(
    tipoEvento,
    [...new Set(datos.eventos.map((e) => normalizarEvento(e.tipoEvento)))]
  );
  const tiposProveedor = await cargarTipos(tipoProveedor, ['Hotel', 'Transporte', 'Guía', 'Restaurante']);

  const roles = await cargarTipos(rol, ['admin', 'viajero']);

  const entidades = ['destino', 'evento', 'paquete', 'proveedor'];
  const permisosAdmin = [
    ...entidades.flatMap((e) => ['crear', 'editar', 'eliminar'].map((accion) => `${e}:${accion}`)),
    'usuario:listar', 'usuario:consultar', 'usuario:editar', 'usuario:eliminar',
    'rol:consultar',
    'reserva:listar'
  ];
  const permisosViajero = [
    'reserva:crear', 'reserva:consultar', 'reserva:editar', 'reserva:cancelar', 'pago:procesar'
  ];
  const mapaPermisos = await cargarTipos(permiso, [...permisosAdmin, ...permisosViajero]);

  await rolPermiso.bulkCreate([
    ...permisosAdmin.map((nombre) => ({ idRol: roles.admin, idPermiso: mapaPermisos[nombre] })),
    ...permisosViajero.map((nombre) => ({ idRol: roles.viajero, idPermiso: mapaPermisos[nombre] }))
  ]);

  await destino.bulkCreate(datos.destinos.map((d) => ({
    id: d.id,
    nombre: d.nombre,
    descripcion: d.descripcion,
    idTipoDestino: tiposDestino[d.tipo]
  })));

  await paquete.bulkCreate(datos.paquetes.map((p) => ({
    id: p.id,
    nombre: p.nombre,
    precio: p.precio,
    descripcion: p.descripcion,
    duracion: p.duracion,
    incluye: p.incluye,
    itinerario: p.itinerario,
    limitePersonas: p.limitePersonas,
    idDestino: p.idDestino
  })));

  await proveedor.bulkCreate(datos.proveedores.map((p) => ({
    id: p.id,
    nombre: p.nombre,
    ubicacion: p.lugar,
    descripcion: p.descripcion,
    telefono: p.telefono,
    correo: p.correo,
    idDestino: p.idDestino,
    idTipoProveedor: tiposProveedor[p.tipo]
  })));

  await evento.bulkCreate(datos.eventos.map((e) => ({
    id: e.id,
    nombre: e.nombre,
    descripcion: e.descripcion,
    fechaInicio: e.fechaInicio,
    fechaFin: e.fechaFin,
    idDestino: e.idDestino,
    idTipoEvento: tiposEvento[normalizarEvento(e.tipoEvento)]
  })));

  await usuario.bulkCreate(datos.viajeros.map((v) => ({
    idTipoDoc: tiposDoc[v.tipoDoc],
    numDoc: v.numDoc,
    nombres: v.nombres,
    apellidos: v.apellidos,
    telefono: v.telefono,
    correo: v.correo,
    contrasena: v.contrasena,
    idRol: roles[v.rol]
  })), { individualHooks: true });

  console.log('Tablas creadas y datos cargados');
};

sembrar()
  .catch((error) => console.error('Error en el seed:', error.message))
  .finally(() => sequelize.close());