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
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idPaquete:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fechaInicio: {
            type:DataTypes.DATEONLY,
            allowNull: false
        },
        fechaFinal:{
            type:DataTypes.DATEONLY,
            allowNull: false
        },
        cantidadPersonas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subtotal: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            get() { return Number(this.getDataValue('subtotal')); }
        },
        iva:{
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            get() { return Number(this.getDataValue('iva')); }
        },
        total: {
            type:DataTypes.DECIMAL(12, 2),
            allowNull: false,
            get() { return Number(this.getDataValue('total')); }
        },
        adultos:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        bebes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        jovenes:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        ninos:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        estado: {
            type:DataTypes.STRING,
            allowNull: false
        },
        numSeguimiento:{
            type:DataTypes.STRING,
            allowNull: true, 
            unique:true
        }
    },
    {
        tableName: 'reserva',
        timestamps: false
    }
);
module.exports=reserva;