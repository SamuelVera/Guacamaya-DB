//Controlador no final, solo para la primera entrega
const sequelize = require('sequelize');
const db = require('../config/guacamaya_db');
const vueloModel = require('../models/vueloModel');


const controller = {};

    //C del CRUD
controller.createVuelo = async (vuelo, callback) => {
    if(!!vuelo){
        try{
            let response = await vueloModel.create({
                pvb: vuelo.pvb,
                iata_Des: vuelo.iata_Des,
                fecha_Prog: vuelo.fecha_Prog,
                nro_Avion: vuelo.nro_Avion
            })
            callback(null);
        }catch(error){
            callback(error);
        }
    }
    callback(error);
};

    //R del CRUD
controller.readEveryVuelo = async (callback) => {
    try{
        let response = await vueloModel.findAll({
            where:{
                activo: 1
            }
        });
        let vuelos = response.map(result => result.dataValues);
        callback(vuelos, null, vuelos.length);
    }catch(error){
        callback(null, error);
    }
};

    //R del CRUD
controller.readVuelo = async (codigo, callback) => {
    try{
        let response = await vueloModel.findAll({
                where:{
                    codigo
                }
            }
        )
        let vuelo = response.map(result => result.dataValues);
        callback(vuelo[0], null);
    }catch(error){
        callback(null, error);
    }
};

    //U del CRUDO
controller.updateVuelo = async (vuelo, codigo, callback) => {
    try{
        let response = await vueloModel.update({
            pvb: vuelo.pvb,
            iata_Des: vuelo.iata_Des,
            fecha_Prog: vuelo.fecha_Prog,
            nro_Avion: vuelo.nro_Avion
        },{
            where:{
                codigo
            }
        })
        callback(null);
    }catch(error){
        console.log(error);
        callback(error);
    }
};

    //D del PETRÓLEO
controller.deleteVuelo = async (codigo, callback) => {
    try{
        let response = await vueloModel.update(
        {
            activo: 0
        },
        {
            where:{
                codigo
            }
        })
        callback(null);
    }catch(error){
        callback(error);
    }
};

    //Exportar controlador
module.exports = controller;