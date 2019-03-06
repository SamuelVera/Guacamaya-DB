const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const avionesModel = require('../../models/associations/avionesAssociations/avionesAssociations');
const vuelosModel = require('../../models/associations/vuelosAssociations/vuelosAssociations');

const controller = {}

    //Get los vuelos de un avión en un mes determinado
controller.getVuelosAvionMensual = async (req, res) => {
            //Se require de la fecha con el mes y el número del avión
        const { nro_fab, fecha } = req.body
        const Op = sequelize.Op;

            //Formateo de las fechas
        let fechaInicio = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate(1)
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

        let resultado = response.Vuelos.map(result => result.dataValues)
        console.log(resultado); //El length del array sería la cantidad de vuelos

        if(!!resultado){
            //Si entra lo consiguio detener el flujo con un render
        }

        //No entra, error
        
}

module.exports = controller;