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

module.exports = router;
