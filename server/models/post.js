const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: { type: String, minlength: 4, maxlength: 64, required: true },
	text: { type: String, minlength: 4, maxlength: 512, required: true },
	author: { type: String, required: true },
	timestamp: { type: Date, required: true },
});

// Virtual for post's URL
PostSchema.virtual('url').get(function () {
	return '/posts/' + this._id;
});

module.exports = mongoose.model('Post', PostSchema);
