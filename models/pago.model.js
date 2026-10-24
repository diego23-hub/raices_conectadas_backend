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
        metodo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        referencia:{
            type: DataTypes.STRING,
            allowNull: false
        },
        monto:{
            type: DataTypes.DECIMAL,
            allowNull: false
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