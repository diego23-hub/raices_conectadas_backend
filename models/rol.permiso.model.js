const {DataTypes} = require("sequelize");
const sequelize=require("../config/database");

const rolPermiso = sequelize.define(
    "rolPermiso",
    {
        idRol: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        idPermiso: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName:"rolPermiso",
        timestamps: false,
    }
);

module.exports = rolPermiso;