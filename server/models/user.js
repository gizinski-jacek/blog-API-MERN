const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String, minlength: 4, maxlength: 32, required: true },
	password: { type: String, minlength: 4, maxlength: 64, required: true },
	admin: { type: Boolean, default: false },
});

// Virtual for user's URL
UserSchema.virtual('url').get(function () {
	return '/user/' + this._id;
});

module.exports = mongoose.model('User', UserSchema);
