const service = require('../services/evento.service');

exports.getAll = async (req, res) => {
    try {
        const evento = await service.getAll();
        res.status(200).json(evento);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await service.getById(id);
        res.status(200).json(evento);
    } catch (err) {
        if (err.message === 'Evento no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const evento = await service.create(req.body);
        res.status(201).json(evento);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const updateEvento = await service.update(id, req.body);
        res.status(200).json(updateEvento);
    } catch (err) {
        if (err.message === 'Evento no encontrado') {
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
        if (err.message === 'Evento no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }
};
