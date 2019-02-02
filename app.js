const express = require('express');
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require("es6-promisify").promisify;
const flash = require("connect-flash");
const expressValidator = require("express-validator");
const sequelize = require('./config/guacamaya_db');
const routes = require('./routes/index');
const helpers = require("./helpers");
const errorHandlers = require("./handlers/errorHandlers");
require("./config/passport");

const app = express();

  //Engine del template
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

  //User archivos del servidor
app.use(express.static(path.join(__dirname, "public")));

  //Convertir las peticiones a json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

  //req.cookies para las cookies de la petición
app.use(cookieParser());

  //Guardar informacion de los visitantes cada vez que hacen una peticion
const store = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000
});
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store
  })
  );
  store.sync();
  
  
  //Passport JS para manejo de los logins
  app.use(passport.initialize());
  app.use(passport.session());
  
  //Mandar mensajes de error a los visitantes de nuestra página
  app.use(flash());

  //Convertira las algunas API basadas en callback a Promesas
  app.use((req, res, next) => {
    req.login = promisify(req.login, req);
    next();
  });
  
  sequelize.sync({logging: false});
  
  app.use("/", routes);

  //Si no conseguimos el archivo le mandamos 404 al cliente
  app.use(errorHandlers.notFound);

  // Si el error es del cliente le advertimos con un flash
 app.use(errorHandlers.flashValidationErrors);

 // Si estamos desarrollando y la app falla veamos donde esta el error
 if(app.get("env") === "development") {
  app.use(errorHandlers.developmentErrors);
 }

// Si la app falla y estamos en produccion los errores cambian
app.use(errorHandlers.productionErrors);

module.exports = app;