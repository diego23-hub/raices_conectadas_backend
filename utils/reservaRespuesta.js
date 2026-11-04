const { pago: Pago, metodoPago: MetodoPago } = require('../models');

const aRespuestaLista = async (reservas) => {
    if (!reservas.length) return [];
    const pagos = await Pago.findAll({
        where: { idReserva: reservas.map((r) => r.id), estado: 'aprobado' }
    });
    const metodos = Object.fromEntries(
        (await MetodoPago.findAll()).map((m) => [m.id, m.nombre.toLowerCase()])
    );
    const porReserva = Object.fromEntries(pagos.map((p) => [p.idReserva, p]));

    return reservas.map((r) => {
        const p = porReserva[r.id];
        return {
            id: r.id,
            idViajero: r.idUsuario,
            idPaquete: r.idPaquete,
            fechaInicio: r.fechaInicio,
            fechaFinal: r.fechaFinal,
            cantidadPersonas: r.cantidadPersonas,
            subtotal: r.subtotal,
            iva: r.iva,
            total: r.total,
            detalleEdades: { adultos: r.adultos, jovenes: r.jovenes, ninos: r.ninos, bebes: r.bebes },
            estado: r.estado,
            numSeguimiento: r.numSeguimiento,
            ...(p && { pago: {
                metodo: metodos[p.idMetodoPago],
                referencia: p.referencia,
                fecha: p.fecha,
                monto: p.monto
            } })
        };
    });
};

exports.aRespuestaLista = aRespuestaLista;
exports.aRespuesta = async (reserva) => (await aRespuestaLista([reserva]))[0];