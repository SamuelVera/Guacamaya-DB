    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const temporada_tarifa = require('./temporada_tarifaModel');
const temporadas = require('./temporadasModel');
const tarifa_mano = require('./tarifa_manoModel');
const tarifa_maletas = require('./tarifa_maletasModel');
const pasajes = require('../pasajesModels/pasajesModel');

const tarifas = db.define('tarifas',{
    codigo:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    tipo_asiento:{
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        validate:{
            notEmpty: true
        }
    },
    activo:{
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        validate:{
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})
    //Se agrega la PK como FK a codigo_temporada
tarifas.belongsToMany(temporadas,{
    through: temporada_tarifa, foreignKey: 'codigo_tarifa',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Se agrega el código como FK a tarifa_mano
tarifas.hasMany(tarifa_mano, {
    foreignKey: 'codigo', sourceKey: 'codigo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Se agrega el código como FK a tarifa_maletas
tarifas.hasMany(tarifa_maletas, {
    foreignKey: 'codigo', sourceKey: 'codigo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Se agrega el código como FK a Pasaje
tarifas.hasMany(pasajes, {
    foreignKey: 'codigo_tarifa', sourceKey: 'codigo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = tarifas;