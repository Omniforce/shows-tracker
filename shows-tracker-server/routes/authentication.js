const express = require('express');
const passport = require('passport');
const router = express.Router();

const { User } = require('../models/models');
const { loggedIn } = require('../middleware/authenticate');

router.post('/register', (req, res, next) => {
  const user = req.body.user;

  User.createUser(user).then(newUser => {
    if (newUser) {
      req.login(newUser, err => {
        if (err) res.sendStatus(400);
        else res.json(newUser);
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const user = req.user;
  res.json(user);
});

router.post('/logout', (req, res, next) => {
  req.logOut();
  res.sendStatus( 200 );
});

module.exports = router;
