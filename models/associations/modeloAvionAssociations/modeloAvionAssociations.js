const modelo_avion =  require('../../modeloAvionModels/modelo_avionModel');
const aviones  = require('../../avionesModels/avionesModel');

//Un modelo da especificaciones de varios aviones (La FK va al avión)
modelo_avion.hasMany(aviones, {
    foreignKey: 'modelo', sourceKey: 'numero',
    onDelete: 'SET NULL', onUpdate: 'CASCADE'
})

module.exports =  modelo_avion;