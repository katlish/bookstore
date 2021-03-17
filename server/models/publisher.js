const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const publisherSchema = new Schema({
	name: {
		type: String,
	},
});

module.exports = mongoose.model('Publisher', publisherSchema);
