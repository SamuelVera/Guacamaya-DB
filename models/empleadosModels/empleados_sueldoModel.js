    //Importaciones
const sequelize = require('sequelize');
const db = require('../config/guacamaya_db');
const empleados = require('./empleadosModel');

const empleados_sueldo = db.define('empleados_sueldo ',{
    fecha:{
        type: sequelize.DATE,
        primaryKey: true,
        allowNull: false,
        validate:{
            isDate: true,
            notEmpty: true
        }
    },
    sueldo:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

    //El empleado_sueldo adquiere la PK de empleados como FK
empleados_sueldo.belongsTo(empleados, {
    foreignKey: 'cedula', targetKey: 'cedula',
onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = empleados_sueldo ;