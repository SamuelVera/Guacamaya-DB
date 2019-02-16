    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const ruta = db.define('rutas', {
    numero:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    origen:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true,
        }
    },
    destino:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true,
        }
    },
    distancia:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = ruta;