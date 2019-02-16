    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');    

const aero_pista = db.define('aero_pista', {
    iata:{ //Hacer, de ser necesarias, validaciones de longitud en el front-end SOLO 3
        type: sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            notEmpty: true,
        }
    },
    n_pista:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true
        }
    },
    longitud:{
        type: sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
            notEmpty: true,
            min: 0
        }
    },
    desp_arran:{
        type: sequelize.TINYINT, //True para despegue y False para arranque
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
}
)

module.exports = aero_pista;