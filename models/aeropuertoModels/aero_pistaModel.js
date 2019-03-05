    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const aero_pistas = db.define('aero_pistas', {
    nro_pista:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    longitud:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true,
            min: 0
        }
    },
    despegue_aterrizaje:{
        type: sequelize.TINYINT, //True para despegue y False para aterrizaje
        allowNull: false,
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

module.exports = aero_pistas;