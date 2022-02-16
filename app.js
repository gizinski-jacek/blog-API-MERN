require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');
require('./passport');

const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const apiRouter = require('./routes/api');

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './client/build')));

app.use(compression());

app.use('/api', apiRouter);
app.get('*', function (req, res, next) {
	res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (error, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = error.message;
	res.locals.error = req.app.get('env') === 'development' ? error : {};

	// respond with error
	res.status(error.status || 500);
	res.json('404 not found');
});

module.exports = app;
