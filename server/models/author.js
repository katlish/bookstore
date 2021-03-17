const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
	name: {
		type: String,
	},
});

module.exports = mongoose.model('Author', authorSchema);
