const pasajes = require('../../pasajesModels/pasajesModel');
const compras = require('../../comprasModels/comprasModel');
const clientes = require('../../clientesModels/clientesModel');
const tarifas = require('../../tarifasModels/tarifasModel');
const vuelos = require('../../vuelosModels/vuelosModel');

//Se agrega la PK de cliente como FK del pasaje
    pasajes.belongsTo(clientes, {
        as: 'Pasajero',
        foreignKey: 'cedula_pasajero', targetKey: 'cedula',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    
        //Se agrega la PK de compra como FK del pasaje
    pasajes.belongsTo(compras, {
        as: 'Compra',
        foreignKey: 'numero_factura', targetKey: 'numero_factura',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    
        //Se agrega la PK de la tarifa como FK del pasaje
    pasajes.belongsTo(tarifas, {
        as: 'Tarifa',
        foreignKey: 'codigo_tarifa', targetKey: 'codigo',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    
        //Se agrega la PK del vuelo como FK del pasaje
    pasajes.belongsTo(vuelos, {
        as: 'Vuelo',
        foreignKey: 'codigo_vuelo', targetKey: 'codigo_vuelo',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })

module.exports = pasajes;