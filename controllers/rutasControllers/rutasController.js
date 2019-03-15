const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const rutasModel = require('../../models/associations/rutasAssociations/rutasAssociations');

const controller = {}

controller.getAllRutas = async (req, res) => {
    let response = await rutasModel.findAll({
        where:{
            activo: 1
        }
    })
    let resultados = response.map(result => result.dataValues)

    if(!!resultados){
        console.log(resultados)
    }
}

controller.getOneRuta = async (req, res) => {
    const { numero } = req.body

    let response = await rutasModel.findOne({
        where:{
            numero,
            activo: 1
        }
    })

    let resultado = response.dataValues

    if(!!resultado){
        console.log(resultado)
    }
}

    //Añadir una ruta
controller.addRuta = async (req, res) => {
    const { numero, origen, destino, distancia, frecuencia } = req.body

    const proxima = numero + 1;

        //Ida
    await rutasModel.create({
        numero,
        origen,
        destino,
        distancia,
        frecuencia,
        proximaRuta: proxima
    })

        //Vuelta
    await rutasModel.create({
        numero: proxima,
        origen: destino,
        destino: origen,
        distancia,
        frecuencia,
        proximaRuta: numero
    })

}

    //Deshabilitar una ruta
controller.deleteRuta = async (req, res) => {
    const { numero } = req.body

    await rutasModel.update({
        activo: 0
    },{
        where:{
            numero
        }
    })
}

module.exports = controller;