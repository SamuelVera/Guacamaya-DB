const empleados_telefono = require('../../empleadosModels/empleados_telefonoModel');
const empleados = require('../../empleadosModels/empleadosModel');

//El empleado_sueldo adquiere la PK de empleados como FK
    empleados_telefono.belongsTo(empleados, {
        foreignKey: 'cedula', targetKey: 'cedula',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })

module.exports = empleados_telefono;