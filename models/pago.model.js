const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const pago = sequelize.define(
    "pago",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idReserva:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idMetodoPago:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        referencia: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        monto:{
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            get() { return Number(this.getDataValue('monto')); }
        },
        fecha:{
            type: DataTypes.DATE,
            allowNull: false
        },
        estado:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'pago',
        timestamps: false
    }
);
module.exports=pago;