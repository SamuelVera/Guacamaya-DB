const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const aeropuertosModel = require('../../models/associations/aeropuertoAssociations/aeropuertosAssociations');
const rutasModel = require('../../models/associations/rutasAssociations/rutasAssociations');
const vuelosModel = require('../../models/associations/vuelosAssociations/vuelosAssociations');
const vuelosSalidaModel = require('../../models/associations/vuelosAssociations/vuelos_salidaAssociations');
const pasajesModel = require('../../models/associations/pasajesAssociations/pasajesAssociations');
const clientesModel = require('../../models/associations/clientesAssociations/clientesAssociations');
const comprasModel = require('../../models/associations/comprasAssociations/comprasAssociations');

const controller = {}

    //Get cantidad de pasajes por sexo del pasajero en un mes (NO TESTEADO)(NO HAY DATA)
controller.getPasajesPorSexoMensual = async (req, res) => {

    let { fecha } = req.body
    const Op = sequelize.Op

    /*fecha.setDate(1)
    const fechaI = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
    fecha.setMonth(fecha.getMonth()+1)
    fecha.setDate(0)
    const fechaF = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()*/

    let response = await clientesModel.findAll({
        attributes: [['sexo'],[sequelize.fn('COUNT','*'),'`CantidadDePasajes`']],
        include:[{
            model: pasajesModel,
            as: 'Pasajes',
            include:[{
                model: vuelosModel,
                as: 'Vuelo',
                where:{
                    activo: 1,
                    /*
                        fecha: {
                            [Op.betwween]: [fechaI, fechaF]
                        }
                    */
                },
                required: true
            }],
            where:{
                activo: 1
            },
            required: true
        }],
        where:{
            activo: 1
        },
        group: 'cedula',
        order: [['`CantidadDePasajes`','DESC'],['sexo','ASC']]
    })

    let resultados = response.map(result => result.dataValues)

    if(!!resultados){
        console.log(resultados)
    }

}

    //Get cantidad de pasajes por sexo del pasajero en un mes (NO TESTEADO)(NO HAY DATA)
controller.getPasajesPorSexo = async (req, res) => {

        const Op = sequelize.Op
    
        let response = await clientesModel.findAll({
            attributes: [['sexo'],[sequelize.fn('COUNT','*'),'`CantidadDePasajes`']],
            include:[{
                model: pasajesModel,
                as: 'Pasajes',
                where:{
                    activo: 1
                },
                required: true
            }],
            where:{
                activo: 1
            },
            group: 'cedula',
            order: [['`CantidadDePasajes`','DESC'],['sexo','ASC']]
        })
    
        let resultados = response.map(result => result.dataValues)
    
        if(!!resultados){
            console.log(resultados)
        }
    
}

    //Get cantidad de pasajes con cliente en un rango de edad en un mes (NO TESTADO)(NO HAY DATA)
controller.getPasajesPorEdadesMensual = async (req, res) => {

    let { fecha } = req.body
    const Op = sequelize.Op

    /*fecha.setDate(1)
    const fechaI = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
    fecha.setMonth(fecha.getMonth()+1)
    fecha.setDate(0)
    const fechaF = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()*/

        //Menores de 20 años
    const fechaI020 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
    fechaBase.setFullYear(fechaBase.getFullYear()-20)
    const fechaF020 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
            //Entre 20 y 40 años
    const fechaI2040 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
    fechaBase.setFullYear(fechaBase.getFullYear()-20)
    const fechaF2040 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
            //Entre 40 y 60 años
    const fechaI4060 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
    fechaBase.setFullYear(fechaBase.getFullYear()-20)
    const fechaF4060 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
            //Mas de 60 años
    const fechaI60 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()

    let response = await clientesModel.findAll({
        attributes: [
            [sequelize.literal(
                `CASE
                    WHEN fecha_nac BETWEEN '${fechaF020}' AND '${fechaI020}' THEN 'Menores de 20 años'
                    WHEN fecha_nac BETWEEN '${fechaF2040}' AND '${fechaI2040}' THEN 'Entre 20 y 40 años'
                    WHEN fecha_nac BETWEEN '${fechaF4060}' AND '${fechaI4060}' THEN 'Entre 40 y 60 años'
                    WHEN fecha_nac < '${fechaI60}' THEN 'Mayores de 60 años'
                END`
                ),
                'rangoEdades'
            ],
            [
                sequelize.fn('COUNT','*'), 'cantidadPasajes'
            ]
        ],
        include: [{
            model: pasajesModel,
            as: 'Pasajes',
            include:[{
                model: vuelosModel,
                as: 'Vuelo',
                where:{
                    activo: 1,
                    /*
                        fecha: {
                            [Op.betwween]: [fechaI, fechaF]
                        }
                    */
                },
                required: true
            }],
            where:{
                activo: 1
            },
            required: true
        }],
        where:{
            activo: 1
        },
        group: sequelize.literal('rangoEdades'),
        order: [[sequelize.literal('cantidadPasajes'),'DESC']]
    })

    let resultados = response.map(result => result.dataValues)

    if(!!resultados){
        console.log(resultados)
    }

}

    //Get cantidad de pasajes con cliente en un rango de edad (NO TESTADO)(NO HAY DATA)
controller.getPasajesPorEdades = async (res) => {

    const Op = sequelize.Op

        //Menores de 20 años
    const fechaI020 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
    fechaBase.setFullYear(fechaBase.getFullYear()-20)
    const fechaF020 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
            //Entre 20 y 40 años
    const fechaI2040 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
    fechaBase.setFullYear(fechaBase.getFullYear()-20)
    const fechaF2040 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
            //Entre 40 y 60 años
    const fechaI4060 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
    fechaBase.setFullYear(fechaBase.getFullYear()-20)
    const fechaF4060 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
            //Mas de 60 años
    const fechaI60 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()

    let response = await clientesModel.findAll({
        attributes: [
            [sequelize.literal(
                `CASE
                    WHEN fecha_nac BETWEEN '${fechaF020}' AND '${fechaI020}' THEN 'Menores de 20 años'
                    WHEN fecha_nac BETWEEN '${fechaF2040}' AND '${fechaI2040}' THEN 'Entre 20 y 40 años'
                    WHEN fecha_nac BETWEEN '${fechaF4060}' AND '${fechaI4060}' THEN 'Entre 40 y 60 años'
                    WHEN fecha_nac < '${fechaI60}' THEN 'Mayores de 60 años'
                END`
                ),
                'rangoEdades'
            ],
            [
                sequelize.fn('COUNT','*'), 'cantidadPasajes'
            ]
        ],
        include: [{
            model: pasajesModel,
            as: 'Pasajes',
            where:{
                activo: 1
            },
            required: true
        }],
        where:{
            activo: 1
        },
        group: sequelize.literal('rangoEdades'),
        order: [[sequelize.literal('cantidadPasajes'),'DESC']]
    })

    let resultados = response.map(result => result.dataValues)

    if(!!resultados){
        console.log(resultados)
    }

}


    //Get destino más visitados por un sexo dado (NO TERMINADO)
controller.getDestinoMasVisitadoSexo = async (req, res) => {

    const { sexo } = req.body
    const Op = sequelize.Op
    
    let respose = await clientesModel.count({
        include:[{
            
        }]
    })

}

    //Get destino más visitado en un rango de edad (NO TERMINADO)
controller.getDestinoMasVisitadoEdad = async (req, res) => {

    const Op = sequelize.Op
    
}

    //Cantidad de clientes registrados por sexo
controller.getCantidadClientesPorSexo = async (res) => {

    let response = await clientesModel.findAll({
        attributes: ['sexo',[sequelize.fn('COUNT','*'),'CantidadClientes']],
        where:{
            activo: 1
        },
        group: 'sexo',
        order: [[sequelize.literal('`CantidadClientes`'),'DESC'],['sexo','ASC']]
    })

    let resultados = response.map(result => result.dataValues)

    if(!!resultados){
        console.log(resultados)
    }
}

    //Cantidad de clientes registrados por rangos de edad
controller.getCantidadClientesPorEdad = async (req) => {

    let fechaBase = new Date()

        //Menores de 20 años
    const fechaI020 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
    fechaBase.setFullYear(fechaBase.getFullYear()-20)
    const fechaF020 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
        //Entre 20 y 40 años
    const fechaI2040 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
    fechaBase.setFullYear(fechaBase.getFullYear()-20)
    const fechaF2040 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
        //Entre 40 y 60 años
    const fechaI4060 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
    fechaBase.setFullYear(fechaBase.getFullYear()-20)
    const fechaF4060 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()
        //Mas de 60 años
    const fechaI60 = fechaBase.getFullYear() +'-'+ (fechaBase.getMonth()+1)+'-'+fechaBase.getDate()

    let response = await clientesModel.findAll({
        attributes:[
            [
                sequelize.literal(
                `CASE
                    WHEN fecha_nac BETWEEN '${fechaF020}' AND '${fechaI020}' THEN 'Menores de 20 años'
                    WHEN fecha_nac BETWEEN '${fechaF2040}' AND '${fechaI2040}' THEN 'Entre 20 y 40 años'
                    WHEN fecha_nac BETWEEN '${fechaF4060}' AND '${fechaI4060}' THEN 'Entre 40 y 60 años'
                    WHEN fecha_nac < '${fechaI60}' THEN 'Mayores de 60 años'
                END`
                ),
                'rangoEdades'
            ]
            ,
            [sequelize.fn('COUNT','*'),'cantidadClientes']
        ],
        where:{
            activo: 1
        },
        group: sequelize.literal('rangoEdades'),
        order: [[sequelize.literal('cantidadClientes'),'DESC']]
    })

    let resultados = response.map(result => result.dataValues)

    if(!!resultados){
        console.log(resultados)
    }
}

    //Get empleados que son clientes
controller.getEmpleadosClientes = async (res) => {
    
}

module.exports = controller;