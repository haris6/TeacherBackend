//import modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var cors = require('cors');
const methodOverride = require('method-override');
const config = require('./config/config');
var indexRouter = require('./routes/index');
var teacherRouter = require('./routes/teacher');


//create database connection
const connection = mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
var app = express();
app.use(cors());
connection.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//starting app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//use routers
app.use('/', indexRouter);
app.use('/teacher',teacherRouter);


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
    res.send(err);
});

module.exports = app;