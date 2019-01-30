require("dotenv").config({ path: "variables.env" });
const express = require('express');
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const sequelize = require('./config/guacamaya_db');
const passport = require('passport');
require("./config/passport");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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
  
  //Conexión a la DB
  sequelize
  .authenticate()
  .then(value => value)
  .catch(err => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
  });
  
  sequelize.sync({logging: false});
  
  app.use("/", routes);
  app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port} 🔥`);
});