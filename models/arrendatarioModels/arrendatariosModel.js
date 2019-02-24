//Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const tarifas_alquiler = require('./tarifas_alquiler');
const avion_alquilado = require('../avionesModels/avion_alquiladoModel');

const arrendatario = db.define('arrendatarios',{
    nombre:{
        type: sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            isAlphanumeric: true
        }
    },
    tiempo_respuesta:{
        type: sequelize.INTEGER,
        allowNull: true,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

    //Arrendatario N:M Distancias, en el model de tarifa_alquiler se agrega la FK
arrendatario.belongsToMany(distancia, {
    through: [tarifas_alquiler], foreignKey: 'nombre_arrendatario' ,
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Arrendatario alquila varios aviones (La FK va al avión)
arrendatario.hasMany(avion_alquilado, { 
    foreignKey: 'nombre_arrendatario', sourceKey: 'nombre',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = arrendatario;