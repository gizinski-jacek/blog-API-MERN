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
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username: username });
			if (!user) {
				return done(null, false, { msg: 'Incorrect username' });
			}
			const match = await bcryptjs.compare(password, user.password);
			if (!match) {
				return done(null, false, { msg: 'Incorrect password' });
			}
			return done(null, user, { msg: 'Logged in successfully' });
		} catch (error) {
			done(error);
		}
	})
);

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.STRATEGY_SECRET,
		},
		async (jwtPayload, done) => {
			try {
				const user = await User.findById(jwtPayload.id);
				return done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
);
