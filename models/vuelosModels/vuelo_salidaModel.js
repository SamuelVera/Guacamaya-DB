    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const vuelos = require('./vuelosModel');
const aviones = require('../avionesModels/avionesModel');

const vuelo_salida = db.define('vuelo_salida',{
    peso_avion:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    fecha_salida:{
        type: sequelize.DATE,
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty: true,
            isDate: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

    //Se agrega la PK de vuelo como FK del vuelo_salida
vuelo_salida.belongsTo(vuelos, {
    foreignKey: 'codigo_vuelo', targetKey: 'codigo_vuelo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Se agrega la PK del avión como FK del vuelo_salida
vuelo_salida.belongsTo(aviones, {
    foreignKey: 'nro_avion', targetKey: 'nro_fab',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = vuelo_salida;