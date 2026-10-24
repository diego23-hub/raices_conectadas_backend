const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = sequelize.define(
    'Usuario', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idTipoDoc:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numDoc:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idRol: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'usuario',
        timestamps: false
    }
);
module.exports = Usuario;
