const sequelize = require('sequelize');
const db = require('../config/guacamaya_db');

// Modelo de la prueba
const prueba = db.define('prueba', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: sequelize.STRING,
        allowNull: false,
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = prueba;