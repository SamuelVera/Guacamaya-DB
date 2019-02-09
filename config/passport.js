const passport = require('passport'), FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET }  = process.env;

// Login Local
passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false
      },
      async (email, password, done) => {
        try {
          let user = await User.findOne({ where: { email } });
          if (!user) {
            return done(null, false, { message: 'Incorrect Email.' });
          }
          if (!user.compare(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  
  //Login with Facebook
  passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: "/return"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(
      {where: { email: profile.emails}, 
      defaults: 
        { name: profile.name.givenName, 
          email: profile.emails,
          ape: profile.name.familyName,
          fecha_nac: profile.birthday,
          sexo: profile.gender,
          isAdmin: false,
          activo: 1}}, 
      
        function(err, user) {
        if (err) { return done(err); }
      done(null, user);
    });
  }
));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });