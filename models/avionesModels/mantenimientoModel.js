    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const mantenimientos = db.define('mantenimientos',{
    codigo:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty: true,
            isNumeric: true
        }
    },
    tipo:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isAlphanumeric: true
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

module.exports = mantenimientos;