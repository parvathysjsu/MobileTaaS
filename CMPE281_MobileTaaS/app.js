var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('client-sessions');
var indexRouter = require('./routes/index');
var projectRouter = require('./routes/project');
var profileRouter = require('./routes/profile');
var letschatRouter=require('./routes/letschat');
var testerRouter=require('./routes/tester');
var app = express();
var bugRouter = require('./routes/bug'); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// var app = express().configure(function () {
//   this.use('/public', express.static('public')); // <-- This right here
// });

app.use('/', indexRouter);
app.use('/', projectRouter);
app.use('/', profileRouter);
app.use('/', letschatRouter);
app.use('/', testerRouter);
app.use('/', bugRouter);
const port = 3000;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


app.listen(port, () => {
  
  console.log(`Server running on port: ${port}`);
});

module.exports = app;
