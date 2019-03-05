const tarifa_maletas = require('../../tarifasModels/tarifa_maletasModel');
const tarifas = require('../../tarifasModels/tarifasModel');

    //Agregar la PK de tarifas como FK
tarifa_maletas.belongsTo(tarifas, {
    foreignKey: 'codigo', targetKey: 'codigo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = tarifa_maletas;