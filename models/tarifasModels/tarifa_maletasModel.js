    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const tarifas = require('./tarifasModel');

const tarifa_maletas = db.define('tarifa_maletas',{
    cantidad_maletas:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    peso_maletas:{
        type: sequelize.INTEGER,
        primaryKey: true,
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
},{
    timestamps: false,
    freezeTableName: true
})

    //Agregar la PK de tarifas como FK
tarifa_maletas.belongsTo(tarifas, {
    foreignKey: 'codigo', targetKey: 'codigo',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = tarifa_maletas;