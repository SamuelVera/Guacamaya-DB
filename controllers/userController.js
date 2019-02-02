const bcrypt = require("bcryptjs");
const User = require('../models/users');
const { ROUNDS } = process.env;

  //Registrarse como usuario cliente
exports.register = async (req, res, next) => {
    try{
      let { name, email, ci, password, ape, fecha_nac, sexo } = req.body; //Traer del form
      const salt = await bcrypt.genSalt(parseInt(ROUNDS));
      const hash = await bcrypt.hash(password, salt); //Hasheo del password
      let response = await User.create({
        name,
        email,
        ci,
        password: hash,
        ape,
        fecha_nac,
        sexo
      });
      next();
    }catch(err){
        throw err;
    }
}
