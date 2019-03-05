const tarifa_maletas = require('../../tarifasModels/tarifa_maletasModel');
const tarifa_mano = require('../../tarifasModels/tarifa_manoModel');
const tarifas = require('../../tarifasModels/tarifasModel');
const temporadas = require('../../tarifasModels/temporadasModel');
const temporada_tarifa = require('../../tarifasModels/temporada_tarifaModel');
const pasajes = require('../../pasajesModels/pasajesModel');

//Se agrega la PK como FK a codigo_temporada
    tarifas.belongsToMany(temporadas,{
        through: temporada_tarifa, foreignKey: 'codigo_tarifa',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    
        //Se agrega el código como FK a tarifa_mano
    tarifas.hasMany(tarifa_mano, {
        foreignKey: 'codigo', sourceKey: 'codigo',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    
        //Se agrega el código como FK a tarifa_maletas
    tarifas.hasMany(tarifa_maletas, {
        foreignKey: 'codigo', sourceKey: 'codigo',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    
        //Se agrega el código como FK a Pasaje
    tarifas.hasMany(pasajes, {
        foreignKey: 'codigo_tarifa', sourceKey: 'codigo',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })

module.exports = tarifas;