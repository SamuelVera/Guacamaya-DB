const avion_alquilado = require('../../avionesModels/avion_alquiladoModel');
const arrendatarios = require('../../arrendatarioModels/arrendatariosModel');
const aviones = require('../../avionesModels/avionesModel');

    //Un avión es arrendadO por un arrendatario (FK del arrendatario)
avion_alquilado.belongsTo(arrendatarios, {
    foreignKey: 'nombre_arrendatario', targetKey: 'nombre',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //De normalizar la tabla de avión para evitar nulls (FK del avión)
avion_alquilado.belongsTo(aviones, {
    foreignKey: 'avion', targetKey: 'nro_fab',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = avion_alquilado;