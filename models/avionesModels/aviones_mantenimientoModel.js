    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const aviones_mantenimiento = db.define('aviones_mantenimiento',{
    nro_fab:{
        type:sequelize.INTEGER,
        allowNull: false,
        validate:{
            isAlphanumeric: true,
            notEmpty: true
        }
    },
    fecha_mant:{
        type: sequelize.DATE,
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
    },
    tipo_mant:{ //0: regular, 1: periodico (3 meses), 2: reparación, 3: 
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true,
            max: 2,
            min: 0
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = aviones_mantenimiento;