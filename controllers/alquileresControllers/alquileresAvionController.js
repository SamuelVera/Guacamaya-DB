const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const avionesModel = require('../../models/associations/avionesAssociations/avionesAssociations');
const alquilerAvionesModel = require('../../models/associations/avionesAssociations/avion_alquiladoAssociations');
const arrendatariosModel = require('../../models/associations/arrendatarioAssociations/arrendatariosAssociations');
const tarifasAlquilerModel = require('../../models/associations/arrendatarioAssociations/tarifasAlquilerAssociations');
const distanciasModel = require('../../models/associations/arrendatarioAssociations/distanciaAssociations');

const controller = {}

    //Get cantidad de alquileres en el mes X
controller.getCantidadAlquiladosEnMes = async (req, res) => {

    let {fecha} = req.body
    const Op = sequelize.Op

    fecha.setDate(1)
    const fechaI = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
    fecha.setMonth(fecha.getMonth()+1)
    fecha.setDate(0)
    const fechaF = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()

    let response = await alquilerAvionesModel.count({
        where:{
            fecha: {[Op.between]: [fechaI,fechaF]}
        }
    })

        //Devuelve el número
    if(!!response){
            //Mes y año de la fecha seleccionada
        const fechaMostrar = fecha.getFullYear()+'-'+(fecha.getMonth()+1)
        console.log(response)
    }
    
}

    //Get info de los arredatarios
controller.getArrendatarios = async (req, res) => {

    let response = await arrendatariosModel.findAll({
        attributes: {exclude: ['activo']},
        where:{
            activo: 1
        }
    }
    )

    let resultados = response.map(result => result.dataValues)

    if(!!resultados){
        console.log(resultados)
    }

}

    //Get info de las tarifas de alquiler ofrecidas
controller.getTarifasAlquiler = async (req, res) => {
    
    let response = await db.query(`
        SELECT a.nombre, a.tiempo_respuesta, ta.monto, d.distancia_minima, d.distancia_maxima
        FROM arrendatarios AS a
        INNER JOIN tarifas_alquiler AS ta
        ON a.nombre = ta.nombre_arrendatario
        INNER JOIN distancias AS d
        ON d.codigo = ta.codigo_distancia
        WHERE (a.activo = 1) AND (ta.activo = 1) AND (d.activo = 1)
    `,{
        type: sequelize.QueryTypes.SELECT
    })

    if(!!response){
        console.log(response)
    }

}

    //Añadir un alquiler (NO TERMINADO)
controller.addAlquiler = async (req, res) => {

    const { avion, nombre_arrendatario, fecha} = req.body

    await alquilerAvionesModel.create({
        avion,
        nombre_arrendatario,
        fecha
    })

}

module.exports = controller;