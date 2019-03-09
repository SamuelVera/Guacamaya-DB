const mantenimientos = require('../../avionesModels/mantenimientoModel');
const aviones = require('../../avionesModels/avionesModel');
const avion_mantenimiento = require('../../avionesModels/avion_mantenimientoModel');

avion_mantenimiento.belongsTo(aviones,{
    as: 'Avion',
    foreignKey: 'nro_avion', targetKey: 'nro_fab',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

avion_mantenimiento.belongsTo(mantenimientos,{
    as: 'Mantenimiento',
    foreignKey: 'codigo_mantenimiento', targetKey: 'codigo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = avion_mantenimiento;