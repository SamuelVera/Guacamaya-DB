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

    let resultado = response.map(result => result.dataValues)

    if(!!resultado){
        //Renderizar con los departamentos
    }

    //Error en el fetch

}

controller.addDepartamento = async (req, res) => {
    const { iata, nombre } = req.body
    const numero = await departamentosModel.count() + 1

    await departamentosModel.create({
        numero,
        iata,
        nombre
    })

}

controller.deshabilitarDepartamento = async (req, res) => {
    const { numero } = req.body
    await departamentosModel.update({
        activo: 0
    },{
        where:{
            numero
        }
    })
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
                },
                required: true
            }],
            where:{
                numero,
                activo: 1
            }
        })

            //Información de cada empleado
        
        let departamento = response.dataValues
        let empleadosDepartamento = response.Empleados.map(result => result.dataValues)

        if(!!departamento && !!empleadosDepartamento){
            console.log(departamento) //Departamento en cuestión
            console.log(empleadosDepartamento) //Cantidad de empleados
        }

        //No entró, error

}

module.exports =  controller;