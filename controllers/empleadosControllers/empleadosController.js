const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const empleadosModel = require('../../models/empleadosModels/empleadosModel');
const empleadosSueloModel = require('../../models/empleadosModels/empleados_sueldoModel');

const controller = {}

    //Obtener datos de un solo empleado por su cédula
controller.getOne = async (req, res) => {
    
    const { cedula } = req.body

    let response = await empleadosModel.findOne({
        where:{
            cedula,
            activo: 1
        }
    });

    let resultado = response.dataValues;

    if(!!resultado){
        //Render
    }

    //Connect-Flash

}

    //Obtener los gastos en sueldo de una quincena determinada
controller.getGastosSueldoQuin = async (req, res) => {
    try{

        var { fechaI, fechaF } = req.body

        let fechaInicio = fechaI.getFullYear()+'-'+(fechaI.getMonth()+1)+'-'+fechaI.getDate()
        let fechaFinal = fechaF.getFullYear()+'-'+(fechaF.getMonth()+1)+'-'+fechaF.getDate()

            //Suma entre las dos fechas
        
        let response = await db.query(`
            SELECT SUM(recentSueldo) AS result FROM (SELECT es.sueldo AS recentSueldo, MAX(es.fecha) 
            FROM empleados AS e
            INNER JOIN empleados_sueldo AS es
            ON e.cedula = es.cedula
            WHERE (fecha BETWEEN '${fechaInicio}' AND '${fechaFinal}') AND (e.activo)
            GROUP BY e.cedula) AS t;
        `)

            //La suma
        let resultado = response[0][0].result
        console.log(resultado)

        if(!!resultado){
            //Render
        }

    }catch(err){
        console.log(err);
    }

}

module.exports = controller;