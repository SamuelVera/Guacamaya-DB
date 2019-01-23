//Controlador no final, solo para la primera entrega
const sequelize = require('sequelize');
const db = require('../config/guacamaya_db');
const vueloModel = require('../models/vueloModel');


const controller = {};

    //C del CRUD
controller.createVuelo = async (vuelo, callback) => {
    console.log('Ahí viene');
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
    console.log('Acá voy yo');
    try{
        let response = await vueloModel.findAll({
            where:{
                activo: 1
            }
        });
        let vuelos = response.map(result = result.dataValues);
        callback(vuelos, null);
    }catch(error){
        callback(null, error);
    }
};

    //R del CRUD
controller.readVuelo = async (id, callback) => {
    console.log('Aquiles voy');
    try{
        let response = await vueloModel.findAll({
                where:{
                    id
                }
            }
        )
        let vuelo = response.map(result => result.dataValues);
        callback(vuelo, null);
    }catch(error){
        callback(null, error);
    }
};

    //U del CRUDO
controller.updateVuelo = async (vuelo, callback) => {
    console.log('Ahí viene la piedra');
    try{
        let response = await vueloModel.update({
            pvb: vuelo.pvb,
            iata_Des: vuelo.iata_Des,
            fecha_Prog: vuelo.fecha_Prog,
            nro_Avion: vuelo.nro_Avion
        })
        callback(null);
    }catch(error){
        callback(error);
    }
};

    //D del PETRÓLEO
controller.deleteVuelo = async (id, callback) => {
    console.log('Ahí viene la piedrota');
    try{
        let response = await vueloModel.update(
        {
            activo: 0
        },
        {
            where:{
                id
            }
        })
        callback(null);
    }catch(error){
        callback(error);
    }
};

    //Exportar controlador
module.exports = controller;