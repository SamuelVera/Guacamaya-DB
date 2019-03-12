const arrendatarios = require('../../arrendatarioModels/arrendatariosModel');
const distancias = require('../../arrendatarioModels/distanciaModel');
const tarifas_alquiler = require('../../arrendatarioModels/tarifas_alquilerModel');

tarifas_alquiler.belongsTo(arrendatarios,{
    as: 'Arrendatario',
    foreignKey: 'nombre_arrendatario', targetKey: 'nombre',
    onDelete: 'CASCADE', onUpdate:'CASCADE'
})

tarifas_alquiler.belongsTo(distancias,{
    as: 'Distancias',
    foreignKey: 'codigo_distancia', targetKey: 'codigo',
    onDelete: 'CASCADE', onUpdate:'CASCADE'
})

module.exports = tarifas_alquiler;