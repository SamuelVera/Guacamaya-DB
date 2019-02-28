    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const pasajes = require('../pasajesModels/pasajesModel');
const vuelos_salida = require('./vuelo_salidaModel');
const rutas = require('../rutasModels/rutasModel');

const vuelos = db.define('vuelos',{
    codigo_vuelo:{
        type: sequelize.INTEGER,
        primaryKey: true,
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
    cancelado:{
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true
        }
    },
    activo:{
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        validate:{
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

    //Se agrega el codigo de vuelo como FK al pasaje
vuelos.hasMany(pasajes, {
    foreignKey: 'codigo_vuelo', sourceKey: 'codigo_vuelo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Se agrega el codigo de vuelo como FK al vuelo_salida
vuelos.hasOne(vuelos_salida, {
    foreignKey: 'codigo_vuelo', as: 'Salida',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Se agrega la PK de rutas como FK del vuelo
vuelos.belongsTo(rutas, {
    foreignKey: 'nro_ruta', targetKey: 'numero',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = vuelos;