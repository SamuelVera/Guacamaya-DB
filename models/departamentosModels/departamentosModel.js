    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const departamento = db.define('departamentos',{
    iata:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true
        }
    },
    nro_dep:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    nom_dep:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha,
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = departamento;