const mantenimientos = require('../../avionesModels/mantenimientoModel');
const avion_mantenimiento = require('../../avionesModels/avion_mantenimientoModel');

    //Se agrega la PK como FK a avion_mantenimiento
mantenimientos.hasMany(avion_mantenimiento,{
    foreignKey: 'codigo_mantenimiento', sourceKey: 'codigo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = mantenimientos;