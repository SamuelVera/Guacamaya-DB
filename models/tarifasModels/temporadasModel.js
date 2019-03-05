    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const temporadas = db.define('temporadas',{
    codigo:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    tipo:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
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
    timestamps:false,
    freezeTableName: true
})

module.exports = temporadas;