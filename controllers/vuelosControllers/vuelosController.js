const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const vuelosModel = require('../../models/associations/vuelosAssociations/vuelosAssociations');
const vuelosSalidaModel = require('../../models/associations/vuelosAssociations/vuelos_salidaAssociations');
const rutasModel = require('../../models/associations/rutasAssociations/rutasAssociations');

const controller = {}

    //Próximos vuelos a este destino (NO TESTEADO)
controller.getProximosVuelosA = async (req, res) => {

    const { destino } = req.body
    const fecha = new Date()
    const Op = sequelize.Op

    let response = await vuelosModel.findAll({
        attributes: {exclude: ['cancelado','activo']},
        include:[{
            model: rutasModel,
            as: 'Ruta',
            where:{
                activo: 1,
                destino
            }
        }],
        where:{
            fecha:{
                [Op.gt]: fecha
            },
            activo: 1
        }
    })

    let resultado = response.map(result => result.dataValues)

    if(!!resultado){
        console.log(resultado)
    }

}

    //Próximos vuelos saliendo del aeropuerto X (NO TESTEADO)
controller.getProximosVuelosDesde = async (req, res) => {

    const { origen } = req.body
    const fecha = new Date()
    const Op = sequelize.Op

    let response = await vuelosModel.findAll({
        attributes: {exclude: ['cancelado','activo']},
        include:[{
            model: rutasModel,
            as: 'Ruta',
            where:{
                activo: 1,
                origen
            }
        }],
        where:{
            fecha:{
                [Op.gt]: fecha
            },
            activo: 1
        }
    })

    let resultado = response.map(result => result.dataValues)

    if(!!resultado){
        console.log(resultado)
    }
}

    //Pasajes abordados versus vendidos (NO TESTEADO)
controller.getAbordados = async (req, res) => {
    
        const { codigo_vuelo } = req.body
        
        let response = await vuelosModel.findOne({
            where:{
                codigo_vuelo,
                cancelado: 0,
                activo: 1
            }
        })

        if(response.length != 0){

                //Total de pasajes vendidos para ese vuelo
            let responsePasajes = await response.getPasajes({
                where:{
                    activo: 1
                }
            })

                //Total de vendidos
            let totalVendidos = responsePasajes.map( result => result.dataValues )

            if(!!totalVendidos){
                //Abordados entre esos vendidos
                let totalAbordados = totalVendidos.filter( item => {return item.abordado})
                console.log(totalVendidos.length) //Total de vendidos
                console.log(totalAbordados.length) //Total de abordados
            }

            //No pasa = error

        }

        //Vuelo no realizado
}



module.exports = controller;