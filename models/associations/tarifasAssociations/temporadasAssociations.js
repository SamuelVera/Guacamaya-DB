const tarifas = require('../../tarifasModels/tarifasModel');
const temporadas = require('../../tarifasModels/temporadasModel');
const temporada_tarifa = require('../../tarifasModels/temporada_tarifaModel');

    //Se agrega la PK como FK a codigo_temporada
temporadas.belongsToMany(tarifas,{
    through: temporada_tarifa, foreignKey: 'codigo_temporada',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = temporadas;