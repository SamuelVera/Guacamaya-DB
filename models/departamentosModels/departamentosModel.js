    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const aeropuertos = require('../aeropuertoModels/aeropuertosModel');
const empleados = require('../empleadosModels/empleadosModel');

const departamentos = db.define('departamentos',{
    numero:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    nombre:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha,
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

    //Un departamento tiene varios empleados (La FK va al empleado)
departamentos.hasMany(empleados, {
    foreignKey: 'nro_departamento', sourceKey: 'numero',
    onDelete: 'SET NULL', onUpdate: 'CASCADE'
})

    //Un departamento está en un aeropuerto
departamentos.belongsTo(aeropuertos, {
    foreignKey: 'iata', targetKey: 'iata',
onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = departamentos;