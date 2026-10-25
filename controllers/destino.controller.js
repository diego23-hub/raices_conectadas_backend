const service = require('../services/destino.service');

exports.getAll = async (req, res) => {
    try {
        const destinos = await service.getAll();
        res.status(200).json(destinos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const destino = await service.getById(id);
        res.status(200).json(destino);
    } catch (err) {
        if (err.message === 'Destino no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const destino = await service.create(req.body);
        res.status(201).json(destino);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const updateDestino = await service.update(id, req.body);
        res.status(200).json(updateDestino);
    } catch (err) {
        if (err.message === 'Destino no encontrado') {
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
        if (err.message === 'Destino no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }
};