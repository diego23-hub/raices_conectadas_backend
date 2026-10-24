const { DataTypes } = require("sequelize");
const bcrypt=require("bcrypt");
const sequelize=require("../config/database");

const user = sequelize.define('user',{
    correo:{ type: DataTypes.STRING, allowNull:false, unique: true},
    contrasena: { type: DataTypes.STRING, allowNull: false},
    role:{type: DataTypes.STRING, defaultValue: 'Viajero'}
},{
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
});

module.exports= user;