    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const empleados_sueldo = db.define('empleados_sueldo',{
    fecha:{
        type: sequelize.DATE,
        primaryKey: true,
        allowNull: false,
        validate:{
            isDate: true,
            notEmpty: true
        }
    },
    sueldo:{
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

module.exports = empleados_sueldo ;