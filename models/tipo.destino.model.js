const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const tipoDestino = sequelize.define(
    "tipoDestino",
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
        tableName: 'tipoDestino',
        timestamps: false
    }
);
module.exports=tipoDestino;