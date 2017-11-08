const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nconf = require('nconf');

const passport = require('passport');
const session = require('express-session');

require('./config/initialize');
require('./config/db');

const app = express();

// ===============
// PASSPORT CONFIG
// ===============

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: true,
  cookie: {
    maxAge: 1e3 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// ==============
// EXPRESS CONFIG
// ==============

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// =======
// ROUTING
// =======

const index = require('./routes/index');
const auth  = require('./routes/authentication');
const users = require('./routes/users');
const shows = require('./routes/shows');

app.use('/', index);
app.use('/api', auth);
app.use('/api/users', users);
app.use('/api/shows', shows);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
