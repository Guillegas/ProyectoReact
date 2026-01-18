const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Author = sequelize.define('Author', {
    id_autor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nacionalidad: {
        type: DataTypes.STRING(100)
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    tableName: 'autores',
    timestamps: false
});

module.exports = Author;
