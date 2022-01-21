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
	passport.authenticate('local', { session: false }, (err, user) => {
		if (err) {
			// Will need reworking later
			return next(error);
		}
		if (!user) {
			return res.status(400).json({
				message: 'User not found',
			});
		}
		req.login(user, { session: false }, (err) => {
			if (err) {
				return next(error);
			}
			console.log(user);
			// const user = { _id: user._id, username: user.username };
			jwt.sign(
				user,
				process.env.STRATEGY_SECRET,
				{ expiresIn: '30m' },
				(err, token) => {
					if (err) {
						return next(error);
					}
					res.json({ user, token });
				}
			);
		});
	})(req, res, next);
};

exports.log_out_user = (req, res, next) => {
	req.logout();
	res.redirect('/');
};

exports.sign_up_new_user = [
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
		User.find({ username: req.body.username }).exec((err, userExists) => {
			if (err) {
				return next(err);
			}
			if (userExists.length > 0) {
				return res.status(409).json({ error: 'User already exists' });
			}
			if (req.body.password !== req.body.confirmPassword) {
				return res.status(401).json({ errors: 'Passwords must match' });
			}
			if (!errors.isEmpty()) {
				return res.json({ errors: errors.array() });
			}
			bcryptjs.hash(req.body.password, 10, (err, hashedPassword) => {
				newUser.password = hashedPassword;
				newUser.save(newUser, (err) => {
					console.log(newUser);
					if (err) {
						return next(err);
					}
					// return res.redirect('/');
					return res.status(200).json({ success: true, redirectUrl: '/' });
				});
			});
		});
	},
];

exports.get_all_users = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.render('log-in', { title: 'Log In' });
	}
	/// Get users from db
};

exports.get_user = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.render('log-in', { title: 'Log In' });
	}
	/// Get user from db
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
