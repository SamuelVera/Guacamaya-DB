const sequelize = require('sequelize');
const db = require('../config/guacamaya_db');
const prueba = require('../models/prueba');

const controller = {}

controller.deletePrueba = async function (id, callback) {
    try {
        let response = await prueba.update({
            nombre: "Pepa"        
        }, {
            where: {
                id: 0
            }
        });
        callback(null);
    } catch (error){
        callback(error);
    }
}

module.exports = controller;