const Sequelize = require('sequelize');
Sequelize.Promise = global.Promise;
const md5 = require('md5');
const bcrypt = require('bcryptjs');
const sequelize = require('../../config/guacamaya_db');
const SALT = process.env;

const User = sequelize.define('usuarios', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    ci: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    ape: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },
    fecha_nac: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            notEmpty: true
        }
    },
    sexo: {
        type: Sequelize.TINYINT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    isAdmin: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
        validate: {
            notEmpty: true
        }
    },
    activo: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        validate: {
            notEmpty: true
        }
    }
},{
    timestamps: false,
    freezeTableName: true
});

User.prototype.encrypt = function ({ password }) {
    const salt = bcrypt.genSaltSync(parseInt(SALT));
    return bcrypt.hashSync(password, salt);
  };
  
  User.prototype.compare = function(password) {
    const hash = this.password;
    return bcrypt.compareSync(password, hash);
  };

module.exports = User;