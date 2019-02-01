const passport = require('passport');

exports.signin = passport.authenticate(
    'local',
    { failureRedirect: '/login', successRedirect: '/logged',session: true},
    );