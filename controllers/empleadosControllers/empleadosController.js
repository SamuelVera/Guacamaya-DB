const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const empleadosModel = require('../../models/empleadosModels/empleadosModel');
const empleadosSueloModel = require('../../models/empleadosModels/empleados_sueldoModel');

const controller = {}

    //Obtener los gastos en sueldo de una quincena determinada
controller.getGastosSueldoQuin = async (req, res) => {
    try{

        var { fechaI, fechaF } = req.body
        const op = sequelize.Op

        let fechaInicio = fechaI.getFullYear()+'-'+(fechaI.getMonth()+1)+'-'+fechaI.getDate()
        let fechaFinal = fechaF.getFullYear()+'-'+(fechaF.getMonth()+1)+'-'+fechaF.getDate()

            //Suma entre las dos fechas
        let response = await empleadosSueloModel.sum('sueldo',{
            where:{
                fecha: {[op.between]: [fechaInicio, fechaFinal]}
            }
        })

            //La suma
        console.log(response)

        //Render

    }catch(err){
        console.log(err);
    }

}

module.exports = controller;