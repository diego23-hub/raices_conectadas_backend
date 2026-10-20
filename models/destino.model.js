const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Destino = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departamento: {
        type: DataTypes.STRING
    },
    tipo: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'destinos',
    timestamps: false
});

module.exports = Destino;
