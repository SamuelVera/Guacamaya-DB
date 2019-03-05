    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const pasajes = db.define('pasajes',{
    serial_num:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    abordado:{
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true
        }
    },
    numero_asiento:{
        type: sequelize.INTEGER,
        validate:{
            isNumeric: true,
        }
    },
    cantidad_equipaje:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true,
            min: 0
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

module.exports = pasajes;