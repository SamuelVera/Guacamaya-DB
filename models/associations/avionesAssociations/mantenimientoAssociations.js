const mantenimientos = require('../../avionesModels/mantenimientoModel');
const aviones = require('../../avionesModels/avionesModel');
const avion_mantenimiento = require('../../avionesModels/avion_mantenimientoModel');

    //Se agrega la PK como FK a avion_mantenimiento
    //M:N aviones-mantenimientos
mantenimientos.belongsToMany(aviones,{
    through: avion_mantenimiento, foreignKey: 'codigo_mantenimiento',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = mantenimientos;