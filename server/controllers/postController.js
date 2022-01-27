require('dotenv').config();
const Post = require('../models/post');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

exports.get_all_posts = async (req, res, next) => {
	try {
		const post_list = await Post.find({}).sort({ timestamp: 'desc' });
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
				timestamp: new Date(),
			});
			if (!errors.isEmpty()) {
				return res.status(401).json(errors.array());
			}
			await newPost.save();
			const post_list = await Post.find({}).sort({ timestamp: 'desc' });
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
			const postToUpdate = await Post.findById(req.params.postid);
			if (postToUpdate == null) {
				return res.status(404).json('Post not found');
			}
			const errors = validationResult(req);
			const updatedPost = new Post({
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
			await Post.findByIdAndUpdate(req.params.postid, updatedPost);
			const post_list = await Post.find({}).sort({ timestamp: 'desc' });
			res.status(200).json(post_list);
		} catch (error) {
			next(err);
		}
	},
];

exports.delete_post = async (req, res, next) => {
	try {
		await Post.findByIdAndDelete(req.params.postid);
		const post_list = await Post.find({}).sort({ timestamp: 'desc' });
		res.status(200).json(post_list);
	} catch (error) {
		next(err);
	}
};

exports.publish_post = async (req, res, next) => {
	try {
		const thePost = await Post.findById(req.params.postid);
		if (thePost == null) {
			return res.status(404).json('Post not found');
		}
		await Post.findByIdAndUpdate(req.params.postid, { published: true });
		const post_list = await Post.find({}).sort({ timestamp: 'desc' });
		res.status(200).json(post_list);
	} catch (error) {
		next(err);
	}
};

exports.unpublish_post = async (req, res, next) => {
	try {
		const thePost = await Post.findById(req.params.postid);
		if (thePost == null) {
			return res.status(404).json('Post not found');
		}
		await Post.findByIdAndUpdate(req.params.postid, { published: false });
		const post_list = await Post.find({}).sort({ timestamp: 'desc' });
		res.status(200).json(post_list);
	} catch (error) {
		next(err);
	}
};
