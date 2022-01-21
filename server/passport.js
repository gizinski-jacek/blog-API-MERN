require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcryptjs = require('bcryptjs');
const User = require('./models/user');

passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username: username }, (err, user) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' });
			}
			bcryptjs.compare(password, user.password, (err, equal) => {
				if (err) {
					return next(err);
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
			User.findById(jwtPayload.id, (err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, { message: 'User not found' });
				}
				return done(null, user);
			});
		}
	)
);
