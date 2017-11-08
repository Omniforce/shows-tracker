const { User } = require('../models/models');

function loggedIn(req, res, next) {
  if (!req.user) {
    return next(new Error("You must be logged in to access this page!"));
  }
  return next();
}

module.exports.loggedIn = loggedIn;
