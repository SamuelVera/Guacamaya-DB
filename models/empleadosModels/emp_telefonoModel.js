    //Importaciones
const sequelize = require('sequelize');
const db = require('../config/guacamaya_db');

const emp_telefono = db.define('emp_telefono',{
    ci:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    telefono:{
        type: sequelize.INTEGER,
        unique: true,
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

module.exports = emp_telefono;