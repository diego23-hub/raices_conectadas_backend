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
            type: DataTypes.STRING,
            allowNull: false
        },
        incluye:{
            type: DataTypes.STRING,
            allowNull: false
        },
        itinerario:{
            type: DataTypes.STRING,
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