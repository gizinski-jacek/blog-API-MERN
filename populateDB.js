#! /usr/bin/env node

console.log(
	'This script populates some test categories and items to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const Post = require('./models/post');
const Comment = require('./models/comment');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const posts = [];
const comments = [];

const postCreate = (title, text, published, author, cb) => {
	let postDetail = {
		title: title,
		text: text,
		published: published,
		author: author,
	};

	const post = new Post(postDetail);
	post.save(function (err) {
		if (err) {
			cb(err, null);
			return;
		}
		console.log('New Post: ' + post);
		posts.push(post);
		console.log(posts[0]._id);
		cb(null, post);
	});
};

const commentCreate = (text, post, author, cb) => {
	commentDetail = {
		text: text,
		post: post,
		author: author,
	};

	const comment = new Comment(commentDetail);

	comment.save(function (err) {
		if (err) {
			cb(err, null);
			return;
		}
		console.log('New Comment: ' + comment);
		comments.push(comment);
		cb(null, comment);
	});
};

function createPosts(cb) {
	async.series(
		[
			function (callback) {
				postCreate(
					'Lorem Ipsum',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec velit quis nisl facilisis porta. Vivamus velit urna, congue vel lectus at, pulvinar fringilla neque. Sed porta tortor id leo euismod volutpat. Phasellus massa massa, aliquam eu tempus at, placerat at diam. Ut purus dui, fringilla a magna eu, tincidunt lobortis augue. Quisque nec libero egestas, elementum tortor in, consectetur justo. Morbi ultrices fringilla volutpat. Nulla dignissim sapien consequat urna rhoncus porttitor. Sed tempor eu ligula vitae malesuada. \n\nDonec leo leo, iaculis vel blandit et, semper sed dui. Aliquam ac orci in mauris sollicitudin ultrices vel a nibh. Vestibulum varius, quam vulputate suscipit rhoncus, enim elit rutrum mauris, sed pretium tortor dolor a turpis. Donec at tortor dui. Proin vel justo id diam euismod aliquet et vitae tortor. Integer commodo pellentesque mi ut malesuada. Vestibulum vitae euismod augue, sit amet lobortis augue. Sed sagittis, orci vitae convallis fermentum, enim ligula ullamcorper neque, at auctor velit nisl vel tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer blandit augue in magna congue feugiat. Morbi condimentum, velit sed aliquet pharetra, erat lectus bibendum metus, at pharetra justo tellus eu lorem. Etiam auctor sem et magna pulvinar tempor vitae ut lorem. \n\nInteger scelerisque, dolor eu viverra condimentum, urna augue iaculis massa, eu dictum augue eros id sem. Duis arcu augue, ultricies et facilisis vitae, blandit sit amet enim. Mauris et mollis leo, at rhoncus eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus ut vehicula enim. Morbi scelerisque augue venenatis, bibendum purus id, ultricies massa. Pellentesque accumsan orci et justo efficitur tincidunt. Praesent nisi arcu, fermentum eget massa vitae, porta dapibus elit. Sed ultrices vel mauris vel sollicitudin. In ante odio, finibus ac feugiat et, vulputate vel ante. Duis ut tellus a ex dictum commodo. Vivamus dapibus, nibh sit amet tincidunt hendrerit, purus nulla porta enim, a faucibus arcu erat sit amet leo. Suspendisse id enim enim. Phasellus tincidunt neque ut luctus dignissim. Morbi ex orci, sagittis eget libero in, semper fermentum eros. \n\nPellentesque et dolor nec dui semper blandit. Mauris est neque, hendrerit ut cursus vitae, convallis ut augue. Etiam maximus enim quis vestibulum porta. Quisque consectetur nulla consequat nisl euismod placerat. Proin ut turpis mi. Nam sed turpis id ipsum finibus ultricies quis faucibus risus. In auctor lectus sit amet sapien hendrerit lacinia. Quisque vulputate arcu sit amet congue tincidunt. Proin nec fringilla ex. Pellentesque vitae odio et dui gravida cursus. Sed sed elit ac ipsum tincidunt finibus eget vel elit. Donec eget euismod dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. \n\nSuspendisse lacinia orci non porttitor bibendum. Praesent sagittis semper viverra. Donec tempor justo vitae elit luctus aliquam. Suspendisse nec maximus odio. Vestibulum dignissim tincidunt purus gravida hendrerit. Nullam lectus ante, volutpat sed augue ut, accumsan volutpat justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas et elit nec venenatis. Aliquam erat volutpat. Phasellus ut pretium urna. Integer sollicitudin congue semper. Sed blandit venenatis arcu. Morbi et velit vitae magna volutpat bibendum. Aliquam commodo neque sapien, non tincidunt mi fringilla quis. Nunc imperdiet eget ligula eu sagittis. ',
					true,
					'620525004f6bdbb8f862944a',
					callback
				);
			},
			function (callback) {
				postCreate(
					'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
					' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec velit quis nisl facilisis porta. Vivamus velit urna, congue vel lectus at, pulvinar fringilla neque. Sed porta tortor id leo euismod volutpat. Phasellus massa massa, aliquam eu tempus at, placerat at diam. Ut purus dui, fringilla a magna eu, tincidunt lobortis augue. Quisque nec libero egestas, elementum tortor in, consectetur justo. Morbi ultrices fringilla volutpat. Nulla dignissim sapien consequat urna rhoncus porttitor. Sed tempor eu ligula vitae malesuada. \n\nDonec leo leo, iaculis vel blandit et, semper sed dui. Aliquam ac orci in mauris sollicitudin ultrices vel a nibh. Vestibulum varius, quam vulputate suscipit rhoncus, enim elit rutrum mauris, sed pretium tortor dolor a turpis. Donec at tortor dui. Proin vel justo id diam euismod aliquet et vitae tortor. Integer commodo pellentesque mi ut malesuada. Vestibulum vitae euismod augue, sit amet lobortis augue. Sed sagittis, orci vitae convallis fermentum, enim ligula ullamcorper neque, at auctor velit nisl vel tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer blandit augue in magna congue feugiat. Morbi condimentum, velit sed aliquet pharetra, erat lectus bibendum metus, at pharetra justo tellus eu lorem. Etiam auctor sem et magna pulvinar tempor vitae ut lorem. \n\nInteger scelerisque, dolor eu viverra condimentum, urna augue iaculis massa, eu dictum augue eros id sem. Duis arcu augue, ultricies et facilisis vitae, blandit sit amet enim. Mauris et mollis leo, at rhoncus eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus ut vehicula enim. Morbi scelerisque augue venenatis, bibendum purus id, ultricies massa. Pellentesque accumsan orci et justo efficitur tincidunt. Praesent nisi arcu, fermentum eget massa vitae, porta dapibus elit. Sed ultrices vel mauris vel sollicitudin. In ante odio, finibus ac feugiat et, vulputate vel ante. Duis ut tellus a ex dictum commodo. Vivamus dapibus, nibh sit amet tincidunt hendrerit, purus nulla porta enim, a faucibus arcu erat sit amet leo. Suspendisse id enim enim. Phasellus tincidunt neque ut luctus dignissim. Morbi ex orci, sagittis eget libero in, semper fermentum eros. ',
					true,
					'620525004f6bdbb8f862944a',
					callback
				);
			},
			function (callback) {
				postCreate(
					'"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec velit quis nisl facilisis porta. Vivamus velit urna, congue vel lectus at, pulvinar fringilla neque. Sed porta tortor id leo euismod volutpat. Phasellus massa massa, aliquam eu tempus at, placerat at diam. Ut purus dui, fringilla a magna eu, tincidunt lobortis augue. Quisque nec libero egestas, elementum tortor in, consectetur justo. Morbi ultrices fringilla volutpat. Nulla dignissim sapien consequat urna rhoncus porttitor. Sed tempor eu ligula vitae malesuada. \n\nPellentesque et dolor nec dui semper blandit. Mauris est neque, hendrerit ut cursus vitae, convallis ut augue. Etiam maximus enim quis vestibulum porta. Quisque consectetur nulla consequat nisl euismod placerat. Proin ut turpis mi. Nam sed turpis id ipsum finibus ultricies quis faucibus risus. In auctor lectus sit amet sapien hendrerit lacinia. Quisque vulputate arcu sit amet congue tincidunt. Proin nec fringilla ex. Pellentesque vitae odio et dui gravida cursus. Sed sed elit ac ipsum tincidunt finibus eget vel elit. Donec eget euismod dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. \n\nSuspendisse lacinia orci non porttitor bibendum. Praesent sagittis semper viverra. Donec tempor justo vitae elit luctus aliquam. Suspendisse nec maximus odio. Vestibulum dignissim tincidunt purus gravida hendrerit. Nullam lectus ante, volutpat sed augue ut, accumsan volutpat justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas et elit nec venenatis. Aliquam erat volutpat. Phasellus ut pretium urna. Integer sollicitudin congue semper. Sed blandit venenatis arcu. Morbi et velit vitae magna volutpat bibendum. Aliquam commodo neque sapien, non tincidunt mi fringilla quis. Nunc imperdiet eget ligula eu sagittis.',
					true,
					'620525004f6bdbb8f862944a',
					callback
				);
			},
			function (callback) {
				postCreate(
					'Lorem Ipsum',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec velit quis nisl facilisis porta. Vivamus velit urna, congue vel lectus at, pulvinar fringilla neque. Sed porta tortor id leo euismod volutpat. Phasellus massa massa, aliquam eu tempus at, placerat at diam. Ut purus dui, fringilla a magna eu, tincidunt lobortis augue. Quisque nec libero egestas, elementum tortor in, consectetur justo. Morbi ultrices fringilla volutpat. Nulla dignissim sapien consequat urna rhoncus porttitor. Sed tempor eu ligula vitae malesuada. \n\nDonec leo leo, iaculis vel blandit et, semper sed dui. Aliquam ac orci in mauris sollicitudin ultrices vel a nibh. Vestibulum varius, quam vulputate suscipit rhoncus, enim elit rutrum mauris, sed pretium tortor dolor a turpis. Donec at tortor dui. Proin vel justo id diam euismod aliquet et vitae tortor. Integer commodo pellentesque mi ut malesuada. Vestibulum vitae euismod augue, sit amet lobortis augue. Sed sagittis, orci vitae convallis fermentum, enim ligula ullamcorper neque, at auctor velit nisl vel tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer blandit augue in magna congue feugiat. Morbi condimentum, velit sed aliquet pharetra, erat lectus bibendum metus, at pharetra justo tellus eu lorem. Etiam auctor sem et magna pulvinar tempor vitae ut lorem. \n\nInteger scelerisque, dolor eu viverra condimentum, urna augue iaculis massa, eu dictum augue eros id sem. Duis arcu augue, ultricies et facilisis vitae, blandit sit amet enim. Mauris et mollis leo, at rhoncus eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus ut vehicula enim. Morbi scelerisque augue venenatis, bibendum purus id, ultricies massa. Pellentesque accumsan orci et justo efficitur tincidunt. Praesent nisi arcu, fermentum eget massa vitae, porta dapibus elit. Sed ultrices vel mauris vel sollicitudin. In ante odio, finibus ac feugiat et, vulputate vel ante. Duis ut tellus a ex dictum commodo. Vivamus dapibus, nibh sit amet tincidunt hendrerit, purus nulla porta enim, a faucibus arcu erat sit amet leo. Suspendisse id enim enim. Phasellus tincidunt neque ut luctus dignissim. Morbi ex orci, sagittis eget libero in, semper fermentum eros. \n\nPellentesque et dolor nec dui semper blandit. Mauris est neque, hendrerit ut cursus vitae, convallis ut augue. Etiam maximus enim quis vestibulum porta. Quisque consectetur nulla consequat nisl euismod placerat. Proin ut turpis mi. Nam sed turpis id ipsum finibus ultricies quis faucibus risus. In auctor lectus sit amet sapien hendrerit lacinia. Quisque vulputate arcu sit amet congue tincidunt. Proin nec fringilla ex. Pellentesque vitae odio et dui gravida cursus. Sed sed elit ac ipsum tincidunt finibus eget vel elit. Donec eget euismod dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. \n\nSuspendisse lacinia orci non porttitor bibendum. Praesent sagittis semper viverra. Donec tempor justo vitae elit luctus aliquam. Suspendisse nec maximus odio. Vestibulum dignissim tincidunt purus gravida hendrerit. Nullam lectus ante, volutpat sed augue ut, accumsan volutpat justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas et elit nec venenatis. Aliquam erat volutpat. Phasellus ut pretium urna. Integer sollicitudin congue semper. Sed blandit venenatis arcu. Morbi et velit vitae magna volutpat bibendum. Aliquam commodo neque sapien, non tincidunt mi fringilla quis. Nunc imperdiet eget ligula eu sagittis. ',
					true,
					'620525004f6bdbb8f862944a',
					callback
				);
			},
			function (callback) {
				postCreate(
					'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
					' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec velit quis nisl facilisis porta. Vivamus velit urna, congue vel lectus at, pulvinar fringilla neque. Sed porta tortor id leo euismod volutpat. Phasellus massa massa, aliquam eu tempus at, placerat at diam. Ut purus dui, fringilla a magna eu, tincidunt lobortis augue. Quisque nec libero egestas, elementum tortor in, consectetur justo. Morbi ultrices fringilla volutpat. Nulla dignissim sapien consequat urna rhoncus porttitor. Sed tempor eu ligula vitae malesuada. \n\nDonec leo leo, iaculis vel blandit et, semper sed dui. Aliquam ac orci in mauris sollicitudin ultrices vel a nibh. Vestibulum varius, quam vulputate suscipit rhoncus, enim elit rutrum mauris, sed pretium tortor dolor a turpis. Donec at tortor dui. Proin vel justo id diam euismod aliquet et vitae tortor. Integer commodo pellentesque mi ut malesuada. Vestibulum vitae euismod augue, sit amet lobortis augue. Sed sagittis, orci vitae convallis fermentum, enim ligula ullamcorper neque, at auctor velit nisl vel tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer blandit augue in magna congue feugiat. Morbi condimentum, velit sed aliquet pharetra, erat lectus bibendum metus, at pharetra justo tellus eu lorem. Etiam auctor sem et magna pulvinar tempor vitae ut lorem. \n\nInteger scelerisque, dolor eu viverra condimentum, urna augue iaculis massa, eu dictum augue eros id sem. Duis arcu augue, ultricies et facilisis vitae, blandit sit amet enim. Mauris et mollis leo, at rhoncus eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus ut vehicula enim. Morbi scelerisque augue venenatis, bibendum purus id, ultricies massa. Pellentesque accumsan orci et justo efficitur tincidunt. Praesent nisi arcu, fermentum eget massa vitae, porta dapibus elit. Sed ultrices vel mauris vel sollicitudin. In ante odio, finibus ac feugiat et, vulputate vel ante. Duis ut tellus a ex dictum commodo. Vivamus dapibus, nibh sit amet tincidunt hendrerit, purus nulla porta enim, a faucibus arcu erat sit amet leo. Suspendisse id enim enim. Phasellus tincidunt neque ut luctus dignissim. Morbi ex orci, sagittis eget libero in, semper fermentum eros. ',
					true,
					'620525004f6bdbb8f862944a',
					callback
				);
			},
			function (callback) {
				postCreate(
					'"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."',
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec velit quis nisl facilisis porta. Vivamus velit urna, congue vel lectus at, pulvinar fringilla neque. Sed porta tortor id leo euismod volutpat. Phasellus massa massa, aliquam eu tempus at, placerat at diam. Ut purus dui, fringilla a magna eu, tincidunt lobortis augue. Quisque nec libero egestas, elementum tortor in, consectetur justo. Morbi ultrices fringilla volutpat. Nulla dignissim sapien consequat urna rhoncus porttitor. Sed tempor eu ligula vitae malesuada. \n\nPellentesque et dolor nec dui semper blandit. Mauris est neque, hendrerit ut cursus vitae, convallis ut augue. Etiam maximus enim quis vestibulum porta. Quisque consectetur nulla consequat nisl euismod placerat. Proin ut turpis mi. Nam sed turpis id ipsum finibus ultricies quis faucibus risus. In auctor lectus sit amet sapien hendrerit lacinia. Quisque vulputate arcu sit amet congue tincidunt. Proin nec fringilla ex. Pellentesque vitae odio et dui gravida cursus. Sed sed elit ac ipsum tincidunt finibus eget vel elit. Donec eget euismod dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. \n\nSuspendisse lacinia orci non porttitor bibendum. Praesent sagittis semper viverra. Donec tempor justo vitae elit luctus aliquam. Suspendisse nec maximus odio. Vestibulum dignissim tincidunt purus gravida hendrerit. Nullam lectus ante, volutpat sed augue ut, accumsan volutpat justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas et elit nec venenatis. Aliquam erat volutpat. Phasellus ut pretium urna. Integer sollicitudin congue semper. Sed blandit venenatis arcu. Morbi et velit vitae magna volutpat bibendum. Aliquam commodo neque sapien, non tincidunt mi fringilla quis. Nunc imperdiet eget ligula eu sagittis.',
					true,
					'620525004f6bdbb8f862944a',
					callback
				);
			},
		],
		// Optional callback
		cb
	);
}

function createComments(cb) {
	async.parallel(
		[
			function (callback) {
				commentCreate(
					'Great content',
					posts[0],
					'620525004f6bdbb8f862944a',
					callback
				);
			},
			function (callback) {
				commentCreate(
					'Great content',
					posts[2],
					'620525004f6bdbb8f862944a',
					callback
				);
			},
			function (callback) {
				commentCreate(
					'Great content',
					posts[4],
					'620525004f6bdbb8f862944a',
					callback
				);
			},
			function (callback) {
				commentCreate(
					'Quite profound',
					posts[2],
					'620525004f6bdbb8f862944a',
					callback
				);
			},
			function (callback) {
				commentCreate(
					'Quite profound',
					posts[3],
					'620525004f6bdbb8f862944a',
					callback
				);
			},
			function (callback) {
				commentCreate(
					'Quite profound',
					posts[4],
					'620525004f6bdbb8f862944a',
					callback
				);
			},
			function (callback) {
				commentCreate(
					'Exquisite',
					posts[1],
					'620525004f6bdbb8f862944a',
					callback
				);
			},
			function (callback) {
				commentCreate(
					'Exquisite',
					posts[5],
					'620525004f6bdbb8f862944a',
					callback
				);
			},
			function (callback) {
				commentCreate(
					'Exquisite',
					posts[3],
					'620525004f6bdbb8f862944a',
					callback
				);
			},
		],
		// optional callback
		cb
	);
}

async.series(
	[createPosts, createComments],
	// Optional callback
	function (err, results) {
		if (err) {
			console.log('FINAL ERR: ' + err);
		}
		// All done, disconnect from database
		mongoose.connection.close();
	}
);
