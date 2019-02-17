    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const modelo_avion = db.define('modelo_avion',{
    modelo:{
        type: sequelize.INTEGER,
        primaryKey: true,
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
    dist_desp_car:{ //Distancia de despegue con la carga máxima
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
    t_combs:{ //Tipo de combustible
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    cap_combs:{ //Capacidad del combustible
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    nro_baño:{ //Cantidad de baños
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    nro_sal:{ //Cantidad de salidas de emergencia
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
    nro_eco:{ //Cantidad de asientos de clase económica
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    nro_eje:{ //Cantidad de asientos de clase ejecutivo
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    fabricante:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlphanumeric: true,
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = modelo_avion;