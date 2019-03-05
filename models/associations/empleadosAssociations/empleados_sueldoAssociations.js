const empleados_sueldo = require('../../empleadosModels/empleados_sueldoModel');
const empleados = require('../../empleadosModels/empleadosModel');

//El empleado_sueldo adquiere la PK de empleados como FK
    empleados_sueldo.belongsTo(empleados, {
        foreignKey: 'cedula', targetKey: 'cedula',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })

module.exports = empleados_sueldo;