const {DataTypes} = require("sequelize");
const sequelize=require("../config/database");

const permiso= sequelize.define("permiso",{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},{
    tableName: "permiso",
    timeStamps: false,
    }
);

module.exports= permiso;