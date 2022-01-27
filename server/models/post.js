const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: { type: String, minlength: 4, maxlength: 64, required: true },
	text: { type: String, minlength: 4, maxlength: 512, required: true },
	author: { type: String, required: true },
	create_timestamp: { type: Date, required: true },
	update_timestamp: { type: Date },
	published: { type: Boolean, default: false },
});

// Virtual for post's URL
PostSchema.virtual('url').get(function () {
	return '/posts/' + this._id;
});

module.exports = mongoose.model('Post', PostSchema);
