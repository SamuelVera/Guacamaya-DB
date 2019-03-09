    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

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
            notEmpty: true
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
    },
    alquilado:{
        type: sequelize.TINYINT,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = aviones;