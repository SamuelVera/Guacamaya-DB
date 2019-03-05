const arrendatarios = require('../../arrendatarioModels/arrendatariosModel');
const distancias = require('../../arrendatarioModels/distanciaModel');
const avion_alquilado = require('../../avionesModels/avion_alquiladoModel');
const tarifas_alquiler = require('../../arrendatarioModels/tarifas_alquilerModel');

    //Arrendatario N:M Distancias, en el model de tarifa_alquiler se agrega la FK
arrendatarios.belongsToMany(distancias, {
    through: tarifas_alquiler, foreignKey: 'nombre_arrendatario' ,
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Arrendatario alquila varios aviones (La FK va al avión)
arrendatarios.hasMany(avion_alquilado, { 
    foreignKey: 'nombre_arrendatario', sourceKey: 'nombre',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = arrendatarios;