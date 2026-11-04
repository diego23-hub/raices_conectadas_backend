const BusinessError = require('../errors/BusinessError');

exports.elegir = (obj, campos) =>
    Object.fromEntries(campos.filter((c) => obj[c] !== undefined).map((c) => [c, obj[c]]));

exports.texto = (valor, nombre, { min = 1, max = 255, requerido = true } = {}) => {
    if (valor === undefined) {
        if (requerido) throw new BusinessError(`El campo ${nombre} es obligatorio`);
        return;
    }
    if (typeof valor !== 'string' || valor.trim().length < min || valor.length > max) {
        throw new BusinessError(`El campo ${nombre} no es válido`);
    }
};

exports.entero = (valor, nombre, { min = 0, max = 1000000, requerido = true } = {}) => {
    if (valor === undefined) {
        if (requerido) throw new BusinessError(`El campo ${nombre} es obligatorio`);
        return;
    }
    const n = Number(valor);
    if (!Number.isInteger(n) || n < min || n > max) throw new BusinessError(`El campo ${nombre} no es válido`);
};

exports.fecha = (valor, nombre, { requerido = true } = {}) => {
    if (valor === undefined) {
        if (requerido) throw new BusinessError(`El campo ${nombre} es obligatorio`);
        return;
    }
    if (typeof valor !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valor) || Number.isNaN(Date.parse(valor))) {
        throw new BusinessError(`El campo ${nombre} no es una fecha válida (AAAA-MM-DD)`);
    }
};

exports.numero = (valor, nombre, { min = 0, max = 1000000000, requerido = true } = {}) => {
    if (valor === undefined) {
        if (requerido) throw new BusinessError(`El campo ${nombre} es obligatorio`);
        return;
    }
    const n = Number(valor);
    if (!Number.isFinite(n) || n < min || n > max) throw new BusinessError(`El campo ${nombre} no es válido`);
};

exports.patron = (valor, nombre, regex, { requerido = true } = {}) => {
    if (valor === undefined) {
        if (requerido) throw new BusinessError(`El campo ${nombre} es obligatorio`);
        return;
    }
    if (typeof valor !== 'string' || !regex.test(valor)) throw new BusinessError(`El campo ${nombre} no es válido`);
};