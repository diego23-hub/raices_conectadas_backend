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
            beforeCreate: async (usuario) =>{
                usuario.contrasena = await bcrypt.hash(usuario.contrasena, 10);
            },
            beforeUpdate: async (usuario) => {
            if (usuario.changed('contrasena')){
                const salt = await bcrypt.genSalt(10);
                usuario.contrasena=await bcrypt.hash(usuario.contrasena, salt);
            }
        }
        }
    }
);
module.exports = Usuario;
