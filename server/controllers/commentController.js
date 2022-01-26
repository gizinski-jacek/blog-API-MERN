const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const async = require('async');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcryptjs = require('bcryptjs');

exports.get_all_comments = (req, res, next) => {
	Post.find({ post_ref_id: req.params.postid }).exec((error, comment_list) => {
		if (error) {
			return next(error);
		}
		res.status(202).json(comment_list);
	});
};

// exports.get_comment = (req, res, next) => {
// 	Post.findById(req.params.commentid).exec((error, comment) => {
// 		if (error) {
// 			return next(error);
// 		}
// 		if (comment == null) {
// 			let err = new Error('Comment not found');
// 			err.status = 404;
// 			return next(error);
// 		}
// 		res.status(202).json(comment);
// 	});
// };

exports.create_comment = [
	body('comment', 'Title field can not be empty')
		.trim()
		.isLength({ min: 4, max: 64 })
		.escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		const newComment = new Comment({
			text: req.body.comment,
			author: req.decodedUser.username,
			timestamp: new Date(),
		});
		if (!errors.isEmpty()) {
			res.status(401).json(errors.array());
		}
		newComment.save((error) => {
			if (error) {
				return next(error);
			}
			res.status(200).json({ success: true });
		});
	},
];

exports.update_comment = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.render('log-in', { title: 'Log In' });
	}
	/// Update comment
};

exports.delete_comment = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.render('log-in', { title: 'Log In' });
	}
	/// Delete comment
};
