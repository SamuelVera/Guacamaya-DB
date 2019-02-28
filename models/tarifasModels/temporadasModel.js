    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const tarifas = require('./tarifasModel');

const temporadas = db.define('temporadas',{
    codigo:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    tipo:{
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
    timestamps:false,
    freezeTableName: true
})

    //Se agrega la PK como FK a codigo_temporada
temporadas.belongsToMany(tarifas,{
    through: temporada_tarifa, foreignKey: 'codigo_temporada',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = temporadas;