const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const departamentosModel = require('../../models/associations/departamentosAssociations/departamentosAssociations');
const empleadosModel = require('../../models/associations/empleadosAssociations/empleadosAssociations');

const controller = {}

    //Extraer todos los departamentos
controller.getAll =  async (res) => {

    let response = await departamentosModel.findAll({
        where:{
            activo: 1
        }
    })

    var resultado = response.map(result => result.dataValues)
    if(!!resultado){
        //Renderizar con los departamentos
    }

    //Error en el fetch

}

    //Get el personal del departamento tal ubicado en el iata tal
controller.getAllPersonal = async (req, res) => {
        const { numero } = req.body
        
        let response = await departamentosModel.findOne({
            include:[{
                model: empleadosModel,
                as: 'Empleados',
                where:{
                    activo: 1
                }
            }],
            where:{
                numero,
                activo: 1
            }
        })

        /*let response = await departamentosModel.findOne({
            where:{
                iata,
                nombre,
                activo: 1
            }
        })

        response = await response.getEmpleados({
            where:{
                activo: 1
            }
        })*/

            //Información de cada empleado
        let resultado = response.Empleados.map(result => result.dataValues)

        console.log(resultado)

        if(!!resultado){
            console.log(resultado.length) //Cantidad de empleados
        }

        //No entró, error

};

module.exports =  controller;