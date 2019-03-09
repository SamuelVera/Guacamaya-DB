const rutas = require('../../rutasModels/rutasModel');
const vuelos = require('../../vuelosModels/vuelosModel');
const aeropuertos = require('../../aeropuertoModels/aeropuertosModel');
const aviones = require('../../avionesModels/avionesModel');

//Se agrega el codigo de ruta como FK al vuelo
    rutas.hasMany(vuelos, {
        as: 'Vuelos',
        foreignKey: 'nro_ruta', sourceKey: 'numero',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
        //Se agrega el codigo de ruta como FK al avion
    rutas.hasMany(aviones, {
        as: 'Aviones',
        foreignKey: 'nro_ruta', sourceKey: 'numero',
        onDelete: 'SET NULL', onUpdate: 'CASCADE'
    })
        //La ruta tiene un origen que es un aeropuerto
        //(La FK se coloca en la ruta)
    rutas.belongsTo(aeropuertos, {
        as: 'Origen',
        foreignKey: 'origen', targetKey: 'iata',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })   
        //La ruta tiene un destino que es un aeropuerto
        //(La FK se coloca en la ruta)
    rutas.belongsTo(aeropuertos, {
        as: 'Destino',
        foreignKey: 'destino', targetKey: 'iata',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })

    rutas.hasOne(rutas, {as: 'Siguiente',
        foreignKey: 'proximaRuta', targetKey: 'numero',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })

module.exports = rutas;