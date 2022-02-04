const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

exports.get_all_post_comments = async (req, res, next) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.postid)) {
			return res.status(404).json('Invalid post Id');
		}
		const comment_list = await Comment.find({ post: req.params.postid })
			.sort({ create_timestamp: 'desc' })
			.populate('author', 'username')
			.exec();
		res.status(200).json(comment_list);
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
				author: req.user._id,
				post: req.params.postid,
				create_timestamp: new Date(),
			});
			if (!errors.isEmpty()) {
				return res.status(404).json(errors.array());
			}
			const comment = await newComment.save();
			if (!comment) {
				return res
					.status(404)
					.json([{ msg: 'Error saving comment, try again' }]);
			}
			const comment_list = await Comment.find({ post: req.params.postid })
				.sort({ create_timestamp: 'desc' })
				.populate('author', 'username')
				.exec();
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
			if (!mongoose.Types.ObjectId.isValid(req.params.commentid)) {
				return res.status(404).json('Invalid comment Id');
			}
			const commentToUpdate = await Comment.findById(
				req.params.commentid
			).exec();
			if (!commentToUpdate) {
				return res.status(404).json('Comment not found, nothing to update');
			}
			const errors = validationResult(req);
			const updatedComment = new Comment({
				_id: commentToUpdate._id,
				text: req.body.commentValue,
				author: commentToUpdate.author,
				post: commentToUpdate.post,
				create_timestamp: commentToUpdate.create_timestamp,
				update_timestamp: new Date(),
			});
			if (!errors.isEmpty()) {
				return res.status(404).json(errors.array());
			}
			const comment = await Comment.findByIdAndUpdate(
				req.params.commentid,
				updatedComment,
				{ returnDocument: 'after' }
			)
				.populate('author', 'username')
				.exec();
			if (!comment) {
				return res.status(404).json('Comment not found, nothing to update');
			}
			res.status(200).json(comment);
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
			.sort({ create_timestamp: 'desc' })
			.populate('author', 'username')
			.exec();
		res.status(200).json(comment_list);
		res.status(200).json('Comment deleted');
	} catch (error) {
		next(error);
	}
};
