    //Importaciones
const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');    
const aeropueto = require('./aeropuertosModel');

const aero_pista = db.define('aero_pistas', {
    nro_pista:{
        type: sequelize.INTEGER,
        primaryKey: true,
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
    despgue_aterrizaje:{
        type: sequelize.TINYINT, //True para despegue y False para aterrizaje
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

    //Pista pertenece a un aeropuerto (FK del aeropuerto)
aero_pista.belongsTo(aeropueto, {
    foreignKey: 'iata', targetKey: 'iata',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = aero_pista;