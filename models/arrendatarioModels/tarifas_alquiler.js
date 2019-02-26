    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const tarifas_alquiler = db.define('tarifas_alquiler',{
    activo:{
        type: sequelize.TINYINT,
        defaultValue: 1,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    precio:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true,
            min: 0
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = tarifas_alquiler;