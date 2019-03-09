const aviones = require('../../avionesModels/avionesModel');
const modelo = require('../../modeloAvionModels/modelo_avionModel');
const rutas = require('../../rutasModels/rutasModel');
const avion_alquilado = require('../../avionesModels/avion_alquiladoModel');
const avion_mantenimiento = require('../../avionesModels/avion_mantenimientoModel');
const vuelos = require('../../vuelosModels/vuelosModel');

        //Un avión tiene un modelo (FK del modelo)
    aviones.belongsTo(modelo, {
        as: 'Modelo',
        foreignKey: 'modelo', targetKey: 'numero',
        onDelete: 'SET NULL', onUpdate:'CASCADE',
    })
        //Un avión tiene una ruta (FK de la ruta)
    aviones.belongsTo(rutas, {
        as: 'Ruta',
        foreignKey: 'nro_ruta', targetKey: 'numero',
        onDelete: 'SET NULL', onUpdate:'CASCADE'
    })
        //Resulta de la normalización de avión para evitar nulls y redundancia
        //(FK va a la relación avion_alquilado)
    aviones.hasMany(avion_alquilado, {
        as: 'Alquileres',
        foreignKey: 'avion', sourceKey: 'nro_fab',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
        //Avión con vuelos que han salido, la PK del avión va a la FK de vuelo_salida
    aviones.hasMany(vuelos, {
        as: 'Vuelos',
        foreignKey: 'nro_avion', sourceKey: 'nro_fab',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    
        //Se agrega la PK como FK a avion_mantenimiento
    aviones.hasMany(avion_mantenimiento,{
        as: 'Mantenimientos', 
        foreignKey: 'nro_avion', sourceKey: 'nro_fab',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })

module.exports = aviones;