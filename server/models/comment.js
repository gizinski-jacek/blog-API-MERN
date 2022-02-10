const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
	{
		text: { type: String, minlength: 2, maxlength: 64, required: true },
		post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

// Virtual for comment's URL
CommentSchema.virtual('url').get(function () {
	return '/comments/' + this._id;
});

module.exports = mongoose.model('Comment', CommentSchema);
