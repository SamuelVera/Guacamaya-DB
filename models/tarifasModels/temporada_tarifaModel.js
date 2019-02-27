    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const temporada_tarifa = db.define('temporada-tarifa',{
    /*codigo_tarifa
    codigo_temporada*/
    monto:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true,
            min: 0
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

module.exports = temporada_tarifa;