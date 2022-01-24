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

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Allow-Credentials', true);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS, HEAD'
	);
	next();
});

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session(sessionConfig));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// respond with error
	res.status(err.status || 500);
	res.json('404 not found');
});

module.exports = app;
