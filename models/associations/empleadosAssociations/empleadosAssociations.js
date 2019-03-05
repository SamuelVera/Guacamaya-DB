const empleados_telefono = require('../../empleadosModels/empleados_telefonoModel');
const empleados = require('../../empleadosModels/empleadosModel');
const empleados_sueldo = require('../../empleadosModels/empleados_sueldoModel');
const departamentos = require('../../departamentosModels/departamentosModel');

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