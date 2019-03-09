    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const empleados_telefono = db.define('empleados_telefono',{
    telefono:{
        type: sequelize.STRING,
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

module.exports = empleados_telefono;