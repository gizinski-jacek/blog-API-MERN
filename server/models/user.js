const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String, minlength: 4, maxlength: 32, required: true },
	password: { type: String, minlength: 4, maxlength: 64, required: true },
	registered: { type: Date, required: true },
	admin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
