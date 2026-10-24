const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const tipoEvento = sequelize.define(
    "tipoEvento",
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
        tableName: 'tipoEvento',
        timestamps: false
    }
);
module.exports=tipoEvento;