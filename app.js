/*
 * COMP 206 - Assignment 3
 * Taylor Evans - 4373570
 * This file sets up the Express.js application and handles routing and errors.
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); // Route for the homepage
var todolistRouter = require('./routes/todolist'); // Route for todo actions

var app = express();

// Set up the template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware for logging, JSON parsing, and serving static files
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', indexRouter); // Homepage
app.use('/todos', todolistRouter); // Todo list routes

// Handle 404 errors
app.use(function(req, res, next) {
  next(createError(404));
});

// Handle other errors
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
