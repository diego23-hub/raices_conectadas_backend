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
}