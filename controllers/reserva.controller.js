const service = require('../services/reserva.service');

exports.getAll = async (req, res) => {
    try {
        const reserva = await service.getAll();
        res.status(200).json(reserva);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await service.getById(id);
        res.status(200).json(reserva);
    } catch (err) {
        if (err.message === 'Reserva no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const reserva = await service.create(req.body);
        res.status(201).json(reserva);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const updateReserva = await service.update(id, req.body);
        res.status(200).json(updateReserva);
    } catch (err) {
        if (err.message === 'Reserva no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(400).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.delete(id);
        res.status(200).json(result);
    } catch (err) {
        if (err.message === 'Reserva no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }
}; 

exports.getMine = async (req, res, next) => {
  try { res.json(await service.getMine(req.user.id)); } catch (e) { next(e); }
};
exports.cancel = async (req, res, next) => {
  try { res.json(await service.cancel(req.params.id, req.user.id)); } catch (e) { next(e); }
};
