const authService = require('../services/auth.service');
const login = async (req, res, next) => {
    try {
        const resultado = await authService.login(req.body);
        res.status(200).json({ message: 'Inicio de sesión exitoso', ...resultado });
    } catch (error) {
        next(error);
    }
};
module.exports = {
login
};