const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;
