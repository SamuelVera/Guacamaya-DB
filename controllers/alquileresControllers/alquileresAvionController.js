const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const avionesModel = require('../../models/associations/avionesAssociations/avionesAssociations');
const alquilerAvionesModel = require('../../models/associations/avionesAssociations/avion_alquiladoAssociations');
const arrendatariosModel = require('../../models/associations/arrendatarioAssociations/arrendatariosAssociations');

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

module.exports = controller;