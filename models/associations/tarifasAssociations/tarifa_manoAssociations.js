const tarifa_mano = require('../../tarifasModels/tarifa_manoModel');
const tarifas = require('../../tarifasModels/tarifasModel');


//Agregar la PK de tarifas como FK
    tarifa_mano.belongsTo(tarifas, {
        foreignKey: 'codigo', targetKey: 'codigo',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })

module.exports = tarifa_mano;