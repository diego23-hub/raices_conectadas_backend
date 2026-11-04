const BusinessError = require('../errors/BusinessError');

exports.idPorNombre = async (modelo, nombre, etiqueta) => {
    if (!nombre) throw new BusinessError(`${etiqueta} es obligatorio`);
    const fila = await modelo.findOne({ where: { nombre } });
    if (!fila) throw new BusinessError(`${etiqueta} no válido: ${nombre}`);
    return fila.id;
};