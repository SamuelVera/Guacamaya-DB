    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const tarifa_mano = db.define('tarifa_mano',{
    /*codigo*/
    cantidad_equipaje_mano:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    peso_equipaje:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
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

module.exports = tarifa_mano;