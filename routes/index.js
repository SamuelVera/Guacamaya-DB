const express = require('express');
const router = express.Router();
const vuelosController = require('../controllers/vueloController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

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

/* GET Login page */
router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Guacamaya Airlines' });
});
router.post('/login',  authController.signin);

/* GET Register page */
router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Guacamaya Airlines' });
});
router.post('/register', userController.register, authController.signin);

//Is logged
router.get('/logged', (req, res) => {
  const user = req.user;
  res.render('verificarRegistro', { user , title: 'Guacamaya Airlines' } );
})

//Get logout
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

//Get the facebook page to login
router.post('/login/facebook',  authController.signinWithFacebook);
// router.get('/login/facebook',
//   passport.authenticate('facebook'));

  //This is the URL to wich Facebook will redirect the user after they have logged in
router.get('/return', 
  authController.signinWithFacebookReturn,
  function(req, res) {
    console.log('hola');
    res.redirect('/');
  });

module.exports = router;
