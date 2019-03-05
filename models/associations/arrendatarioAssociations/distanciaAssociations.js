const distancias = require('../../arrendatarioModels/distanciaModel');
const arrendatarios = require('../../arrendatarioModels/arrendatariosModel');
const tarifas_alquiler = require('../../arrendatarioModels/tarifas_alquilerModel');

    //Arrendatario N:M Distancias, en el model de tarifa_alquiler se agrega la FK
distancias.belongsToMany(arrendatarios,{
    through: tarifas_alquiler, foreignKey: 'codigo_distancia',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = distancias;