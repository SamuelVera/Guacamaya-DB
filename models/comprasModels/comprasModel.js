    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const compras = db.define('compras',{
    numero_factura:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    cantidad_pasajes:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    fecha:{
        type: sequelize.DATE,
        allowNull: false,
        validate:{
            isDate: true,
            notEmpty: true
        }
    },
    monto:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
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
    /*Cédula comprador*/
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = compras;