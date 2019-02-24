    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const avion_mantenimiento = require('./avion_mantenimientoModel');

const mantenimiento = db.define('mantenimientos',{
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
    }
},{
    timestamps: false,
    freezeTableName: true
})

    //Un mantenimiento se le aplica a varios aviones (FK va al avión)
mantenimiento.hasMany(avion_mantenimiento, {
    foreignKey: 'codigo_mantenimiento', sourceKey: 'codigo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = mantenimiento;