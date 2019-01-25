const express = require("express");
const router = express.Router();
// const controlardorPrueba = require("../controllers/pruebaController");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
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
