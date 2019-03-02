    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const distancias = db.define('distancias',{
    codigo:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            isNumeric: true,
            min: 0
        }
    },
    distancia_min:{
        type: sequelize.INTEGER,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            isNumeric: true,
            min: 0
        }
    },
    distancia_max:{
        type: sequelize.INTEGER,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            isNumeric: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
})

    //Arrendatario N:M Distancias, en el model de tarifa_alquiler se agrega la FK
distancias.belongsToMany(arrendatarios,{
    through: tarifas_alquiler, foreignKey: 'codigo_distancia',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = distancias;