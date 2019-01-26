const express = require("express");
const router = express.Router();
// const controlardorPrueba = require("../controllers/pruebaController");

router.get("/", (req, res) => {
  res.redirect('/index');
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Guacamaya Airlines' });
});

/* GET Flights Administration page. */
router.get('/adminflights', (req, res, next) => {
  res.render('adminflights', { title: 'Guacamaya Airlines' });
});

// router.get('/a', (req, res) => {
//   controlardorPrueba.deletePrueba(0,(products, err) => {
//     if(err){
//         console.log(err);
//         res.json({
//         success: false,
//         msg: 'Fail'
//       });
//     }else
//       res.redirect('/');
//   });
// });

module.exports = router;
