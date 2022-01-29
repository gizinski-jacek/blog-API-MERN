require('dotenv').config();
const Post = require('../models/post');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

exports.get_all_posts = async (req, res, next) => {
	try {
		const post_list = await Post.find({}).sort({ timestamp: 'desc' }).exec();
		res.status(200).json(post_list);
	} catch (error) {
		next(error);
	}
};

exports.create_post = [
	body('titleValue', 'Title field can not be empty')
		.trim()
		.isLength({ min: 4, max: 64 })
		.escape(),
	body('textValue', 'Text field can not be empty')
		.trim()
		.isLength({ min: 4, max: 512 })
		.escape(),
	async (req, res, next) => {
		try {
			const errors = validationResult(req);
			const newPost = new Post({
				title: req.body.titleValue,
				text: req.body.textValue,
				author: req.decodedUser.username,
				create_timestamp: new Date(),
			});
			if (!errors.isEmpty()) {
				return res.status(401).json(errors.array());
			}
			const post = await newPost.save();
			if (!post) {
				return res.status(404).json('Error saving post');
			}
			const post_list = await Post.find({}).sort({ timestamp: 'desc' }).exec();
			res.status(200).json(post_list);
		} catch (error) {
			next(error);
		}
	},
];

exports.update_post = [
	body('titleValue', 'Title field can not be empty')
		.trim()
		.isLength({ min: 4, max: 64 })
		.escape(),
	body('textValue', 'Text field can not be empty')
		.trim()
		.isLength({ min: 4, max: 512 })
		.escape(),
	async (req, res, next) => {
		try {
			if (!mongoose.Types.ObjectId.isValid(req.params.postid)) {
				return res.status(404).json('Invalid post ObjectId');
			}
			const postToUpdate = await Post.findById(req.params.postid).exec();
			if (!postToUpdate) {
				return res.status(404).json('Post not found, nothing to update');
			}
			const errors = validationResult(req);
			const updatedPost = new Post({
				_id: postToUpdate._id,
				title: req.body.titleValue,
				text: req.body.textValue,
				author: postToUpdate.author,
				create_timestamp: postToUpdate.create_timestamp,
				update_timestamp: new Date(),
				published: false,
			});
			if (!errors.isEmpty()) {
				return res.status(401).json(errors.array());
			}
			const post = await Post.findByIdAndUpdate(
				req.params.postid,
				updatedPost
			).exec();
			if (!post) {
				return res.status(404).json('Post not found, nothing to update');
			}
			const post_list = await Post.find({}).sort({ timestamp: 'desc' }).exec();
			res.status(200).json(post_list);
		} catch (error) {
			next(error);
		}
	},
];

exports.delete_post = async (req, res, next) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.postid)) {
			return res.status(404).json('Invalid post ObjectId');
		}
		const post = await Post.findByIdAndDelete(req.params.postid).exec();
		if (!post) {
			return res.status(404).json('Post not found, nothing to delete');
		}
		const post_list = await Post.find({}).sort({ timestamp: 'desc' }).exec();
		res.status(200).json(post_list);
	} catch (error) {
		next(err);
	}
};

exports.publish_post = async (req, res, next) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.postid)) {
			return res.status(404).json('Invalid post ObjectId');
		}
		const post = await Post.findByIdAndUpdate(req.params.postid, {
			published: true,
		}).exec();
		if (!post) {
			return res.status(404).json('Post not found, nothing to publish');
		}
		const post_list = await Post.find({}).sort({ timestamp: 'desc' }).exec();
		res.status(200).json(post_list);
	} catch (error) {
		next(error);
	}
};

exports.unpublish_post = async (req, res, next) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.postid)) {
			return res.status(404).json('Invalid post ObjectId');
		}
		const post = await Post.findByIdAndUpdate(req.params.postid, {
			published: false,
		}).exec();
		if (!post) {
			return res.status(404).json('Post not found, nothing to unpublish');
		}
		const post_list = await Post.find({}).sort({ timestamp: 'desc' }).exec();
		res.status(200).json(post_list);
	} catch (error) {
		next(err);
	}
};
