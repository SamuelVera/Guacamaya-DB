    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const pasajes = require('../pasajesModels/pasajesModel');
const compras = require('../comprasModels/comprasModel');

const clientes = db.define('clientes',{
    cedula:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    fecha_nac:{
        type: sequelize.DATE,
        allowNull: false,
        validate:{
            isDate: true,
            notEmpty: true
        }
    },
    email:{
        type: sequelize.STRING,
        validate:{
            isEmail: true
        }
    },
    apellido:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true
        }
    },
    nombre:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
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

    //Se agrega la cedula como FK a compras
clientes.hasMany(compras, {
    foreignKey: 'cedula', sourceKey: 'cedula',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Se agrega la cedula como FK al pasaje
clientes.hasMany(pasajese, {
    foreignKey: 'cedula_pasajero', sourceKey: 'cedula',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = clientes;