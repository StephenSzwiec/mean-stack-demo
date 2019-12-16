var createError = require('http-errors');
var express = require('express');
var path = require('path'); 
var favicon = require('serve-favicon');
var logger = require('morgan');

//ensure client schema gets loaded
var apiRouter = require('./routes/client');

var app = express();

//import mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demo', {
	promiseLibrary: require('bluebird') })
	.then(() => console.log('connection successful!!!'))
	.catch((err) => console.error(err));


app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/demo')));
app.use('/', express.static(path.join(__dirname, 'dist/demo')));
app.use('/api', apiRouter);



//catch 404 
app.use(function(err, req, res, next) {
	next(createError(404));
});

app.use(function(err, req, res, next){
	//set locals, only providing errors in dev
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	//rendering the error page
	res.status(err.status || 500);
	next(err);
	
});


module.exports = app;
