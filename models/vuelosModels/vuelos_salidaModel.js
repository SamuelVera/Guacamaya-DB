    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const vuelo_salida = db.define('vuelos_salida',{
    peso_avion:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    fecha_salida:{
        type: sequelize.DATE,
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty: true,
            isDate: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = vuelo_salida;