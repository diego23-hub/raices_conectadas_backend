const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const notificacion = sequelize.define(
    "notificacion",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idReserva:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idProveedor:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaCreacion:{
            type:DataTypes.DATE,
            allowNull:false
        }
    },
    {
        tableName: 'notificacion',
        timestamps: false
    }
);
module.exports=notificacion;