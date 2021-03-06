require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
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

const extractCookie = (req) => {
	let token = null;
	if (req && req.cookies && req.cookies.token) {
		token = req.cookies.token;
	}
	return token;
};

passport.use(
	'jwt',
	new JWTStrategy(
		{
			jwtFromRequest: extractCookie,
			secretOrKey: process.env.STRATEGY_SECRET,
		},
		(jwtPayload, done) => {
			try {
				if (jwtPayload) {
					done(null, jwtPayload);
				} else {
					done(null, false);
				}
			} catch (error) {
				done(error, false);
			}
		}
	)
);
