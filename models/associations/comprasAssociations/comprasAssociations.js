const compras = require('../../comprasModels/comprasModel');
const pasajes = require('../../pasajesModels/pasajesModel');
const clientes = require('../../clientesModels/clientesModel');

        //Se agrega el nro de factura como FK a pasajes
    compras.hasMany(pasajes, {
        foreignKey: 'numero_factura', sourceKey: 'numero_factura',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
        //Se agrega la PK del cliente como FK de la compra
    compras.belongsTo(clientes, {
        as: 'Cliente',
        foreignKey: 'cedula', targetKey: 'cedula',
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })

module.exports = compras;