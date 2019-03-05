    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const empleados = db.define('empleados',{
    cedula:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    apellido:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true
        }
    },
    nombre:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true
        }
    },
    profesion:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true
        }
    },
    cargo:{
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
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = empleados;