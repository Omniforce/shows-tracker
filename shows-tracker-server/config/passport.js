const passport = require('passport');
const LocalStrategy = require('passport-local');
const nconf = require('nconf');
const bcrypt = require('bcrypt');

const { User } = require('../models/models');

module.exports = (passport) => {
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) => User.findById(id, done));

  passport.use(new LocalStrategy(localStrategy));
}

function localStrategy(username, password, done) {
  User.findOne({ username: username }, function(err, done) {
    if (err) { return done(err); }
    if (user && user.validPassword(password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Invalid username or password.' });
    }
  });
}
