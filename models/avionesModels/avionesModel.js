    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const ruta = require('../rutaModels/rutaModel');
const modelo = require('../modeloAvionModels/modelo_avionModel');
const avion_alquilado = require('./avion_alquiladoModel');
const avion_mantenimiento = require('./avion_mantenimientoModel');
const mantenimientos = require('./mantenimientoModel');
const vuelo_salida = require('../vuelosModels/vuelo_salidaModel');

const aviones = db.define('aviones',{
    nro_fab:{
        type:sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        validate:{
            isAlphanumeric: true,
            notEmpty: true
        }
    },
    estado:{ //0 para en servicio, 1 para en espera, 2 para en mantenimiento, 3 para dañado
        type:sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            isNumeric: true,
            notEmpty: true,
            min: 0,
            max: 3
        }
    },
    equipo_medico:{ //Todos los aviones por defecto tienen su equipo médico
        type:sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        validate:{
            notEmpty: true
        }
    },
    nro_tripulantes:{ //Por defecto no hay tripulación asignada
        type:sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    activo:{
        type: sequelize.TINYINT,
        defaultValue: 1,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

    //Un avión tiene un modelo (FK del modelo)
aviones.belongsTo(modelo, {
    foreignKey: 'modelo', targetKey: 'numero',
    onDelete: 'SET NULL', onUpdate:'CASCADE',
})

    //Un avión tiene una ruta (FK de la ruta)
aviones.belongsTo(ruta, {
    foreignKey: 'nro_ruta', targetKey: 'numero',
    onDelete: 'SET NULL', onUpdate:'CASCADE'
})

    //Resulta de la normalización de avión para evitar nulls y redundancia
    //(FK va a la relación avion_alquilado)
aviones.hasMany(avion_alquilado, {
    foreignKey: 'avion', sourceKey: 'nro_fab',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Avión con vuelos que han salido, la PK del avión va a la FK de vuelo_salida
aviones.hasMany(vuelo_salida, {
    foreignKey: 'nro_avion', sourceKey: 'nro_fab',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})
    

    //Se agrega la PK como FK a avion_mantenimiento
    //M:N aviones-mantenimientos
aviones.belongsToMany(mantenimientos,{
    through: avion_mantenimiento, foreignKey: 'nro_avion',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = aviones;