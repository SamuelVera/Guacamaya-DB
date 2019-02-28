    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const aeropuerto = require('../aeropuertoModels/aeropuertosModel');
const vuelos = require('../vuelosModels/vuelosModel');
const aviones = require('../avionesModels/avionesModel');

const rutas = db.define('rutas', {
    numero:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    distancia:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
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

    //La ruta tiene un origen que es un aeropuerto
    //(La FK se coloca en la ruta)
rutas.belongsTo(aeropuerto, {foreignKey: 'origen', targetKey: 'iata',
onDelete: 'CASCADE', onUpdate: 'CASCADE'})

    //La ruta tiene un destino que es un aeropuerto
    //(La FK se coloca en la ruta)
rutas.belongsTo(aeropuerto, {
    foreignKey: 'destino', targetKey: 'iata',
onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Se agrega el codigo de ruta como FK al vuelo
rutas.hasMany(vuelos, {
    foreignKey: 'nro_ruta', sourceKey: 'numero',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Se agrega el codigo de ruta como FK al avion
rutas.hasMany(aviones, {
    foreignKey: 'nro_ruta', sourceKey: 'numero',
    onDelete: 'SET NULL', onUpdate: 'CASCADE'
})

module.exports = rutas;