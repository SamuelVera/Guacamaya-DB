const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const avionesModel = require('../../models/associations/avionesAssociations/avionesAssociations');
const vuelosModel = require('../../models/associations/vuelosAssociations/vuelosAssociations');
const vueloSalidaModel = require('../../models/associations/vuelosAssociations/vuelos_salidaAssociations');
const modelosAvionModel = require('../../models/associations/modeloAvionAssociations/modeloAvionAssociations');
const mantenimientosModel = require('../../models/associations/avionesAssociations/mantenimientoAssociations');
const avionMantenimientoModel = require('../../models/associations/avionesAssociations/avion_mantenimientoAssociations');

const controller = {}

    //TODO
controller.getAllAviones = async (res) => {
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

    //Get los aviones registrados como alquilados
controller.getAllAlquilados = async (res) => {

    let response = await avionesModel.findAll({
        where:{
            alquilado: 1,
            activo: 1
        }
    })

    let resultados = response.map(result => result.dataValues)

    if(!!resultados){
        console.log(resultados)
    }

}

    //Poner equipo médico a un avión
controller.setEquipoMedico = async (req, res) => {

    const { nro_fab } = req.body

    await avionesModel.update({
        equipo_medico: 1
    },{
        where:{
            nro_fab,
            activo: 1
        }
    })
}

    //Poner avión como dañado
controller.setDamaged = async (req, res) => {

    const { nro_fab } = req.body

    await avionesModel.update({
        estado: 3
    },{
        where:{
            nro_fab
        }
    })

}

    //Poner avión en servicio
controller.setEnServicio = async (req, res) => {
    const { nro_fab } = req.body

    await avionesModel.update({
        estado: 0
    },{
        where:{
            nro_fab
        }
    })
}

    //Poner avión es espera
controller.setEnEspera = async (req, res) => {
    const { nro_fab } = req.body

    await avionesModel.update({
        estado: 1
    },{
        where:{
            nro_fab
        }
    })
}

    //Enviar a mantenimiento al avión (NO TESTEADO)
controller.sendToMantenimiento = async (req, res) => {

    const { nro_avion, codigo_mantenimiento } = req.body
    const fecha_entrada = new Date()
    let fecha_salida

    if(codigo_mantenimiento = 0){
        fecha_salida = fecha_entrada
    }else if(codigo_mantenimiento = 1){
        fecha_salida = fecha_entrada
        fecha_salida.setDate(fecha_entrada.getDate()+7)
    }else{
        fecha_salida = fecha_entrada
        fecha_salida.setDate(fecha_entrada.getDate()+3)
    }

    await avionMantenimientoModel.create({
        nro_avion, 
        fecha_entrada,
        fecha_salida,
        codigo_mantenimiento
    })
    
}

    //Get la cantidad de vuelos de un avión en un mes determinado
controller.getVuelosAvionMensual = async (req, res) => {
            //Se require de la fecha con el mes y el número del avión
        const { nro_fab, fecha } = req.body
        const Op = sequelize.Op;

            //Formateo de las fechas
        let fechaInicio = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate(1)
        fecha.setMonth(fechaF.getMonth()+1);
        let fechaFinal = fechaF.getFullYear()+'-'+(fechaF.getMonth()+1)+'-'+fechaF.getDate(0)

        let response = await avionesModel.count({
            include:[{ //Inner join
                model: vuelosModel,
                as: 'Vuelos',
                include:[{
                    model: vueloSalidaModel,
                    as: 'Salida',
                    where:{
                        fecha_salida:{
                            [Op.between]: [fechaInicio, fechaFinal] //Este entre ambas fechas
                        }
                    },
                    required: true
                }],
                where: {
                    cancelado: 0, //No haya sido cancelado el vuelo
                    activo: 1 //No este 'eliminado'
                }
            }],
            where:{
                nro_fab, //Avión seleccionado
                activo: 1 //No este 'eliminado'
            }
        })

        console.log(response);

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
            nro_fab,
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

    const { nro_avion } = req.body

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
            nro_avion,
            activo: 1
        },
        group: [sequelize.literal('`avion_mantenimiento`.`nro_avion`')]
    })


    let resultadoFecha = response.dataValues;
    let resultadoMantenimiento = resultadoFecha.Mantenimiento.dataValues

    if(!!resultadoFecha && !!resultadoMantenimiento){
        let resultadoFinal = {
            nro_avion: resultadoFecha.nro_avion,
            salidaDelUltimoMantenimiento: resultadoFecha.salidaDelUltimoMantenimiento,
            codigo_mantenimiento: resultadoMantenimiento.codigo,
            tipo_mantenimiento: resultadoMantenimiento.tipo
        }
        console.log(resultadoFinal)
    }

    
}

    //Registrar un avión como alquilado (NO TESTEADO)
controller.addAlquilado = async (req, res) => {

    const { nro_fab, nro_tripulantes, modelo, nro_ruta } = req.body
    const alquilado = 1

    await avionesModel.create({
        nro_fab,
        nro_tripulantes,
        modelo,
        nro_ruta,
        alquilado
    })

}

    //Registrar un nuevo avión comprado (NO TESTEADO)
controller.addNewAvion = async (req, res) => {

    const { nro_fab, modelo, nro_ruta } = req.body
    const alquilado = 0

    await avionesModel.create({
        nro_fab,
        alquilado,
        nro_ruta,
        modelo
    })

}

    //Get Cantidad de vuelos de los aviones en un año
controller.getVuelosAnuales = async (req, res) =>{

    let { fecha } = req.body
    const Op = sequelize.Op

    fecha.setMonth(0)
    fecha.setDate(1)
    const fechaI = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
    fecha.setFullYear(fecha.getFullYear() + 1)
    fecha.setMonth(0)
    fecha.setDate(0)
    const fechaF = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()

    let response = await avionesModel.findAll({
        attributes:[
            'nro_fab',
            [sequelize.fn('COUNT',sequelize.col('*')), 'cantidadVuelos']
        ],
        include:[{
            model: vuelosModel,
            as: 'Vuelos',
            where:{
                fecha:{
                    [Op.between]: ['2018-01-01', '2019-12-31']
                },
                activo: 1
            },
            required: true
        }],
        where:{
            activo: 1
        },
        group: 'nro_fab',
        order: [[sequelize.literal('cantidadVuelos'),'DESC'],['nro_fab','ASC']]
    })

    let resultados = response.map(result => result.dataValues)

    if(!!resultados){
        console.log(resultados)
    }

}

    //Get Promedio de vuelos mensuales de un avión (NO TERMINADO)
controller.getPromedioVuelosMensuales = async (req, res) => {
    
}

    //Eliminar un avión del sistema
controller.deleteAvion = async (req, res) => {

    const { nro_fab } = req.body

    await avionesModel.update({
        activo: 0
    },{
        where:{
            nro_fab
        }
    })

}

    //Set el número de tripulantes
controller.setTripulacion = async (req, res) => {

    const { nro_fab, nro_tripulantes } = req.body

    await avionesModel.update({
        nro_tripulantes
    },{
        where:{
            nro_fab
        }
    })

}

module.exports = controller;