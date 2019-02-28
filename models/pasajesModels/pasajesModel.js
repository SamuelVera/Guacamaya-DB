    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const clientes = require('../clientesModels/clientesModel');
const compras = require('../comprasModels/comprasModel');
const tarifas = require('../tarifasModels/tarifasModel');
const vuelos = require('../vuelosModels/vuelosModel');

const pasajes = db.define('pasajes',{
    serial_num:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    abordado:{
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true
        }
    },
    numero_asiento:{
        type: sequelize.INTEGER,
        validate:{
            isNumeric: true,
        }
    },
    cantidad_equipaje:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true,
            min: 0
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

    //Se agrega la PK de cliente como FK del pasaje
pasajes.belongsTo(clientes, {
    foreignKey: 'cedula_pasajero', targetKey: 'cedula',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Se agrega la PK de compra como FK del pasaje
pasajes.belongsTo(compras, {
    foreignKey: 'numero_factura', targetKey: 'numero_factura',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Se agrega la PK de la tarifa como FK del pasaje
pasajes.belongsTo(tarifas, {
    foreignKey: 'codigo_tarifa', targetKey: 'codigo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Se agrega la PK del vuelo como FK del pasaje
pasajes.belongsTo(vuelos, {
    foreignKey: 'codigo_vuelo', targetKey: 'codigo_vuelo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = pasajes;