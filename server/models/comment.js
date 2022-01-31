const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	text: { type: String, minlength: 2, maxlength: 64, required: true },
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
	create_timestamp: { type: Date, required: true },
	update_timestamp: { type: Date },
});

// Virtual for comment's URL
CommentSchema.virtual('url').get(function () {
	return '/comments/' + this._id;
});

module.exports = mongoose.model('Comment', CommentSchema);
