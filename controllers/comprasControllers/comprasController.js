const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const comprasModel = require('../../models/associations/comprasAssociations/comprasAssociations');

const controller = {}

    //Ganancias por venta de boletos de un mes dado
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

module.exports = controller;