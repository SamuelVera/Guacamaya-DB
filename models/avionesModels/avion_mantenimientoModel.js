    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const avion_mantenimiento = db.define('avion_mantenimiento',{
    fecha_entrada:{
        type: sequelize.DATE,
        primaryKey: true,
        allowNull: false,
        validate:{
            isDate: true,
            isAfter: new Date(),
            notEmpty: true
        }
    },
    fecha_salida:{
        type: sequelize.DATE,
        allowNull: false,
        validate:{
            isDate: true,
            isAfter: new Date(),
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = avion_mantenimiento;