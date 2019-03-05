//Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const arrendatarios = db.define('arrendatarios',{
    nombre:{
        type: sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            isAlphanumeric: true
        }
    },
    tiempo_respuesta:{
        type: sequelize.INTEGER,
        allowNull: true,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    activo:{
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        validate:{
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = arrendatarios;