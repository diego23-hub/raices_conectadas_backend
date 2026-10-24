const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const evento = sequelize.define(
    "evento",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaInicio:{
            type: DataTypes.DATE,
            allowNull: false
        },
        fechaFin:{
            type: DataTypes.DATE,
            allowNull: false
        },
        idDestino:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idTipoEvento:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'evento',
        timestamps: false
    }
);
module.exports=evento;