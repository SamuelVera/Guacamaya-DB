    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const aero_pista = require('./aero_pistaModel');
const ruta = require('../rutaModels/rutaModel');

const aeropuerto = db.define('aeropuertos',
{
    iata:{ //Hacer validaciones de longitud en el front-end SOLO 3
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate:{
            isAlpha: true,
            notEmpty: true,
        }
    },
    pais:{ //Hacer validaciones de longitud en el front-end MAX 14
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true
        }
    },
    ciudad:{ //Hacer validaciones de longitud en el front-end MAX 58
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true
        }
    },
    activo:{
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        validate:{
            notEmpty
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
})

    //Un aeropuerto tiene múltiples pistas (Resulta de mapear el multivaluado)
    //(La FK va a la pista)
aeropuerto.hasMany(aero_pista, {
    sourceKey: 'iata', foreignKey: 'iata',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Un aeropuerto es origen de varias rutas (La FK va a la ruta)
aeropuerto.hasMany(ruta, {
    foreignKey: 'origen', sourceKey: 'iata',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Un aeropuerto es destino de varias rutas (La FK va a la ruta)
aeropuerto.hasMany(ruta, {
    foreignKey: 'destino', sourceKey: 'iata',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = aeropuerto