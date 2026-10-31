const service = require('../services/reserva.service');

exports.getMine = async (req, res, next) => {
  try { res.json(await service.getMine(req.user.id)); } catch (e) { next(e); }
};

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

exports.create = async (req, res, next) => {
    try {
        const { idPaquete, fechaInicio, fechaFinal, detalleEdades = {} } = req.body;
        const reserva = await service.create(req.user.id, {
            idPaquete, fechaInicio, fechaFinal, ...detalleEdades
        });
        res.status(201).json(reserva);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { fechaInicio, fechaFinal, detalleEdades = {} } = req.body;
        res.json(await service.update(req.params.id, req.user.id, {
            fechaInicio, fechaFinal, ...detalleEdades
        }));
    } catch (err) {
        next(err);
    }
};

exports.pagar = async (req, res, next) => {
    try {
        res.json(await service.pagar(req.params.id, req.user.id, req.body.metodo));
    } catch (err) {
        next(err);
    }
};

exports.cancel = async (req, res, next) => {
  try { res.json(await service.cancel(req.params.id, req.user.id)); } catch (e) { next(e); }
};
