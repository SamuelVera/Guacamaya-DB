    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const avion_mantenimiento = require('./avion_mantenimientoModel');
const aviones = require('./avionesModel');

const mantenimientos = db.define('mantenimientos',{
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

    //Se agrega la PK como FK a avion_mantenimiento
    //M:N aviones-mantenimientos
mantenimientos.belongsToMany(aviones,{
    through: avion_mantenimiento, foreignKey: 'codigo_mantenimiento',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = mantenimientos;