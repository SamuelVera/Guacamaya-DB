const express = require('express');
const router = express.Router();
const userController = require('../controllers/authControllers/userController');
const authController = require('../controllers/authControllers/authController');
const aeropuertosController = require('../controllers/aeropuertosControllers/aeropuertosController');
const empleadosController = require('../controllers/empleadosControllers/empleadosController');
const departamentosController = require('../controllers/departamentosControllers/departamentosController');
const avionesController = require('../controllers/avionesControllers/avionesController');
const clientesController = require('../controllers/clientesControllers/clientesControllers');
const vuelosController = require('../controllers/vuelosControllers/vuelosController');
const alquileresController = require('../controllers/alquileresControllers/alquileresAvionController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/asco', catchErrors())

/* GET home user page. */
router.get('/', (req, res, next) => {
  res.render(require.resolve('../views/user/home-user/index.pug'), { title: 'Guacamaya Airlines' });
});

/* GET home-admin page. */
router.get('/home-admin', (req, res, next) => {
  res.render(require.resolve('../views/admin/home-admin/index.pug'), { title: 'Guacamaya Airlines' });
});

/* GET headquarter general page. */
router.get('/headquarter/general', (req, res, next) => {
  res.render(require.resolve('../views/admin/home-admin/headquarter-tabs/general.pug'), { title: 'Guacamaya Airlines' });
});

/* GET headquarter flights page. */
router.get('/headquarter/flights', (req, res, next) => {
  res.render(require.resolve('../views/admin/home-admin/headquarter-tabs/flights.pug'), { title: 'Guacamaya Airlines' });
});

/* GET headquarter airplanes page. */
router.get('/headquarter/airplanes', (req, res, next) => {
  res.render(require.resolve('../views/admin/home-admin/headquarter-tabs/airplanes.pug'), { title: 'Guacamaya Airlines' });
});

/* GET headquarter employees page. */
router.get('/headquarter/employees', (req, res, next) => {
  res.render(require.resolve('../views/admin/home-admin/headquarter-tabs/employees.pug'), { title: 'Guacamaya Airlines' });
});

/* GET Login page */
router.get('/login', (req, res, next) => {
  res.render(require.resolve('../views/auth/login.pug'), { title: 'Guacamaya Airlines' });
});

router.post('/login',  authController.signin);

/* GET Register page */
router.get('/register', (req, res, next) => {
  res.render(require.resolve('../views/auth/register.pug'), { title: 'Guacamaya Airlines' });
});

router.post('/register', userController.register, authController.signin);

//Is logged
router.get('/logged', (req, res) => {
  const user = req.user;
  res.render(require.resolve('../views/auth/verificarRegistro.pug'), { user , title: 'Guacamaya Airlines' } );
})

//Get logout
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
