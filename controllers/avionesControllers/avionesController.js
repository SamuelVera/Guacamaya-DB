const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const avionesModel = require('../../models/associations/avionesAssociations/avionesAssociations');
const vuelosModel = require('../../models/associations/vuelosAssociations/vuelosAssociations');
const modelosAvionModel = require('../../models/modeloAvionModels/modelo_avionModel');
const mantenimientosModel = require('../../models/associations/avionesAssociations/mantenimientoAssociations');
const avionMantenimientoModel = require('../../models/associations/avionesAssociations/avion_mantenimientoAssociations');

const controller = {}

controller.getAllAviones = async (req, res) => {
    let response = await avionesModel.findAll({
        where:{
            activo: 1
        }
    })

    let resultados = response.map(results => results.dataValues)
    if(!!resultados){
        //Render
    }
    //Error
}

    //Get los vuelos de un avión en un mes determinado
controller.getVuelosAvionMensual = async (req, res) => {
            //Se require de la fecha con el mes y el número del avión
        //const { nro_fab, fecha } = req.body
        const Op = sequelize.Op;

            //Formateo de las fechas
        //let fechaInicio = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate(1)
        fecha.setMonth(fechaF.getMonth()+1);
        let fechaFinal = fechaF.getFullYear()+'-'+(fechaF.getMonth()+1)+'-'+fechaF.getDate(0)

        let response = await avionesModel.findAll({
            include:[{ //Inner join
                model: vuelosModel,
                as: 'Vuelos',
                where: {
                    fecha: {[Op.between]: [fechaInicio, fechaFinal]}, //Este entre ambas fechas
                    fecha: {[Op.lt]: new Date()}, //Sea menor a la fecha actual
                    cancelado: 0, //No haya sido cancelado el vuelo
                    activo: 1 //No este 'eliminado'
                }
            }],
            where:{
                nro_fab, //Avión seleccionado
                activo: 1 //No este como 'eliminado'
            }
        })

        console.log(response);

        //let resultado = response.Vuelos.map(result => result.dataValues)
        //console.log(resultado); //El length del array sería la cantidad de vuelos

        if(!!resultado){
            //Si entra lo consiguio detener el flujo con un render
        }

        //No entra, error
        
}

    //Get el modelo de un avión
controller.getAvionModelo = async (req, res) => {
    
    const { nro_fab } = req.body

    let response = await avionesModel.findOne({
        include:[{
            model: modelosAvionModel,
            as: 'Modelo',
            where:{
                activo: 1
            }
        }],
        where:{
            nro_fab: 1,
            activo: 1
        }
    })

    let resultadoAvion = response.dataValues
    let resultadoModelo = resultadoAvion.Modelo.dataValues

    if(!!resultadoAvion && !!resultadoModelo){  //Avión con su modelo
        console.log(resultadoAvion)
        console.log(resultadoModelo)
    }

}

    //Aviones que han estado en un vuelo que ha sido cancelado
controller.getHanCancelado = async (req, res) => {

    let response = await avionesModel.findAll({
        attributes: {exclude: ['activo']},
        include:[{
            model: vuelosModel,
            as: 'Vuelos',
            where:{
                activo: 1,
                cancelado: 1
            },
            required: true
        }]
    })

    let resultado = response.map(result => result.dataValues)

    if(!!resultado){
        console.log(resultado) //Los aviones
    }
}

    //Get aviones en un estado dado
controller.getAvionesEstado = async (req, res) => {

    const { estado } = req.body

    let response = await avionesModel.findAll({
        where:{
            estado
        }
    })

    let resultados = response.map(result => result.dataValues)

    if(!!resultados){
        console.log(resultados) //Resultados
    }
}

    //Get el último mantenimiento de un avión
controller.getUltimoMantenimiento = async (req, res) => {

    //const { nro_fab } = req.body

    let response = await avionMantenimientoModel.findOne({
        attributes: ['nro_avion',[sequelize.fn('MAX',sequelize.col('fecha_salida')), 'salidaDelUltimoMantenimiento']],
        include:[{
            model: mantenimientosModel,
            as: 'Mantenimiento',
            where:{
                activo: 1
            }
        }],
        where:{
            nro_avion: 1
        },
        group: [sequelize.literal('`avion_mantenimiento`.`nro_avion`')]
    })


    let resultadoFecha = response.dataValues;
    let resultadoMantenimiento = resultadoFecha.Mantenimiento.dataValues

    if(!!resultadoFecha && !!resultadoMantenimiento){
        console.log(resultadoFecha)
        console.log(resultadoMantenimiento)
    }

    
}

    //Registrar un avión como alquilado (NO TERMINADO)
controller.addAlquilado = async (req, res) => {

    const { nro_fab, nro_tripulantes, modelo, nro_ruta } = req.body
    const alquilado = 1

    //avionesModel.create()
}

module.exports = controller;