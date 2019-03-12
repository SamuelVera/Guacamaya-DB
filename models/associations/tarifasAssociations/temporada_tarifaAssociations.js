const tarifas = require('../../tarifasModels/tarifasModel');
const temporadas = require('../../tarifasModels/temporadasModel');
const temporada_tarifa = require('../../tarifasModels/temporada_tarifaModel');

temporada_tarifa.belongsTo(tarifas,{
    as: 'Tarifa',
    foreignKey: 'codigo_tarifa', targetKey: 'codigo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

temporada_tarifa.belongsTo(temporadas,{
    as: 'Temporada',
    foreignKey: 'codigo_temporada', targetKey: 'codigo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = temporada_tarifa;