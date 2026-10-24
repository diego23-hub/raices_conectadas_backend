const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const reserva = sequelize.define(
    "reserva",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUsuario:{
            type: DataTypes.STRING,
            allowNull: false
        },
        idPaquete:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaInicio: {
            type:DataTypes.DATE,
            allowNull: false
        },
        fechaFinal:{
            type:DataTypes.DATE,
            allowNull: false
        },
        cantidadPersonas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subtotal:{
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        iva:{
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        total: {
            type:DataTypes.DECIMAL,
            allowNull: false
        },
        adultos:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        bebes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jovenes:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ninos:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type:DataTypes.STRING,
            allowNull: false
        },
        numSeguimiento:{
            type:DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'reserva',
        timestamps: false
    }
);
module.exports=reserva;