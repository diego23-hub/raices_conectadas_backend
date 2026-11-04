const service = require('../services/usuario.service');

exports.create = async (req, res, next) => {
    try { res.status(201).json(await service.register(req.body)); } catch (err) { next(err); }
};
exports.getAll = async (req, res, next) => {
    try { res.status(200).json(await service.getAll()); } catch (err) { next(err); }
};
exports.getById = async (req, res, next) => {
    try { res.status(200).json(await service.getById(req.params.id)); } catch (err) { next(err); }
};
exports.update = async (req, res, next) => {
    try { res.status(200).json(await service.update(req.params.id, req.body)); } catch (err) { next(err); }
};
exports.delete = async (req, res, next) => {
    try { res.status(200).json(await service.delete(req.params.id)); } catch (err) { next(err); }
};