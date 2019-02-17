    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const avion = db.define('aviones',{
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
    ruta:{
        type:sequelize.INTEGER,
        validate:{
            isNumeric: true
        }
    },
    modelo:{ //Máximo 10 caracteres
        type:sequelize.STRING,
        allowNull: false,
        validate:{
            isAlphanumeric: true,
            notEmpty: true
        }
    },
    alquilado:{ //Los aviones por defecto no son alquilados
        type:sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true
        }
    },
    estado:{ //0 para en servicio, 1 para en espera, 2 para en mantenimiento, 3 para dañado
        type:sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            isNumeric: true,
            notEmpty: true,
            min: 0,
            max: 3
        }
    },
    equipo_med:{ //Todos los aviones por defecto tienen su equipo médico
        type:sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        validate:{
            notEmpty: true
        }
    },
    nro_trip:{ //Por defecto no hay tripulación asignada
        type:sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = avion;