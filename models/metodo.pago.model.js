const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const metodoPago = sequelize.define(
    "metodoPago",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'metodoPago',
        timestamps: false
    }
);
module.exports=metodoPago;