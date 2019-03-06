const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const vuelosModel = require('../../models/associations/vuelosAssociations/vuelosAssociations');
const vuelosSalidaModel = require('../../models/associations/vuelosAssociations/vuelos_salidaAssociations');

const controller = {}

    //Porcentaje de abordados versus vendidos
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
            }

            //No pasa = posible error

        }

        //Vuelo cancelado
}

module.exports = controller;