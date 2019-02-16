    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const precio_alquiler = db.define('precio_alquiler',{
    nombre_proveedor:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlphanumeric: true,
            notEmpty: true
        }
    },
    distancia_min:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    distancia_max:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    monto:{
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

module.exports = precio_alquiler;