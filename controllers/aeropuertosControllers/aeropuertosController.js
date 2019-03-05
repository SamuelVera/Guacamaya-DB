const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const aeropuertos = require('../../models/associations/aeropuertoAssociations/aeropuertosAssociations');

const controller = {}

    //Fetch de todos los aeropuertos
controller.getAll = async (callback) =>{
    try{
        let response = await aeropuertosModel.findAll({
            where:{
                activo: 1
            }
        });
        let aeropuertos = response.map(result => result.dataValues);
        console.log(aeropuertos);
        callback(aeropuertos, null);
    }catch(err){
        callback(null, err);
    }
};

    //Fetch de vuelos que fueron a este aeropuerto entre estas 2 fechas
controller.getVuelosVisitas = async (req, res) => {
    try{
            //Aeropuerto, fechas de inicio y final
        const {inicio, final, aeropuerto} = req.body;

        console.log('getting');

        /*let response = await aeropuertos.findOne({
            where:{
                iata: 'MIA'
            }
        });
        let r2 = await response.getIsOrigen();
        let resultados = r2.map(results => results.dataValues);
        console.log(resultados);
        r2 = await response.getIsDestino();
        resultados = r2.map(results => results.dataValues);
        console.log(resultados);
        r2 = await response.getDepartamentos();
        resultados = r2.map(results => results.dataValues);
        console.log(resultados);
        r2 = await response.getPistas();
        resultados = r2.map(results => results.dataValues);
        console.log(resultados);
        */
       
        /*let response = await db.query(`
        SELECT COUNT(*) as result FROM aeropuertos AS a
        INNER JOIN rutas AS r
        ON a.iata = r.origen
        INNER JOIN 
        WHERE a.iata = ${aeropuerto} AND 
        `, {
        type: sequelize.QueryTypes.SELECT, nest: true
        })
        let resultado = response[0].result
        console.log(resultado)*/

    }catch(err){
        console.log(err);
    }
}

module.exports = controller;