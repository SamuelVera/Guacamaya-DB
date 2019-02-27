    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const mantenimientos = require('./mantenimientoModel');
const aviones = require('./avionesModel');

const avion_mantenimiento = db.define('avion_mantenimiento',{
    fecha_entrada:{
        type: sequelize.DATE,
        primaryKey: true,
        allowNull: false,
        validate:{
            isDate: true,
            isAfter: new Date(),
            notEmpty: true
        }
    },
    fecha_salida:{
        type: sequelize.DATE,
        allowNull: false,
        validate:{
            isDate: true,
            isAfter: new Date(),
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

    //De normalizar la tabla de avión para evitar redundancia (FK del avión)
avion_mantenimiento.belongsTo(aviones, { foreignKey: 'nro_avion', targetKey: 'nro_fab',
onDelete: 'CASCADE', onUpdate: 'CASCADE'});

    //El avión pasa por 1 mantenimientos a la vez (FK del mantenimiento)
avion_mantenimiento.belongsTo(mantenimientos, {foreignKey: 'codigo_mantenimiento', targetKey: 'codigo',
onDelete: 'CASCADE', onUpdate: 'CASCADE'});

module.exports = avion_mantenimiento;