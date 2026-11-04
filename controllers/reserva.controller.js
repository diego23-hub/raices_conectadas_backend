const service = require('../services/reserva.service');
const pagoService = require('../services/pago.service');

exports.getMine = async (req, res, next) => {
  try { res.json(await service.getMine(req.user.id)); } catch (e) { next(e); }
};

exports.getAll = async (req, res, next) => {
    try {
        res.status(200).json(await service.getAll());
    } catch (err) {
        next(err);
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
        res.json(await pagoService.pagar(req.params.id, req.user.id, req.body.metodo));
    } catch (err) {
        next(err);
    }
};

exports.cancel = async (req, res, next) => {
  try { res.json(await service.cancel(req.params.id, req.user.id)); } catch (e) { next(e); }
};
