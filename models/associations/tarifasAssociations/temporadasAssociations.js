const temporadas = require('../../tarifasModels/temporadasModel');
const temporada_tarifa = require('../../tarifasModels/temporada_tarifaModel');

    //Se agrega la PK como FK a codigo_temporada
temporadas.hasMany(temporada_tarifa,{
    as: 'Tarifas',
    foreignKey: 'codigo_temporada', sourceKey: 'codigo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = temporadas;