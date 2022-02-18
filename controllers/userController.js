require('dotenv').config();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcryptjs = require('bcryptjs');

exports.auth_user = async (req, res, next) => {
	try {
		if (req.cookies.token) {
			const decoded = jwt.verify(
				req.cookies.token,
				process.env.STRATEGY_SECRET
			);
			const user = await User.findById(decoded._id, 'username').exec();
			return res.status(200).json(user);
		}
		res.status(200).json(null);
	} catch (error) {
		res.clearCookie('token', { path: '/' });
		res.status(403).json('Failed to verify user token. Please log in again.');
	}
};

exports.log_in_user = (req, res, next) => {
	passport.authenticate(
		'login',
		{ session: false },
		async (error, user, msg) => {
			if (error) {
				return next(error);
			}
			try {
				if (!user) {
					return res.status(401).json(msg);
				}
				const token = jwt.sign(
					{ _id: user._id, username: user.username },
					process.env.STRATEGY_SECRET,
					{ expiresIn: '15m' }
				);
				res.cookie('token', token, {
					httpOnly: true,
					secure: false,
					sameSite: 'strict',
				});
				res.status(200).json({ _id: user._id, username: user.username });
			} catch (error) {
				next(error);
			}
		}
	)(req, res, next);
};

exports.log_out_user = (req, res, next) => {
	res.clearCookie('token', { path: '/' });
	res.status(200).json({ success: true });
};

exports.sign_up_user = [
	body('username', 'Username field can not be empty')
		.trim()
		.isLength({ min: 4, max: 32 })
		.escape(),
	body('password', 'Password field can not be empty')
		.trim()
		.isLength({ min: 4, max: 64 })
		.escape(),
	body('repeat', 'Password field can not be empty').custom((value, { req }) => {
		if (value !== req.body.password) {
			const error = new Error('Passwords must match');
			error.status = 403;
			throw error;
		}
		return true;
	}),
	async (req, res, next) => {
		try {
			const user_list = await User.find({ username: req.body.username }).exec();
			if (user_list.length > 0) {
				return res
					.status(409)
					.json(`${req.body.username} name is already taken`);
			}
			const errors = validationResult(req);
			const newUser = new User({
				username: req.body.username,
			});
			if (!errors.isEmpty()) {
				return res.status(404).json(errors.array());
			}
			const hashedPassword = await bcryptjs.hash(req.body.password, 10);
			newUser.password = hashedPassword;
			const user = await newUser.save();
			if (!user) {
				return res.status(404).json('Error creating user, try again');
			}
			res.status(200).json({ success: true });
		} catch (error) {
			next(error);
		}
	},
];

exports.get_user_list = async (req, res, next) => {
	try {
		const user_list = await User.find({}, 'username')
			.sort({ username: 'asc' })
			.exec();
		return res.status(200).json(user_list);
	} catch (error) {
		res.status(401).json(null);
	}
};
