const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
	{
		title: { type: String, minlength: 8, maxlength: 128, required: true },
		text: { type: String, minlength: 16, maxlength: 4084, required: true },
		published: { type: Boolean, default: false },
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

// Virtual for post's URL
PostSchema.virtual('url').get(function () {
	return '/posts/' + this._id;
});

module.exports = mongoose.model('Post', PostSchema);
