const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const empleadosModel = require('../../models/associations/empleadosAssociations/empleadosAssociations');
const empleadoSuelosModel = require('../../models/associations/empleadosAssociations/empleados_sueldoAssociations');
const empleadoTelefonosModel = require('../../models/associations/empleadosAssociations/empleados_telefonoAssociations');

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

controller.contratar = async (req, res) => {
    const { cedula, nro_departamento, apellido, nombre, profesion, cargo } = req.body

    let response = await empleadosModel.findOne({
        where:{
            cedula
        }
    })

    if(response){ //Recontratar si existe
        await empleadosModel.update({
            activo: 1
        },{
            where:{
                cedula
            }
        })
    }else{ //Contratar uno nuevo
        await empleadosModel.create({
            cedula,
            nro_departamento,
            apellido,
            nombre,
            profesion,
            cargo
        })
    }
}

controller.despedir = async (req, res) => {
    const { cedula } = req.body
    await empleadosModel.update({
        activo: 0
    },{
        where:{
            cedula
        }
    })
}

controller.addTelefono = async (req, res) => {
    const { cedula, telefono } = req.body
    await empleadoTelefonosModel.create({
        cedula,
        telefono
    })
}

controller.deshabilitarTelefono = async (req, res) => {
    const { cedula, telefono } = req.body

    await empleadoTelefonosModel.update({
        activo: 0
    },{
        where:{
            cedula,
            telefono
        }
    })
}

    //Get los teléfonos de un empleados
controller.getTelefonosEmpleado = async (req, res) => {
    const { cedula } = req.body
    let response = await empleadoTelefonosModel.findAll({
        where:{
            activo: 1,
            cedula
        }
    })
}

controller.actualizarSueldo = async (req, res) => {
    const { cedula, sueldo, fecha } = req.body
    await empleadoSuelosModel.create({
        cedula,
        fecha,
        sueldo
    })
}

    //Obtener los gastos en sueldo de una quincena determinada
controller.getGastosSueldoQuin = async (req, res) => {

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
}

module.exports = controller;