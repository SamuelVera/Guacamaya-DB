const vuelos_salida = require('../../vuelosModels/vuelos_salidaModel');
const vuelos = require('../../vuelosModels/vuelosModel');
const aviones = require('../../avionesModels/avionesModel');
const rutas = require('../../rutasModels/rutasModel');
const pasajes = require('../../pasajesModels/pasajesModel');

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
        //Se agrega la PK del avión como FK del vuelo_salida
    vuelos.belongsTo(aviones, {
        foreignKey: 'nro_avion', targetKey: 'nro_fab',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })

module.exports = vuelos;