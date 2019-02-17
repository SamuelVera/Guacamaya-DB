    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const proveedor_alquiler = db.define('proveedor_alquiler',{
    nombre:{
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        validate:{
            isAlphanumeric: true,
            notEmpty: true
        }
    },
    tiem_resp:{
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

module.exports = proveedor_alquiler;