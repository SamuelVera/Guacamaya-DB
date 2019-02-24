    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const aeropuerto = require('../aeropuertoModels/aeropuertosModel');

const ruta = db.define('rutas', {
    numero:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    /*origen:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true,
        }
    },
    destino:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true,
        }
    },*/
    distancia:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

    //La ruta tiene un origen que es un aeropuerto
    //(La FK se coloca en la ruta)
ruta.belongsTo(aeropuerto, {foreignKey: 'origen', targetKey: 'iata',
onDelete: 'CASCADE', onUpdate: 'CASCADE'})

    //La ruta tiene un destino que es un aeropuerto
    //(La FK se coloca en la ruta)
ruta.belongsTo(aeropuerto, {foreignKey: 'destino', targetKey: 'iata',
onDelete: 'CASCADE', onUpdate: 'CASCADE'})

module.exports = ruta;