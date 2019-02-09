const passport = require('passport');

exports.signin = passport.authenticate(
    'local',
    { failureRedirect: '/login', successRedirect: '/logged',session: true},
    );

exports.signinWithFacebook = passport.authenticate('facebook');

exports.signinWithFacebookReturn = passport.authenticate('facebook', { failureRedirect: '/login' });