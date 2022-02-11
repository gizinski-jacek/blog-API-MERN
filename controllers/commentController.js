const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

exports.get_all_post_comments = async (req, res, next) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.postid)) {
			return res.status(404).json('Invalid post Id');
		}
		const comment_list = await Comment.find({ post: req.params.postid })
			.sort({ createdAt: 'desc' })
			.populate('author', 'username')
			.exec();
		res.status(200).json(comment_list);
	} catch (error) {
		next(error);
	}
};

exports.create_comment = [
	body('text', 'Text field can not be empty')
		.trim()
		.isLength({ min: 4, max: 64 })
		.escape(),
	async (req, res, next) => {
		try {
			const errors = validationResult(req);
			const newComment = new Comment({
				text: req.body.text,
				post: req.params.postid,
				author: req.user._id,
			});
			if (!errors.isEmpty()) {
				return res.status(404).json(errors.array());
			}
			const comment = await newComment.save();
			if (!comment) {
				return res.status(404).json('Error saving comment, try again');
			}
			const comment_list = await Comment.find({ post: req.params.postid })
				.sort({ createdAt: 'desc' })
				.populate('author', 'username')
				.exec();
			res.status(200).json(comment_list);
		} catch (error) {
			next(error);
		}
	},
];

exports.update_comment = [
	body('text', 'Text field can not be empty')
		.trim()
		.isLength({ min: 2, max: 64 })
		.escape(),
	async (req, res, next) => {
		try {
			if (!mongoose.Types.ObjectId.isValid(req.params.commentid)) {
				return res.status(404).json('Invalid comment Id');
			}
			const errors = validationResult(req);
			const updatedComment = new Comment({
				_id: req.params.commentid,
				text: req.body.text,
				post: req.body.post,
				author: req.user._id,
			});
			if (!errors.isEmpty()) {
				return res.status(404).json(errors.array());
			}
			const comment = await Comment.findByIdAndUpdate(
				req.params.commentid,
				updatedComment,
				{ upsert: true }
			).exec();
			if (!comment) {
				return res
					.status(404)
					.json(
						'Comment not found, nothing to update. Creating comment instead'
					);
			}
			const comment_list = await Comment.find({ post: req.params.postid })
				.sort({ createdAt: 'desc' })
				.populate('author', 'username')
				.exec();
			res.status(200).json(comment_list);
		} catch (error) {
			next(error);
		}
	},
];

exports.delete_comment = async (req, res, next) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.commentid)) {
			return res.status(404).json('Invalid comment Id');
		}
		const comment = await Comment.findByIdAndDelete(
			req.params.commentid
		).exec();
		if (!comment) {
			return res.status(404).json('Comment not found, nothing to delete');
		}
		const comment_list = await Comment.find({ post: req.params.postid })
			.sort({ createdAt: 'desc' })
			.populate('author', 'username')
			.exec();
		res.status(200).json(comment_list);
	} catch (error) {
		next(error);
	}
};
