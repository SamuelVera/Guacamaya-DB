const vuelos_salida = require('../../vuelosModels/vuelos_salidaModel');
const vuelos = require('../../vuelosModels/vuelosModel');

//Se agrega la PK de vuelo como FK del vuelo_salida
    vuelos_salida.belongsTo(vuelos, {
        as: 'Vuelo',
        foreignKey: 'codigo_vuelo', targetKey: 'codigo_vuelo',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })

module.exports = vuelos_salida;