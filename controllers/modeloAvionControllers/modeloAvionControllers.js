const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const modeloAvionesModel = require('../../models/associations/modeloAvionAssociations/modeloAvionAssociations');

const controller = {}

controller.getAll = async (req, res) => {

    let response = await modeloAvionesModel.findAll({
        where:{
            activo: 1
        }
    })

    let resultados = response.map(result => result.dataValues)

    if(!!resultados){
        console.log(resultados)
    }
}

module.exports =  controller;