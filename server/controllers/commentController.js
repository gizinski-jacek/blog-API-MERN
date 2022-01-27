const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

exports.get_all_comments = async (req, res, next) => {
	try {
		const comment_list = await Comment.find({}).sort({ timestamp: 'desc' });
		res.status(202).json(comment_list);
	} catch (error) {
		next(error);
	}
};

exports.create_comment = [
	body('commentValue', 'Text field can not be empty')
		.trim()
		.isLength({ min: 4, max: 64 })
		.escape(),
	async (req, res, next) => {
		try {
			const errors = validationResult(req);
			const newComment = new Comment({
				text: req.body.commentValue,
				author: req.decodedUser.username,
				post_ref_id: req.params.postid,
				timestamp: new Date(),
			});
			if (!errors.isEmpty()) {
				res.status(401).json(errors.array());
			}
			await newComment.save();
			const comment_list = await Comment.find({}).sort({ timestamp: 'desc' });
			res.status(200).json(comment_list);
		} catch (error) {
			next(error);
		}
	},
];

exports.update_comment = [
	body('commentValue', 'Text field can not be empty')
		.trim()
		.isLength({ min: 2, max: 64 })
		.escape(),
	async (req, res, next) => {
		try {
			const commentToUpdate = await Comment.findById(req.params.commentid);
			if (commentToUpdate == null) {
				return res.status(404).json('Comment not found');
			}
			const errors = validationResult(req);
			const updatedComment = new Comment({
				text: req.body.commentValue,
				author: commentToUpdate.author,
				post_ref_id: commentToUpdate.post_ref_id,
				create_timestamp: commentToUpdate.create_timestamp,
				update_timestamp: new Date(),
			});
			if (!errors.isEmpty()) {
				return res.status(401).json(errors.array());
			}
			await Comment.findByIdAndUpdate(req.params.commentid, updatedComment);
			const comment_list = await Comment.find({}).sort({ timestamp: 'desc' });
			res.status(200).json(comment_list);
		} catch (error) {
			next(error);
		}
	},
];

exports.delete_comment = async (req, res, next) => {
	try {
		await Comment.findByIdAndDelete(req.params.commentid);
		const comment_list = await Comment.find({}).sort({ timestamp: 'desc' });
		res.status(200).json(comment_list);
	} catch (error) {
		next(error);
	}
};
