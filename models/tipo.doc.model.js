const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const tipoDoc = sequelize.define(
    "tipoDoc",
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
        aplicaIva:{
            type: DataTypes.STRING,
            allowNull:false
        }
    },
    {
        tableName: 'tipoDoc',
        timestamps: false
    }
);
module.exports=tipoDoc;