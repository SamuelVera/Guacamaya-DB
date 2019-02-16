    //Importaciones
const sequelize = require('sequelize');
const db = require('../config/guacamaya_db');

const empleado = db.define('empleados',{
    ci:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    nombre:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true
        }
    },
    apellido:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true
        }
    },
    nro_dep:{
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

module.exports = empleado;