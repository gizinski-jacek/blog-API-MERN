require('dotenv').config();
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const async = require('async');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcryptjs = require('bcryptjs');

exports.log_in_user = (req, res, next) => {
	passport.authenticate('login', { session: false }, (err, user) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(400).json([
				{
					msg: 'User not found',
				},
			]);
		}
		jwt.sign(
			{ _id: user._id, username: user.username },
			process.env.STRATEGY_SECRET,
			{ expiresIn: '30m' },
			(err, token) => {
				if (err) {
					return next(err);
				}
				/// DO LATER: lower maxAge.
				res.cookie('userToken', token, {
					maxAge: 600000999,
					httpOnly: true,
					secure: false,
					sameSite: 'lax',
				});
				res.status(200).json(token);
			}
		);
	})(req, res, next);
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
	(req, res, next) => {
		const errors = validationResult(req);
		const newUser = new User({
			username: req.body.username,
		});
		User.find({ username: req.body.username }).exec((err, user_list) => {
			if (err) {
				return next(err);
			}
			if (user_list.length > 0) {
				// Move this into custom body validator?
				return res.status(409).json([{ msg: 'User already exists' }]);
			}
			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array());
			}
			bcryptjs.hash(req.body.password, 10, (err, hashedPassword) => {
				if (err) {
					return next(err);
				}
				newUser.password = hashedPassword;
				newUser.save(newUser, (err) => {
					if (err) {
						return next(err);
					}
					return res.status(200).json({ success: true });
				});
			});
		});
	},
];

exports.auth_user = async (req, res, next) => {
	let currentUser;
	if (req.cookies.userToken) {
		const decoded = await jwt.verify(
			req.cookies.userToken,
			process.env.STRATEGY_SECRET
		);
		const user = await User.findById(decoded._id);
		currentUser = {
			_id: user._id,
			username: user.username,
			token: req.cookies.userToken,
		};
	} else {
		currentUser = null;
	}
	res.status(200).json({ currentUser });
};

exports.update_user = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.render('log-in', { title: 'Log In' });
	}
	/// Update user in db
};

exports.delete_user = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.render('log-in', { title: 'Log In' });
	}
	/// Delete user from db
};
