    //Importaciones
const sequelize = require('sequelize');
const db = require('../config/guacamaya_db');

const emp_telefono = db.define('emp_telefono',{
    /*cedula*/
    telefono:{
        type: sequelize.INTEGER,
        primaryKey: true,
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