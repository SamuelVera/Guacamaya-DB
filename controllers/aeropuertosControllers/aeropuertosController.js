const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const aeropuertosModel = require('../../models/associations/aeropuertoAssociations/aeropuertosAssociations');
const rutasModel = require('../../models/associations/rutasAssociations/rutasAssociations');
const vuelosModel = require('../../models/associations/vuelosAssociations/vuelosAssociations');
const vuelosSalidaModel = require('../../models/associations/vuelosAssociations/vuelos_salidaAssociations');

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
            order: [[sequelize.literal('`nroVuelos`'),'DESC']]
        })

        let resultado = response.map(result => result.dataValues)

        if(!!resultado){    //Esto tiene un atributo IsDestino que no importa
            console.log(resultado) //Resultado tiene el iata, pais, ciudad y nroVuelos
        }

}

    //NO TERMINADO (Pasajes abordados a un destino en un mes)
controller.getVisitasFromAerpuerto = async (req, res) => {
    
    let {fecha, aeropuerto} = req.body
    const Op = sequelize.Op

    fecha.setDate(1)
    const fechaI = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
    fecha.setMonth(fecha.getMonth()+1)
    fecha.setDate(0)
    const fechaF = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()

}

    ////NO TERMINADO (Pasajes abordados a todos los destinos en un mes)
controller.getVisitasFromAll = async (req, res) => {
    
    let {fecha} = req.body
    const Op = sequelize.Op

    fecha.setDate(1)
    const fechaI = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
    fecha.setMonth(fecha.getMonth()+1)
    fecha.setDate(0)
    const fechaF = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()

}

module.exports = controller;