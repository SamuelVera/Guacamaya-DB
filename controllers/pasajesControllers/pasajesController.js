const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const pasajesModel = require('../../models/associations/pasajesAssociations/pasajesAssociations');
const tarifasModel = require('../../models/associations/tarifasAssociations/tarifasAssociations');
const temporadasModel = require('../../models/associations/tarifasAssociations/temporadasAssociations');
const temporadaTarifaModel = require('../../models/associations/tarifasAssociations/temporada_tarifaAssociations');
const tarifaMaletasModel = require('../../models/associations/tarifasAssociations/tarifa_maletasAssociations');
const tarifaManoModel = require('../../models/associations/tarifasAssociations/tarifa_manoAssociations');
const compraModel = require('../../models/associations/comprasAssociations/comprasAssociations');

const controller = {}

    //Get los datos de la tarifa de un pasaje (NO TESTEADO FALTAN DATOS)
controller.getTarifaPasaje = async (req, res) => {

    const { serial_num } = await req.body

    let response = pasajesModel.findOne({
        include:[{
            model: tarifasModel,
            as: 'Tarifa',
            where:{
                activo: 1
            },
            required: true
        }],
        where:{
            serial_num,
            activo: 1
        }
    })

    let resultadoPasaje = response.dataValues

    if(!!resultadoPasaje){
        let resultadoTarifa = resultadoPasaje.Tarifa.dataValues
        console.log(resultadoPasaje)
        console.log(resultadoTarifa)
    }

}

    //Get los datos de una tarifa 
controller.getTarifaInfo = async (req, res) => {

    //const { codigo } = req.body

    let response = await tarifasModel.findOne({
        include:[{
            model: tarifaMaletasModel,
            as: 'Maletas',
            where:{
                activo: 1
            },
            required: false
        },{
            model: tarifaManoModel,
            as: 'Equipajes',
            where:{
                activo: 1
            },
            required: false
        },{
            model: temporadaTarifaModel,
            as: 'Temporadas',
            include:[{
                model: temporadasModel,
                as: 'Temporada',
                where:{
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
            codigo: 0,
            activo: 1
        }
    })

    let mapearTarifa = response.dataValues
    
    if(!!mapearTarifa){
        console.log(mapearTarifa)
        let resultadoTarifa = {
            codigo: mapearTarifa.codigo,
            tipo_asiento: mapearTarifa.tipo_asiento
        }
        console.log(resultadoTarifa)
        if(!!mapearTarifa.Equipajes){
            let resultadoEquipajesMano = mapearTarifa.Equipajes.map(result => result.dataValues)
            console.log(resultadoEquipajesMano)
        }
        let resultadoMaletas = mapearTarifa.Maletas.map(result => result.dataValues)
        let resultadoPreciosTemporada = mapearTarifa.Temporadas.map(result => result.dataValues)
        /*Para ver datos de la temporada es con
        resultadoPreciosTemporada[ÍNDICE EN EL ARREGLO].Temporada.dataValues.ATRIBUTO A VER
        */
        console.log(resultadoMaletas)
        console.log(resultadoPreciosTemporada)
        resultadoPreciosTemporada.forEach(element => console.log(element.Temporada.dataValues))
    }

    
}

    //Get los datos de las tarifas disponibles
controller.getTarifasDisponiblesInfo = async ( res ) => {

    let response = await tarifasModel.findAll({
        include:[{
            model: tarifaMaletasModel,
            as: 'Maletas',
            where:{
                activo: 1
            },
            required: false
        },{
            model: tarifaManoModel,
            as: 'Equipajes',
            where:{
                activo: 1
            },
            required: false
        },{
            model: temporadaTarifaModel,
            as: 'Temporadas',
            include:[{
                model: temporadasModel,
                as: 'Temporada',
                where:{
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
        }
    })

    let mapearTarifas = response.map(result => result.dataValues)

    if(!!mapearTarifas){
        let tarifas = []
        mapearTarifas.forEach(element => {
            let maletas = element.Maletas.map(result => result.dataValues)
            let temporadas = element.Temporadas.map(result => result.dataValues)
            if(!!element.Equipajes){
                let equipaje_mano = element.Equipajes.map(result => result.dataValues)
                tarifas.push({
                    codigo: element.codigo,
                    tipo_asiento: element.tipo_asiento,
                    equipaje_mano,
                    maletas,
                    temporadas
                })
            }else{
                tarifas.push({
                    codigo: element.codigo,
                    tipo_asiento: element.tipo_asiento,
                    equipaje_mano: null,
                    maletas,
                    temporadas
                })
            }
        })
        
        console.log(tarifas) //Cada tarifa con la estructura anterior
    }

}

    //Get cantidad pasajes con asientos del tipo económico vendidos en un mes(NO TESTEADO)(NO DATA)
controller.getEconomicosPorMes = async (req, res) => {

    let { fecha } = req.body
    const Op = sequelize.Op

    /*fecha.setDate(1)
    const fechaI = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
    fecha.setMonth(fecha.getMonth()+1)
    fecha.setDate(0)
    const fechaF = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()*/

    let response = await pasajesModel.count({
        include:[{
            model: tarifasModel,
            as: 'Tarifa',
            where:{
                activo: 1,
                tipo_asiento: 0
            },
            required: true
        },{
            model: compraModel,
            as: 'Compra',
            where:{
                activo: 1,
                /*
                fecha: {
                    [Op.between]: [fechaI, fechaF]
                }
                */
            },
            required: true
        }],
        where:{
            activo: 1
        }
    })

    console.log(response)
    
}

    //Get cantidad pasajes con asientos del tipo ejecutivo vendidos en un mes(NO TESTEADO)(NO DATA)
controller.getEjecutivosPorMes = async (req, res) => {

    let { fecha } = req.body
    const Op = sequelize.Op

    /*fecha.setDate(1)
    const fechaI = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
    fecha.setMonth(fecha.getMonth()+1)
    fecha.setDate(0)
    const fechaF = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()*/

    let response = await pasajesModel.count({
        include:[{
            model: tarifasModel,
            as: 'Tarifa',
            where:{
                activo: 1,
                tipo_asiento: 1
            },
            required: true
        },{
            model: compraModel,
            as: 'Compra',
            where:{
                activo: 1,
                /*
                fecha: {
                    [Op.between]: [fechaI, fechaF]
                }
                */
            },
            required: true
        }],
        where:{
            activo: 1
        }
    })

    console.log(response)
}

module.exports = controller;
