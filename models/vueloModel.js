    //Modelo no final, solo para la primera entrega
const sequelize = require('sequelize');
const db = require('../config/guacamaya_db');

    //Modelo del avión
const vuelo = db.define('vuelos',{
    codigo: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    pvb: {
        type: sequelize.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    iata_Des: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },
    fecha_Prog: {
        type: sequelize.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            notEmpty: true
        }
    },
    nro_Avion: {
        type: sequelize.INTEGER,
        validate: {
            isNumeric: true
        }
    },
    activo:{
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        validate: {
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = vuelo;