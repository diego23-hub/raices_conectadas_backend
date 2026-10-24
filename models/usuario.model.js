const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')
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
            allowNull: false,
            unique:true
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idRol: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'usuario',
        timestamps: false,
        hooks: {
        beforeCreate: async (user) => {
            if(user.contrasena) {
                const salt= await bcrypt.genSalt(10);
                user.contrasena=await bcrypt.hash(user.contrasena, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('contrasena')){
                const salt = await bcrypt.genSalt(10);
                user.contrasena=await bcrypt.hash(user.contrasena, salt);
            }
        }
    }
    }
);
module.exports = Usuario;
