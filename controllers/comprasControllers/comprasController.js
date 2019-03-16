const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const comprasModel = require('../../models/associations/comprasAssociations/comprasAssociations');

const controller = {}

    //Ganancias por venta de boletos de un mes dado(NO TESTEADO)(NO DATA)
controller.getGananciasVentas = async (req, res) => {

    let { fecha } = req.body
    const Op =  sequelize.Op

    /*fecha.setDate(1)
    const fechaI = fecha.getFullYear() + '-' + (fecha.getMonth()+1) + '-' + fecha.getDate()
    fecha.setMonth(fecha.getMonth()+1)
    fecha.setDate(0)
    const fechaF = fecha.getFullYear() + '-' + (fecha.getMonth()+1) + '-' + fecha.getDate()*/

    let response = await comprasModel.sum('monto',{
        where:{
            fecha: {
                [Op.between]: ['2018-01-01', '2019-12-31']
            },
            activo: 1
        }
    })

    if(!!response){
        console.log(response) //Ganancias por venta de boletos de ese mes dado
    }

}

    //Get datos de compras en un mes
controller.getComprasMes = async (req, res) => {
    let { fecha } = req.body
    const Op =  sequelize.Op

    fecha.setDate(1)
    const fechaI = fecha.getFullYear() + '-' + (fecha.getMonth()+1) + '-' + fecha.getDate()
    fecha.setMonth(fecha.getMonth()+1)
    fecha.setDate(0)
    const fechaF = fecha.getFullYear() + '-' + (fecha.getMonth()+1) + '-' + fecha.getDate()

    let response = await comprasModel.findAll({
        where:{
            activo: 1,
            fecha:{
                [Op.between]: [fechaI, fechaF]
            }
        }
    })

    let resultados = response.map(result => result.dataValues)

    if(!!resultados){
        console.log(resultados)
    }
    
}

    //Facturar una compra
controller.facturar = async (req, res) => {
    const { cantidad_pasajes, monto, fecha, cedula } = req.body
    let numero_factura = await comprasModel.count() + 1;

    await comprasModel.create({
        numero_factura,
        cantidad_pasajes,
        fecha,
        monto,
        cedula
    })
}

    //Deshabilitar compra
controller.deshabilitarCompra = async (req, res) => {
    const { numero_factura } = req.body

    await comprasModel.update({
        activo: 0
    },{
        where:{
            activo: 0,
            numero_factura
        }
    })

}

module.exports = controller;