const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const aeropuertosModel = require('../../models/associations/aeropuertoAssociations/aeropuertosAssociations');
const aeroPistasModel = require('../../models/associations/aeropuertoAssociations/aero_pistasAssociations');
const rutasModel = require('../../models/associations/rutasAssociations/rutasAssociations');
const vuelosModel = require('../../models/associations/vuelosAssociations/vuelosAssociations');
const vuelosSalidaModel = require('../../models/associations/vuelosAssociations/vuelos_salidaAssociations');
const pasajesModel = require('../../models/associations/pasajesAssociations/pasajesAssociations');

const controller = {}

    //Fetch de todos los aeropuertos
controller.getAll = async (res) =>{
        let response = await aeropuertosModel.findAll({
            where:{
                activo: 1
            }
        });
        let aeropuertos = response.map(result => result.dataValues);
        console.log(aeropuertos);
        if(!!aeropuertos){
            //Renderización
        }
        //Mensajito de error no se pudo
}

controller.addAeropuerto = async (req, res) => {
    const { iata, pais, ciudad } = req.body

    await aeropuertosModel.create({
        iata,
        pais,
        ciudad
    })
}

controller.deshabilitarAeropuerto = async (req, res) => {
    const { iata } = req.body
    await aeropuertosModel.update({
        activo: 0
    },{
        where:{
            iata
        }
    })
}

controller.getAllPistas = async (req, res) => {
    const { iata } = req.body
    let response = await aeroPistasModel.findAll({
        where:{
            activo: 1,
            iata
        }
    })
}

controller.addPista = async (req, res) => {
    const { iata, longitud, despegue_aterrizaje } = req.body
    const nro_pista = await aeroPistasModel.count({where:{iata}}) + 1
    await aeroPistasModel.create({
        nro_pista,
        iata,
        longitud,
        despegue_aterrizaje
    })
}

controller.deshabilitarPista = async (req, res) => {
    const { iata, nro_pista } = req.body
    await aeroPistasModel.update({
        activo: 0
    },{
        where:{
            iata,
            nro_pista
        }
    })
}

    //Vuelos al aeropuerto en el mes determinado
controller.getVuelosAeropuerto = async (req, res) => {
            //Aeropuerto, fechas de inicio y final
        let {fecha, aeropuerto} = req.body
        const Op = sequelize.Op

        fecha.setDate(1)
        const fechaI = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
        fecha.setMonth(fecha.getMonth()+1)
        fecha.setDate(0)
        const fechaF = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()

        let response = await vuelosModel.count({
            include:[{
                model: rutasModel,
                as: 'Ruta',
                where:{
                    activo: 1,
                    destino: aeropuerto
                },
                required: true
            }],
            where:{
                fecha: {[Op.between]: [fechaI, fechaF]},
                activo: 1,
                cancelado: 0
            },
            group: sequelize.literal('`Ruta`.`destino`')
        })

        if(!!response){
                //Resultados es la cantidad de visitas a es
            let resultados = {
                aeropuerto: aeropuerto,
                mes: (fechaI.getMonth()+1)+'-'+fechaI.getFullYear(),
                cantidadVuelos: response[0].count
            }

            console.log(resultados)

            //Render
        }
        
}

    //Get Cantidad de vuelos a los aeropuertos en un mes determinado
controller.getVuelosFromAll = async (req, res) => {
        
        let {fecha} = req.body
        const Op = sequelize.Op

        fecha.setDate(1)
        const fechaI = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
        fecha.setMonth(fecha.getMonth()+1)
        fecha.setDate(0)
        const fechaF = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()

        let response = await aeropuertosModel.findAll({
            attributes: {include: [[sequelize.fn('COUNT',sequelize.col('*')), 'nroVuelos']], exclude: ['activo']},
            include:[{
                model: rutasModel,
                as: 'IsDestino',
                include:[{
                    model: vuelosModel,
                    as: 'Vuelos',
                    include:[{
                        model: vuelosSalidaModel,
                        as: 'Salida',
                        required: true
                    }],
                    where:{
                        fecha: {[Op.between]: [fechaI, fechaF]},
                        activo: 1
                    },
                    required: true
                }],
                where:{
                    activo: 1
                },
                required: true
            }],
            group: 'iata',
            order: [[sequelize.literal('`nroVuelos`'),'DESC'],['iata','ASC']]
        })

        let resultado = response.map(result => result.dataValues)

        if(!!resultado){    //Esto tiene un atributo IsDestino que no importa
            console.log(resultado) //Resultado tiene el iata, pais, ciudad y nroVuelos
        }

}

    //NO TESTEADO NO HAY DATA (Pasajes abordados a un destino en un mes)
controller.getVisitasFromAerpuerto = async (req, res) => {
    
    let {fecha, aeropuerto} = req.body
    const Op = sequelize.Op

    fecha.setDate(1)
    const fechaI = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
    fecha.setMonth(fecha.getMonth()+1)
    fecha.setDate(0)
    const fechaF = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()


    let response = await aeropuertosModel.findOne({
        attributes: ['`aeropuertos`.`iata`',[sequelize.fn('COUNT','*'),'Visitas']],
        include:[{
            model: rutasModel,
            as: 'isDestino',
            include:[{
                model: vuelosModel,
                as: 'Vuelos',
                include: [{
                    model: vuelosSalidaModel,
                    as: 'Salida',
                    required: true
                },{
                    model: pasajesModel,
                    as: 'Pasajeros',
                    where:{
                        activo: 1,
                        abordado: 1
                    },
                    required: true
                }],
                where:{
                    fecha: {
                        [Op.between]: [fechaI, fechaF]
                    },
                    activo: 1
                },
                required: true
            }],
            where:{
                activo: 1
            },
            required: true
        }],
        where:{
            aeropuerto,
            activo: 1
        }
    })

    let resultado = response.dataValues

    if(!!resultado){
        console.log(resultado)
    }

}

    ////NO TESTEADO NO HAY DATA (Pasajes abordados a todos los destinos en un mes)
controller.getVisitasFromAll = async (req, res) => {
    
    let { fecha } = req.body
    const Op = sequelize.Op

    /*fecha.setDate(1)
    const fechaI = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
    fecha.setMonth(fecha.getMonth()+1)
    fecha.setDate(0)
    const fechaF = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()*/

    let response = await aeropuertosModel.findAll({
        attributes: ['`aeropuertos`.`iata`',[sequelize.fn('COUNT','*'),'Visitas']],
        include:[{
            model: rutasModel,
            as: 'isDestino',
            include:[{
                model: vuelosModel,
                as: 'Vuelos',
                include: [{
                    model: vuelosSalidaModel,
                    as: 'Salida',
                    required: true
                },{
                    model: pasajesModel,
                    as: 'Pasajeros',
                    where:{
                        activo: 1,
                        abordado: 1
                    },
                    required: true
                }],
                where:{
                    /*fecha: {
                        [Op.between]: [fechaI, fechaF]
                    },*/
                    activo: 1
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
        group: 'iata',
        order: [[sequelize.literal('`Visitas`'),'DESC'],['iata','ASC']]
    })

    let resultados = response.map(result => result.dataValues)

    if(!!resultados){
        console.log(resultados)
    }

}

module.exports = controller;