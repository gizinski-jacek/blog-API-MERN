const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: { type: String, minlength: 8, maxlength: 256, required: true },
	text: { type: String, minlength: 16, maxlength: 4084, required: true },
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	create_timestamp: { type: Date, required: true },
	update_timestamp: { type: Date },
	published: { type: Boolean, default: false },
});

// Virtual for post's URL
PostSchema.virtual('url').get(function () {
	return '/posts/' + this._id;
});

module.exports = mongoose.model('Post', PostSchema);
