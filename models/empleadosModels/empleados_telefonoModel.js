    //Importaciones
const sequelize = require('sequelize');
const db = require('../config/guacamaya_db');
const empleados = require('./empleadosModel');

const empleados_telefono = db.define('empleados_telefono',{
    telefono:{
        type: sequelize.INTEGER,
        primaryKey: true,
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
empleados_telefono.belongsTo(empleados, {
    foreignKey: 'cedula', targetKey: 'cedula',
onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = empleados_telefono;