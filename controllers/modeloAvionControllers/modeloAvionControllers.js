const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const modeloAvionesModel = require('../../models/associations/modeloAvionAssociations/modeloAvionAssociations');

const controller = {}

controller.getAll = async (req, res) => {

    let response = await modeloAvionesModel.findAll({
        attributes:{
            exclude: ['activo']
        },
        where:{
            activo: 1
        }
    })

    let resultados = response.map(result => result.dataValues)

    if(!!resultados){
        console.log(resultados)
    }
}

controller.getOne = async (req, res) => {

    const { numero } = req.body

    let response = await modeloAvionesModel.findOne({
        where:{
            numero: 787,
            activo: 1
        }
    })

    let resultado = response.dataValues

    if(!!resultado){
        console.log(resultado) //Modelo del avión
    }

    //Error

}

module.exports =  controller;