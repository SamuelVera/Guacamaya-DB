const sequelize = require('sequelize');
const db = require('../../config/guacamaya_db');
const aeropuertosModel = require('../../models/associations/aeropuertoAssociations/aeropuertosAssociations');

const controller = {}

    //Fetch de todos los aeropuertos
controller.getAll = async (res) =>{
        let response = await aeropuertosModel.findAll({
            where:{
                activo: 1
            }
        });
        let aeropuertos = response.map(result => result.dataValues);
        console.log(aeropuertos);
        if(!!aeropuertos){
            //Renderización
        }
        //Mensajito de error no se pudo
};

    //Visitas al aeropuerto en el mes determinado
controller.getVisitasAeropuerto = async (req, res) => {
            //Aeropuerto, fechas de inicio y final
        const {fecha, aeropuerto} = req.body

        let fechaC = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()

        let response = await db.query(`
            SELECT COUNT(*) as result 
            FROM aeropuertos AS a
            INNER JOIN rutas AS r
            ON a.iata = r.destino
            INNER JOIN vuelos AS v
            ON r.numero = v.nro_ruta
            INNER JOIN vuelos_salida AS vs
            ON v.codigo_vuelo = vs.codigo_vuelo
            WHERE a.iata = '${aeropuerto}' 
            AND (DATE_FORMAT(vs.fecha_salida, '%m-%y') = DATE_FORMAT('${fechaC}', '%m-%y'))
        `, {
        type: sequelize.QueryTypes.SELECT, nest: true
        })

            //Resultados es la cantidad de visitas a ese aeropuerto en el mes
        let resultados = response[0].result

        if(!!resultados){
            //Acá irá el render rendersote con resultados como un atributo
        }
        //Mensajito de error no se pudo
}

    //No terminado aún
controller.getVisitasFromAll = async (req, res) => {
        //const {fecha} = req.body
        const fecha = new Date()
        let fechaC = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()

        let response = await db.query(`
            SELECT a.iata AS aeropuerto, COUNT(*) AS visitas
            FROM aeropuertos AS a
            INNER JOIN rutas AS r
            ON a.iata = r.destino
            INNER JOIN vuelos AS v
            ON r.numero = v.nro_ruta
            INNER JOIN vuelos_salida AS vs
            ON v.codigo_vuelo = vs.codigo_vuelo
            WHERE (DATE_FORMAT(vs.fecha_salida, '%m-%y') = DATE_FORMAT('${fechaC}', '%m-%y'))
            GROUP BY aeropuerto
            ORDER BY visitas DESC
        `,{
            type: sequelize.QueryTypes.SELECT, nest: true
        })
        

}

module.exports = controller;