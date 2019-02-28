    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const pasajes = require('../pasajesModels/pasajesModel');
const clientes = require('../clientesModels/clientesModel');

const compras = db.define('compras',{
    numero_factura:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    cantidad_pasajes:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    fecha:{
        type: sequelize.DATE,
        allowNull: false,
        validate:{
            isDate: true,
            notEmpty: true
        }
    },
    monto:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    activo:{
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        validate:{
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

    //Se agrega el nro de factura como FK a pasajes
compras.hasMany(pasajes, {
    foreignKey: 'numero_factura', sourceKey: 'numero_factura',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Se agrega la PK del cliente como FK de la compra
compras.belongsTo(clientes, {
    foreignKey: 'cedula', targetKey: 'cedula',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = compras;