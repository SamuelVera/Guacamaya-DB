    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const avion_alquilado = db.define('avion_alquilado',{
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

module.exports = avion_alquilado;