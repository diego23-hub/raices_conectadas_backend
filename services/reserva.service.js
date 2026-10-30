const Reserva = require ('../models/reserva.model');

exports.create = async (data) => {
    return await Reserva.create(data);
};

exports.getAll = async () => {
    return await Reserva.findAll();
};

exports.getById = async (id) => {
    const reserva = await Reserva.findByPk(id)
    if (!reserva) throw new Error('Reserva no encontrado');
    return reserva;
}

exports.update = async (id,data) => {
    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
        throw new Error('Reserva no encontrado');
    }
    return await reserva.update(data);
};

exports.delete = async (id) => {
    const reserva = await Reserva.findByPk(id);
    if(!reserva){
        throw new Error('Reserva no encontrado');
    }
    await reserva.destroy();
    return {message: 'Reserva eliminado correctamente'};
};

exports.getMine = (idUsuario) => Reserva.findAll({ where: { idUsuario } });

exports.cancel = async (id, idUsuario) => {
  const reserva = await Reserva.findByPk(id);
  if (!reserva || reserva.idUsuario !== idUsuario) throw new Error('Reserva no encontrado');
  if (reserva.estado !== 'Pendiente') throw new BusinessError('Solo se pueden cancelar reservas pendientes');
  await reserva.destroy();
  return { message: 'Reserva cancelada' };
};