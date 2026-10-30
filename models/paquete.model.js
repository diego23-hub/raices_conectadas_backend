const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const paquete = sequelize.define(
    "paquete",
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
        precio:{
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        descripcion:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        duracion:{
            type: DataTypes.STRING,
            allowNull:false
        },
        incluye:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        itinerario:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        limitePersonas:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idDestino:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'paquete',
        timestamps: false
    }
);
module.exports=paquete;