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

exports.create_post = [
	body('title', 'Title field can not be empty')
		.trim()
		.isLength({ min: 4, max: 64 })
		.escape(),
	body('text', 'Text field can not be empty')
		.trim()
		.isLength({ min: 4, max: 512 })
		.escape(),
	async (req, res, next) => {
		const errors = validationResult(req);
		const newPost = new Post({
			title: req.body.title,
			text: req.body.text,
			author: req.decodedUser._id,
			timestamp: new Date(),
		});
		if (!errors.isEmpty()) {
			res.status(401).json(errors.array());
		}
		newPost.save((err) => {
			if (err) {
				return next(err);
			}
			res.status(200).json({ success: true, redirectUrl: newPost.url });
		});
	},
];

exports.update_post = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.render('log-in', { title: 'Log In' });
	}
	/// Update post
};

exports.delete_post = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.render('log-in', { title: 'Log In' });
	}
	/// Delete post
};

exports.get_all_posts = (req, res, next) => {
	Post.find({})
		.populate('author')
		.sort({ timestamp: 'desc' })
		.exec((err, post_list) => {
			if (err) {
				return next(err);
			}
			res.status(200).json(post_list);
		});
};

exports.get_post = (req, res, next) => {};
