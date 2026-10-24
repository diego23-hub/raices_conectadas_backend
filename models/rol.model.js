const {DataTypes} = require ("sequelize");
const sequelize=require("../config/database");

const Rol = sequelize.define("Rol",{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },

    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},{
    tableName: 'rol',
    timestamps: false
}
);

module.exports=Rol;