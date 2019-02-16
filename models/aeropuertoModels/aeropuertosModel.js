    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');

const aeropuerto = db.define('aeropuertos',
{
    iata:{ //Hacer validaciones de longitud en el front-end SOLO 3
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate:{
            isAlpha: true,
            notEmpty: true,
        }
    },
    ciudad:{ //Hacer validaciones de longitud en el front-end MAX 58
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true
        }
    },
    pais:{ //Hacer validaciones de longitud en el front-end MAX 14
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            isAlpha: true,
            notEmpty: true
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = aeropuerto;
