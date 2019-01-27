const express = require('express');
const router = express.Router();
const vuelosController = require('../controllers/vueloController');

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

/* GET Login page. */
router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Guacamaya Airlines' });
});

/* GET Register page. */
router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Guacamaya Airlines' });
});

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
})

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

module.exports = router;
