const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const proveedor = sequelize.define(
    "proveedor",
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
        ubicacion:{
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        telefono:{
            type: DataTypes.STRING,
            allowNull: false
        },
        correo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        idDestino:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idTipoProveedor:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'proveedor',
        timestamps: false
    }
);
module.exports=proveedor;