const departamentos = require('../../departamentosModels/departamentosModel');
const aeropuertos = require('../../aeropuertoModels/aeropuertosModel');
const empleados = require('../../empleadosModels/empleadosModel')

    //Un departamento tiene varios empleados (La FK va al empleado)
departamentos.hasMany(empleados, {as: 'Empleados',
    foreignKey: 'nro_departamento', sourceKey: 'numero',
    onDelete: 'SET NULL', onUpdate: 'CASCADE'
})
            
    //Un departamento está en un aeropuerto
departamentos.belongsTo(aeropuertos, {
    foreignKey: 'iata', targetKey: 'iata',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = departamentos;
        