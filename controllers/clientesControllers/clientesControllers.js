const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const clientesModels = require('../../models/associations/clientesAssociations/clientesAssociations');
const comprasModels = require('../../models/associations/comprasAssociations/comprasAssociations');
const pasajesModels = require('../../models/associations/pasajesAssociations/pasajesAssociations');
const rutasModels = require('../../models/associations/rutasAssociations/rutasAssociations');
const vuelosModels = require('../../models/associations/vuelosAssociations/vuelosAssociations');
const vuelosSalidaModels = require('../../models/associations/vuelosAssociations/vuelos_salidaAssociations');

const controller = {}

controller.getOne = async (req, res) => {
    const { cedula } = req.body    
    let response = await clientesModels.findOne({
        where:{
            cedula,
            activo: 1
        }
    })
    let resultado = response.dataValues;
    if(!!resultado){
        //Render
    }
    //Connect-flash
}

    //Top 10 clientes con más compras en un mes (NO TESTEADO)
controller.getMasComprasMensual = async (req, res) => {
    
    let { fecha } = req.body
    
    fecha.setDate(1)
    let fechaInicio = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
    fecha.setMonth(fecha.getMonth()+1)
    fecha.setDate(0)
    let fechaFinal = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
    
    
    let response = await comprasModels.findAll({
        attributes: [[sequelize.fn('COUNT',sequelize.col('*')), 'nroCompras']],
        include:[{
            model: clientesModels,
            as:'Cliente',
            where:{
                activo: 1
            },
            required: true
        }],
        where:{
            activo: 1
        },
        group: '`Cliente`.`cedula`',
        order: [[sequelize.literal('`nroCompras`'),'DESC'],[sequelize.literal('`Cliente`.`nombre`'),'ASC']],
        limit: 10
    })
    
    console.log(response)

}

    //Top 20 pasajeros con más millas viajadas en un mes (NO TESTEADO)
controller.getMasMillasViajadas = async (req, res) => {
    
    let { fecha } = req.body
    const Op = sequelize.Op

    fecha.setDate(1)
    const fechaInicio = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
    fecha.setMonth(fecha.getMonth()+1)
    fecha.setDate(0)
    const fechaFinal = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
    
    let response = await clientesModels.findAll({
        attributes: {include: [[sequelize.fn('SUM','Pasajes->Vuelo->Ruta.distancia'),'KmViajados']]},
        include:[{
            model: pasajesModels,
            as: 'Pasajes',
            include:[{
                model: vuelosModels,
                as: 'Vuelo',
                include:[{
                    model: rutasModels,
                    as: 'Ruta',
                    where:{
                        activo: 1
                    }
                },{
                    model: vuelosSalidaModels,
                    as: 'Salida'
                }],
                where:{
                    fecha: {[Op.between]: [fechaInicio, fechaFinal]},
                    cancelado: 0,
                    activo: 1
                }
            }],
            where:{
                activo: 1,
                abordado: 1
            }
        }],
        group: 'cedula',
        order: [[sequelize.literal('`kmViajados`'),'DESC']],
        limit: 20
    })

    let resultado = response.map(result => result.dataValues)

    if(!!resultado){ //Resultado tiene datos del cliente y sus KM VIAJADOS (Transformar a millas)
        console.log(resultado)
    }

}

    //Millas viajadas por un pasajero en un trimestre del año (NO TESTEADO)
controller.getMillasViajadasTrimestre = async (req, res) =>{

    let { cedula, fechaInicio, fechaFinal } = req.body
    const Op = sequelize.Op

    let response = await clientesModels.findAll({
        attributes: {include: [[sequelize.fn('SUM','Pasajes->Vuelo->Ruta.distancia'),'KmViajados']]},
        include:[{
            model: pasajesModels,
            as: 'Pasajes',
            include:[{
                model: vuelosModels,
                as: 'Vuelo',
                include:[{
                    model: rutasModels,
                    as: 'Ruta',
                    where:{
                        activo: 1
                    }
                },{
                    model: vuelosSalidaModels,
                    as: 'Salida'
                }],
                where:{
                    fecha: {[Op.between]: [fechaInicio, fechaFinal]},
                    cancelado: 0,
                    activo: 1
                }
            }],
            where:{
                activo: 1,
                abordado: 1
            }
        }],
        where:{
            cedula,
            activo: 1
        }
    })

    let resultado = response.map(result => result.dataValues)

    if(!!resultado){ //Resultado tiene datos del cliente y sus KM VIAJADOS (Transformar a millas)
        console.log(resultado)
    }

}

module.exports = controller;