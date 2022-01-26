require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcryptjs = require('bcryptjs');
const User = require('./models/user');

passport.use(
	'login',
	new LocalStrategy((username, password, done) => {
		User.findOne({ username: username }, (error, user) => {
			if (error) {
				return done(error);
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' });
			}
			bcryptjs.compare(password, user.password, (error, match) => {
				if (error) {
					return next(error);
				}
				if (!match) {
					return done(null, false, { message: 'Incorrect password' });
				}
				return done(null, user, { message: 'Logged in successfully' });
			});
		});
	})
);

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.STRATEGY_SECRET,
		},
		(jwtPayload, done) => {
			User.findById(jwtPayload.id, (error, user) => {
				if (error) {
					return done(error);
				}
				if (!user) {
					return done(null, false, { message: 'User not found' });
				}
				return done(null, user);
			});
		}
	)
);
