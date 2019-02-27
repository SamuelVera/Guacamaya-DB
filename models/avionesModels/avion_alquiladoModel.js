    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const arrendatarios = require('../arrendatarioModels/arrendatariosModel');
const aviones = require('./avionesModel');

const avion_alquilado = db.define('avion_alquilado',{
    gasto:{
        tpye: sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
            isNumeric: true,
            min: 0
        }
    },
    fecha:{
        type: sequelize.DATE,
        primaryKey: true,
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

    //Un avión es arrendadO por un arrendatario (FK del arrendatario)
avion_alquilado.belongsTo(arrendatarios, {foreignKey: 'nombre_arrendatario', targetKey: 'nombre',
onDelete: 'CASCADE', onUpdate: 'CASCADE'})

    //De normalizar la tabla de avión para evitar nulls (FK del avión)
avion_alquilado.belongsTo(aviones, {foreignKey: 'avion', targetKey: 'nro_fab',
onDelete: 'CASCADE', onUpdate: 'CASCADE'})

module.exports = avion_alquilado;