const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

exports.get_all_comments = async (req, res, next) => {
	try {
		const comment_list = await Comment.find({ post_ref_id: req.params.postid })
			.sort({ timestamp: 'desc' })
			.exec();
		res.status(200).json(comment_list);
	} catch (error) {
		next(error);
	}
};

exports.get_single_comment = async (req, res, next) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.commentid)) {
			return res.status(404).json('Invalid comment ObjectId');
		}
		const comment = await Comment.findById(req.params.commentid).exec();
		res.status(200).json(comment);
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
				create_timestamp: new Date(),
			});
			if (!errors.isEmpty()) {
				res.status(401).json(errors.array());
			}
			const comment = await newComment.save();
			if (!comment) {
				return res.status(404).json('Error saving comment');
			}
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
				return res.status(404).json('Invalid comment ObjectId');
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
				post_ref_id: commentToUpdate.post_ref_id,
				create_timestamp: commentToUpdate.create_timestamp,
				update_timestamp: new Date(),
			});
			if (!errors.isEmpty()) {
				return res.status(401).json(errors.array());
			}
			const comment = await Comment.findByIdAndUpdate(
				req.params.commentid,
				updatedComment,
				{ returnDocument: 'after' }
			).exec();
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
			return res.status(404).json('Invalid comment ObjectId');
		}
		const comment = await Comment.findByIdAndDelete(
			req.params.commentid
		).exec();
		if (!comment) {
			return res.status(404).json('Comment not found, nothing to delete');
		}
		res.status(200).json('Comment deleted');
	} catch (error) {
		next(error);
	}
};
