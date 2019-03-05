const departamentos = require('../../departamentosModels/departamentosModel');
const aeropuertos = require('../../aeropuertoModels/aeropuertosModel');
const aero_pistas = require('../../aeropuertoModels/aero_pistaModel');
const rutas = require('../../rutasModels/rutasModel');

    //Un aeropuerto tiene varios departamentos (La FK va al departamento)
aeropuertos.hasMany(departamentos, {as: 'Departamentos',
    foreignKey: 'iata', sourceKey: 'iata',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Un aeropuerto tiene múltiples pistas (Resulta de mapear el multivaluado)(La FK va a la pista)
aeropuertos.hasMany(aero_pistas, {as: 'Pistas',
    sourceKey: 'iata', foreignKey: 'iata',
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

    //Un aeropuerto es origen de varias rutas (La FK va a la ruta)
aeropuertos.hasMany(rutas, {as: 'IsOrigen',
foreignKey: 'origen', sourceKey: 'iata',
onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

//Un aeropuerto es destino de varias rutas (La FK va a la ruta)
aeropuertos.hasMany(rutas, {as:'IsDestino',
foreignKey: 'destino', sourceKey: 'iata',
onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

module.exports = aeropuertos;