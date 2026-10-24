const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const tipoProveedor = sequelize.define(
    "tipoProveedor",
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
        tableName: 'tipoProveedor',
        timestamps: false
    }
);
module.exports=tipoProveedor;