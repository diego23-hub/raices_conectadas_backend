const { randomUUID } = require('crypto');
const {
    sequelize, reserva: Reserva, paquete: Paquete, proveedor: Proveedor,
    pago: Pago, metodoPago: MetodoPago, notificacion: Notificacion
} = require('../models');
const BusinessError = require('../errors/BusinessError');
const SystemError = require('../errors/SystemError');
const { idPorNombre } = require('../utils/tipos');

const handleError = (error, defaultMessage) => {
    if (error instanceof BusinessError || error instanceof SystemError) {
        throw error;
    }
    console.error(error);
    throw new SystemError(defaultMessage);
};

// SIMULACIÓN DE PASARELA (demo académica). En producción se reemplaza por un proveedor
// real (p. ej. BOLD) con webhook verificado por firma, clave de idempotencia y
// referencia externa. Probabilidad de rechazo configurable en el .env.
const PROB_RECHAZO = Number(process.env.PAGO_PROB_RECHAZO ?? 0.2);

exports.pagar = async (id, idUsuario, metodo) => {
    try {
        const fueAprobado = await sequelize.transaction(async (t) => {
            // lock: bloquea la reserva mientras se paga, así un doble clic no cobra dos veces
            const reserva = await Reserva.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE });
            if (!reserva || reserva.idUsuario !== idUsuario) {
                throw new BusinessError('Reserva no encontrada', 404);
            }
            if (reserva.estado !== 'pendiente') {
                throw new BusinessError('La reserva ya no está pendiente', 409);
            }

            const idMetodoPago = await idPorNombre(MetodoPago, metodo, 'Método de pago');
            const aprobado = Math.random() >= PROB_RECHAZO;

            await Pago.create({
                idReserva: reserva.id,
                idMetodoPago,
                referencia: `${aprobado ? 'SIM' : 'RECH'}-${randomUUID()}`,
                monto: reserva.total,
                fecha: new Date(),
                estado: aprobado ? 'aprobado' : 'rechazado'
            }, { transaction: t });

            if (aprobado) {
                await reserva.update({ estado: 'pagada' }, { transaction: t });

                const paquete = await Paquete.findByPk(reserva.idPaquete, { transaction: t });
                const proveedores = await Proveedor.findAll({
                    where: { idDestino: paquete.idDestino }, transaction: t
                });
                await Notificacion.bulkCreate(
                    proveedores.map((p) => ({
                        idReserva: reserva.id,
                        idProveedor: p.id,
                        estado: 'pendiente',
                        fechaCreacion: new Date()
                    })),
                    { transaction: t }
                );
            }

            return aprobado;   
        });

        if (!fueAprobado) throw new BusinessError('Pago rechazado', 402);

        return await Reserva.findByPk(id);
    } catch (error) {
        handleError(error, 'Error al procesar el pago');
    }
};