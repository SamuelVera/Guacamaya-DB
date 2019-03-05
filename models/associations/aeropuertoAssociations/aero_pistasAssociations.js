const aero_pistas = require('../../aeropuertoModels/aero_pistaModel');
const aeropuertos = require('../../aeropuertoModels/aeropuertosModel');

aero_pistas.belongsTo(aeropuertos, {
    foreignKey: 'iata', targetKey: 'iata',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = aero_pistas;