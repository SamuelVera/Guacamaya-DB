const express = require('express');
const router = express.Router();
const vuelosController = require('../controllers/vueloController');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const { ROUNDS } = process.env;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Guacamaya Airlines' });
});

  /* GET Flights Administration page. */
router.get('/adminflights',(req, res) => {
  vuelosController.readEveryVuelo((vuelos, err, length) => {
    if(err){
      res.json({
        success: false,
        err,
        msg: 'FAILED TO FETCH ALL FLIGTHS'
      })
    }else{
      res.render('adminflights', { title: 'Guacamaya Airlines', vuelos, length });
    }
  })
})

router.post('/add', (req, res) => {
  req.body.iata_Des = req.body.iata_Des.toUpperCase();
  console.log(req.body);
  if(!!req.body){
    vuelosController.createVuelo(req.body, (err) => {
      if(err){
        res.json({
          success: false,
          err,
          msg: 'FAILED TO CREATE FLIGHT'
        })
      }else{
        res.redirect('/adminflights');
      }
    })
  }
})

router.post('/delete/:codigo', (req, res) => {
  if(!!req.params.codigo){
    vuelosController.deleteVuelo(req.params.codigo, (err) => {
      if(err){
        res.json({
          success: false,
          err,
          msg: 'FAILED TO DELETE FLIGHT'
        })
      }else{
        res.redirect('/adminflights');
      }
    })
  }
})

router.post('/edit/:codigo', (req, res) => {
  if(!!req.params.codigo){
    vuelosController.readVuelo(req.params.codigo, (vuelo, err) => {
      if(err){
        res.json({
          success: false,
          err,
          msg: 'FAILED TO FETCH ONE FLIGHT'
        })
      }else{
        console.log(vuelo);
        res.render('editflight', {vuelo});
      }
    })
  }
});

router.post('/edit/update/:codigo', (req, res) => {
  if(!!req.params.codigo){
    if(!!req.body){
      vuelosController.updateVuelo(req.body, req.params.codigo, (err) => {
        if(err){
          res.json({
            success: false,
            err,
            msg: 'FAILED TO UPDATE FLIGHT'
          })
        }else{
          res.redirect('/adminflights');
        }
      })
    }
  }
})

/* GET Login page. */
router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Guacamaya Airlines' });
});

/* GET Register page. */
router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Guacamaya Airlines' });
});

router.get('/logged-in', async (req, res) => {
  var user = req.user;
  res.render('verificarRegistro', { user , title: 'Guacamaya Airlines' } );
});

//Get logout
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

  //Registrarse como usuario cliente
const register = async (req, res, next) => {
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
    next(err);
  }
}
  
router.post("/register", register, passport.authenticate('local',
  {failureRedirect: '/login', successRedirect: '/login'}), (req, res) => {
    res.redirect('/login');
});

router.post("/login", passport.authenticate('local',
  { failureRedirect: '/login', successRedirect: '/logged-in' }), async (req, res) => {
    res.redirect('/logged-in');
});

module.exports = router;
