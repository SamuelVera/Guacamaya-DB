    //Importaciones
const sequelize = require('sequelize');
const db = require('../config/guacamaya_db');

const emp_sueldo = db.define('emp_sueldos',{
    ci:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    fecha:{
        type: sequelize.DATE,
        allowNull: false,
        validate:{
            isDate: true,
            notEmpty: true
        }
    },
    sueldo:{
        type: sequelize.FLOAT,
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

module.exports = emp_sueldo;