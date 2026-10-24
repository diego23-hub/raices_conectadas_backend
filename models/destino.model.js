const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const Evento = sequelize.define(
    "Evento",
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
        idTipoDestino:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'destino',
        timestamps: false
    }
);
module.exports=Evento;