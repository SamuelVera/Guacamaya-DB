    //Importaciones
const sequelize = require('sequelize');
const db = require('../config/guacamaya_db');
const departamentos = require('../departamentosModels/departamentosModel');
const empleados_sueldo = require('./empleados_sueldoModel');
const empleados_telefono = require('./empleados_telefonoModel');

const empleados = db.define('empleados',{
    cedula:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
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
    profesion:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true
        }
    },
    cargo:{
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

    //El empleado adquiere la PK de departamento como FK
empleados.belongsTo(departamentos, {
    foreignKey: 'nro_departamento', targetKey: 'numero',
onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //La PK de empelado se pone como FK del empleado_sueldo
empleados.hasMany(empleados_sueldo, {
    foreignKey: 'cedula', sourceKey: 'cedula',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //La PK de empelado se pone como FK del empleado_telefono
empleados.hasMany(empleados_telefono, {
    foreignKey: 'cedula', sourceKey: 'cedula',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = empleados;