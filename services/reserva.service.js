const Reserva = require ('../models/reserva.model');
const BusinessError = require('../errors/BusinessError')

exports.getMine = (idUsuario) => Reserva.findAll({ where: { idUsuario } });

exports.getAll = async () => {
    return await Reserva.findAll();
};

exports.create = async (data) => {
    return await Reserva.create(data);
};

exports.update = async (id,data) => {
    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
        throw new Error('Reserva no encontrado');
    }
    return await reserva.update(data);
};

exports.cancel = async (id, idUsuario) => {
  const reserva = await Reserva.findByPk(id);
  if (!reserva || reserva.idUsuario !== idUsuario) throw new Error('Reserva no encontrado');
  if (reserva.estado !== 'Pendiente') throw new BusinessError('Solo se pueden cancelar reservas pendientes');
  await reserva.destroy();
  return { message: 'Reserva cancelada' };
};