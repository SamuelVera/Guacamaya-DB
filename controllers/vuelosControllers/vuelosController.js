const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const vuelosModel = require('../../models/associations/vuelosAssociations/vuelosAssociations');
const vuelosSalidaModel = require('../../models/associations/vuelosAssociations/vuelos_salidaAssociations');
const rutasModel = require('../../models/associations/rutasAssociations/rutasAssociations');
const pasajesModel = require('../../models/associations/pasajesAssociations/pasajesAssociations');
const avionesModel = require('../../models/associations/avionesAssociations/avionesAssociations');
const modeloAvionModel = require('../../models/associations/modeloAvionAssociations/modeloAvionAssociations');

const controller = {}

    //Próximos vuelos a este destino (NO TESTEADO FALTA DATA)
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

    //Próximos vuelos saliendo del aeropuerto X (NO TESTEADO FALTA DATA)
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

    //Pasajes abordados versus vendidos (NO TERMINADO)
controller.getAbordados = async (req, res) => {
    
        const { codigo_vuelo } = req.body
        const Op = sequelize.Op

        let response = await vuelosModel.findOne({
            include:[{
                model: pasajesModel,
                as: 'Pasajeros',
                required: true
            },{
                model: vuelosSalidaModel,
                as: 'Salida',
                require: true
            }],
            where:{
                codigo_vuelo,
                fecha: {[Op.lt]: new Date()},
                cancelado: 0,
                activo: 1
            }
        })

        if(response.length != 0){

            let resultadoPasajesVendidos = response.dataValues.Pasajeros.map(result => result.dataValues)
            let resultadoPasajesAbordados = resultadoPasajesVendidos.filter(item => {return item.abordado})
            
            console.log(resultadoPasajesVendidos.length) //Cantidad de pasajes vendidos para ese vuelo
            console.log(resultadoPasajesAbordados.length) //Cantidad de pasajeros que abordaron

        }

        //Vuelo cancelado o que no ha salido

}

    //Que vuelos tuvieron sobreventa en un mes determinado (NO TESTEADO NO HAY DATA)
controller.getVuelosSobreventa = async (req, res) => {

    let { fecha } = req.body
    const Op =  sequelize.Op

    fecha.setDate(1)
    const fechaI = fecha.getFullYear() + '-' + (fecha.getMonth()+1) + '-' + fecha.getDate()
    fecha.setMonth(fecha.getMonth()+1)
    fecha.setDate(0)
    const fechaF = fecha.getFullYear() + '-' + (fecha.getMonth()+1) + '-' + fecha.getDate()

    let response = await vuelosModel.findAll({
        attributes: [
            'codigo_vuelo',
            [sequelize.fn('COUNT',sequelize.col('*')), 'Vendidos']
    ],
        include:[{
            model: pasajesModel,
            as: 'Pasajeros',
            where:{
                activo: 1
            },
            required: true
        },{
            model: avionesModel,
            as: 'Avion',
            include:[{
                model: modeloAvionModel,
                as: 'Modelo',
                where:{
                    activo: 1
                },
                require: true
            }],
            where:{
                activo: 1
            },
            required: true
        }],
        group: 'codigo_vuelo'
        ,
        where:{
            fecha:{
                [Op.between]: [fechaI, fechaF]
            },
            cancelado: 0,
            activo: 1
        }
    })

    let resultados = response.map(result => result.dataValues)
    if(!!resultados){
        let resultadosFinales = resultados.filter(item => {
            let vendidos = resultados.Pasajeros.map(result => result.dataValues)
            let modelo = item.Avion.dataValues.Modelo.dataValues

            return (vendidos.length > (modelo.cantidad_asientos_eje + modelo.cantidad_asientos_eco))
        })

        console.log(resultadosFinales) //Vuelos con sobreventa
    }

    

}

module.exports = controller;