    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const distancias = db.define('distancias',{
    codigo:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            isNumeric: true,
            min: 0
        }
    },
    distancia_min:{
        type: sequelize.INTEGER,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            isNumeric: true,
            min: 0
        }
    },
    distancia_max:{
        type: sequelize.INTEGER,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            isNumeric: true
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

module.exports = distancias;