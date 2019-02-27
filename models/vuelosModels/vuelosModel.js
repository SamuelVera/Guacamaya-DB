    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const vuelos = db.define('vuelos',{
    codigo_vuelo:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    /*nro_ruta*/
    fecha:{
        type: sequelize.DATE,
        allowNull: false,
        validate:{
            isDate: true,
            notEmpty: true
        }
    },
    cancelado:{
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
        validate:{
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

module.exports = vuelos;