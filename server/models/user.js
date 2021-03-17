const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	firstname: {
		type: String,
	},
	lastname: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
	purchases: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Book',
		},
	],
});

module.exports = mongoose.model('User', userSchema);
