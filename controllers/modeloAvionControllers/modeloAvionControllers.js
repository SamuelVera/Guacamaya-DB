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

controller.addModelo = async (req, res) => {
    const {
        numero, cantidad_asientos_eje, cantidad_asientos_eco,
        v_crucero, v_max, p_vacio, cap_max_cab, peso_max,
        dist_despegue_qmax, cap_max_eq, tipo_combustible, capacidad_combustible,
        nro_banios, nro_salidas, television, internet
    } = req.body

    await modeloAvionesModel.create({
        numero, cantidad_asientos_eje, cantidad_asientos_eco,
        v_crucero, v_max, p_vacio, cap_max_cab, peso_max,
        dist_despegue_qmax, cap_max_eq, tipo_combustible, capacidad_combustible,
        nro_banios, nro_salidas, television, internet
    })

}

controller.deshabilitarModelo = async (req, res) => {
    const { numero } = req.body
    await modeloAvionesModel.update({
        activo: 0
    },{
        where:{
            numero
        }
    })
}

module.exports =  controller;