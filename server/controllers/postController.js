const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const async = require('async');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcryptjs = require('bcryptjs');

const lorem = [
	{
		title: 'Lorem Ipsum',
		quote:
			'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
		quoteEN:
			'"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas congue sit amet massa sed commodo. Duis non ante vitae est eleifend congue eget quis tortor. Pellentesque vulputate, elit eu pulvinar lobortis, erat tellus sollicitudin sem, eget rhoncus ipsum magna ut erat. Pellentesque venenatis sem eu rutrum gravida. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam vulputate ultrices accumsan. Nullam sed mauris vitae ex dignissim eleifend nec a magna. Etiam placerat et nunc sit amet hendrerit. Curabitur eget maximus lorem. Sed sed sodales urna. Proin eleifend lectus id enim pellentesque, vel feugiat nulla semper. \nSuspendisse ornare nulla quis cursus condimentum. Integer vitae velit non mauris varius porttitor at vel dui. Phasellus pretium purus et nisi tristique, a fermentum lectus posuere. Vestibulum leo erat, gravida vitae ante id, dapibus condimentum massa. In hac habitasse platea dictumst. Aenean fringilla semper nisl, et placerat ex tempus sit amet. Sed non sagittis nisl. Integer mollis consequat malesuada. Morbi luctus eros pretium ante eleifend, vitae suscipit mi vulputate. In ultricies quis orci ut porta. Fusce sit amet tempor ligula, vitae bibendum ligula. Nullam quis ligula vel est efficitur pretium sit amet ut quam. Proin pellentesque sem sit amet enim ultricies, vel sollicitudin risus tincidunt.',
	},
	{
		title: 'Lorem Ipsum',
		quote:
			'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
		quoteEN:
			'"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas congue sit amet massa sed commodo. Duis non ante vitae est eleifend congue eget quis tortor. Pellentesque vulputate, elit eu pulvinar lobortis, erat tellus sollicitudin sem, eget rhoncus ipsum magna ut erat. Pellentesque venenatis sem eu rutrum gravida. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam vulputate ultrices accumsan. Nullam sed mauris vitae ex dignissim eleifend nec a magna. Etiam placerat et nunc sit amet hendrerit. Curabitur eget maximus lorem. Sed sed sodales urna. Proin eleifend lectus id enim pellentesque, vel feugiat nulla semper. \nSuspendisse ornare nulla quis cursus condimentum. Integer vitae velit non mauris varius porttitor at vel dui. Phasellus pretium purus et nisi tristique, a fermentum lectus posuere. Vestibulum leo erat, gravida vitae ante id, dapibus condimentum massa. In hac habitasse platea dictumst. Aenean fringilla semper nisl, et placerat ex tempus sit amet. Sed non sagittis nisl. Integer mollis consequat malesuada. Morbi luctus eros pretium ante eleifend, vitae suscipit mi vulputate. In ultricies quis orci ut porta. Fusce sit amet tempor ligula, vitae bibendum ligula. Nullam quis ligula vel est efficitur pretium sit amet ut quam. Proin pellentesque sem sit amet enim ultricies, vel sollicitudin risus tincidunt.',
	},
	{
		title: 'Lorem Ipsum',
		quote:
			'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
		quoteEN:
			'"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas congue sit amet massa sed commodo. Duis non ante vitae est eleifend congue eget quis tortor. Pellentesque vulputate, elit eu pulvinar lobortis, erat tellus sollicitudin sem, eget rhoncus ipsum magna ut erat. Pellentesque venenatis sem eu rutrum gravida. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam vulputate ultrices accumsan. Nullam sed mauris vitae ex dignissim eleifend nec a magna. Etiam placerat et nunc sit amet hendrerit. Curabitur eget maximus lorem. Sed sed sodales urna. Proin eleifend lectus id enim pellentesque, vel feugiat nulla semper. \nSuspendisse ornare nulla quis cursus condimentum. Integer vitae velit non mauris varius porttitor at vel dui. Phasellus pretium purus et nisi tristique, a fermentum lectus posuere. Vestibulum leo erat, gravida vitae ante id, dapibus condimentum massa. In hac habitasse platea dictumst. Aenean fringilla semper nisl, et placerat ex tempus sit amet. Sed non sagittis nisl. Integer mollis consequat malesuada. Morbi luctus eros pretium ante eleifend, vitae suscipit mi vulputate. In ultricies quis orci ut porta. Fusce sit amet tempor ligula, vitae bibendum ligula. Nullam quis ligula vel est efficitur pretium sit amet ut quam. Proin pellentesque sem sit amet enim ultricies, vel sollicitudin risus tincidunt.',
	},
];

exports.get_all_posts = (req, res, next) => {
	res.status(200).json({ lorem });
};

exports.get_post = (req, res, next) => {};

exports.create_post = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.render('log-in', { title: 'Log In' });
	}
	/// Create post
};

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
