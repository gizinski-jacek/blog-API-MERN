require('dotenv').config();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcryptjs = require('bcryptjs');

exports.auth_user = async (req, res, next) => {
	try {
		if (req.cookies.userToken) {
			const decoded = jwt.verify(
				req.cookies.userToken,
				process.env.STRATEGY_SECRET
			);
			const user = await User.findById(decoded._id);
			res.status(200).json({ username: user.username });
		} else {
			res.status(200).json(null);
		}
	} catch (error) {
		next(error);
	}
};

exports.log_in_user = (req, res, next) => {
	passport.authenticate(
		'login',
		{ session: false },
		async (error, user, msg) => {
			try {
				if (error) {
					return next(error);
				}
				if (!user) {
					return res.status(400).json(msg);
				}
				const token = jwt.sign(
					{ _id: user._id, username: user.username },
					process.env.STRATEGY_SECRET,
					{ expiresIn: '15m' }
				);
				res.cookie('userToken', token, {
					httpOnly: true,
					secure: false,
					sameSite: 'strict',
				});
				res.status(200).json({ username: user.username });
			} catch (error) {
				return next(error);
			}
		}
	)(req, res, next);
};

exports.log_out_user = (req, res, next) => {
	res.cookie('userToken', 'loggedOut', {
		expires: new Date(Date.now() + 1000),
		httpOnly: true,
		secure: false,
		sameSite: 'lax',
	});
	res.status(200).json({ success: true });
};

exports.sign_up_user = [
	body('username', 'Username field can not be empty')
		.trim()
		.isLength({ min: 4, max: 32 })
		.escape(),
	body('username').custom(async (value, { req }) => {
		const user_list = await User.find({ username: req.body.username });
		if (user_list.length > 0) {
			throw new Error(`${value} name is already taken`);
		}
		return true;
	}),
	body('password', 'Password field can not be empty')
		.trim()
		.isLength({ min: 4, max: 64 })
		.escape(),
	body('confirmPassword', 'Password field can not be empty').custom(
		(value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Passwords must match');
			}
			return true;
		}
	),
	async (req, res, next) => {
		try {
			const errors = validationResult(req);
			const newUser = new User({
				username: req.body.username,
			});
			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array());
			}
			const hashedPassword = await bcryptjs.hash(req.body.password, 10);
			newUser.password = hashedPassword;
			await newUser.save();
			res.status(200).json({ success: true });
		} catch (error) {
			next(error);
		}
	},
];
