const clientes = require('../../clientesModels/clientesModel');
const compras = require('../../comprasModels/comprasModel');
const pasajes = require('../../pasajesModels/pasajesModel');

    //Se agrega la cedula como FK a compras
clientes.hasMany(compras, {
    as: 'Compras',
    foreignKey: 'cedula', sourceKey: 'cedula',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Se agrega la cedula como FK al pasaje
clientes.hasMany(pasajes, {
    as: 'Pasajes',
    foreignKey: 'cedula_pasajero', sourceKey: 'cedula',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = clientes;