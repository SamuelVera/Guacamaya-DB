    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const aviones = require('../avionesModels/avionesModel');

const modelo_avion = db.define('modelo_avion',{
    numero:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    cantidad_asientos_eje:{ //Cantidad de asientos de clase ejecutivo
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    cantidad_asientos_eco:{ //Cantidad de asientos de clase económica
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    v_crucero:{ //Velocidad de crucero
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    v_max:{ //Velocidad Máxima
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    p_vacio:{ //Peso vacío
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    cap_max_cab:{ //Capacidad máxima de la cabina
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    peso_max:{ //Peso máximo del avión
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    dist_despgue_qmax:{ //Distancia de despegue con la carga máxima
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    cap_max_eq:{ //Capacidad máxima del equipaje
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    tipo_combustible:{ //Tipo de combustible
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    capacidad_combustible:{ //Capacidad del combustible
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    nro_baios:{ //Cantidad de baños
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    nro_salidas:{ //Cantidad de salidas de emergencia
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    television:{ //Televisión incluida
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
        validate:{
            notEmpty: true
        }
    },
    internet:{ //Internet incluido
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
        validate:{
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
},{
    timestamps: false,
    freezeTableName: true
})

    //Un modelo da especificaciones de varios aviones (La FK va al avión)
modelo_avion.hasMany(aviones, {
    foreignKey: 'modelo', sourceKey: 'numero',
    onDelete: 'SET NULL', onUpdate: 'CASCADE'
})

module.exports = modelo_avion;